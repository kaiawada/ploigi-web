'use server'

import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/password'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// バリデーションスキーマ
const createUserSchema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上である必要があります'),
  role: z.enum(['admin', 'user'])
})

const updateUserSchema = z.object({
  id: z.number(),
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上である必要があります').optional()
})

const deleteUserSchema = z.object({
  id: z.number()
})

// ユーザー作成
export async function createUserAction(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  const role = formData.get('role')

  const result = createUserSchema.safeParse({ email, password, role })

  if (!result.success) {
    return {
      error: result.error.issues[0].message
    }
  }

  try {
    // メールアドレスの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { email: result.data.email }
    })

    if (existingUser) {
      return {
        error: 'このメールアドレスは既に使用されています'
      }
    }

    // パスワードをハッシュ化
    const hashedPassword = await hashPassword(result.data.password)

    // ユーザーを作成
    await prisma.user.create({
      data: {
        email: result.data.email,
        passwordHash: hashedPassword,
        role: result.data.role as 'admin' | 'user'
      }
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'ユーザー作成に失敗しました'
    }
  }
}

// ユーザー更新
export async function updateUserAction(formData: FormData) {
  const id = parseInt(formData.get('id') as string)
  const email = formData.get('email')
  const password = formData.get('password')

  const result = updateUserSchema.safeParse({
    id,
    email,
    password: password || undefined
  })

  if (!result.success) {
    return {
      error: result.error.issues[0].message
    }
  }

  try {
    // メールアドレスの重複チェック（自分自身以外）
    const existingUser = await prisma.user.findUnique({
      where: { email: result.data.email }
    })

    if (existingUser && existingUser.id !== result.data.id) {
      return {
        error: 'このメールアドレスは既に使用されています'
      }
    }

    // 更新データを準備
    const updateData: any = {
      email: result.data.email
    }

    // パスワードが指定されていれば更新
    if (result.data.password) {
      updateData.passwordHash = await hashPassword(result.data.password)
    }

    // ユーザーを更新
    await prisma.user.update({
      where: { id: result.data.id },
      data: updateData
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'ユーザー更新に失敗しました'
    }
  }
}

// ユーザー削除
export async function deleteUserAction(formData: FormData) {
  const id = parseInt(formData.get('id') as string)

  const result = deleteUserSchema.safeParse({ id })

  if (!result.success) {
    return {
      error: 'ユーザーIDが正しくありません'
    }
  }

  try {
    // 削除対象のユーザーを確認
    const user = await prisma.user.findUnique({
      where: { id: result.data.id }
    })

    if (!user) {
      return {
        error: 'ユーザーが見つかりません'
      }
    }

    // 削除
    await prisma.user.delete({
      where: { id: result.data.id }
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'ユーザー削除に失敗しました'
    }
  }
}