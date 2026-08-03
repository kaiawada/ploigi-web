'use server'

import { loginSchema } from '@/lib/auth'
import { hashPassword, verifyPassword } from '@/lib/password'
import { prisma } from '@/lib/prisma'
import { createSession, setSessionCookie } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  // バリデーション
  const email = formData.get('email')
  const password = formData.get('password')
  
  const result = loginSchema.safeParse({ email, password })
  
  if (!result.success) {
    return {
      error: result.error.issues[0].message
    }
  }
  
  // DBからユーザーを検索
  const user = await prisma.user.findUnique({
    where: { email: result.data.email }
  })
  
  if (!user) {
    return {
      error: 'メールアドレスまたはパスワードが正しくありません'
    }
  }
  
  // パスワードを検証
  const isPasswordValid = await verifyPassword(
    result.data.password,
    user.passwordHash
  )
  
  if (!isPasswordValid) {
    return {
      error: 'メールアドレスまたはパスワードが正しくありません'
    }
  }
  
  // セッションを作成してCookieに保存
  const token = await createSession(user.id, user.email, user.role)
  await setSessionCookie(token)
  
  // ダッシュボードにリダイレクト
  if (user.role === 'admin') {
    redirect('/admin')
  }else{
    redirect('/dashboard')
  }

}