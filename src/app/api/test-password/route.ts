import { hashPassword, verifyPassword } from '@/lib/password'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const testEmail = 'test@example.com'
    const testPassword = 'MySecurePassword123'
    
    // 1. パスワードをハッシュ化
    const hashedPassword = await hashPassword(testPassword)
    
    // 2. 既存ユーザーを削除（テスト用）
    await prisma.user.deleteMany({ where: { email: testEmail } })
    
    // 3. ハッシュ化したパスワードで新規ユーザーを作成
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash: hashedPassword,
        role: 'user'
      }
    })
    
    // 4. DBから取得
    const retrievedUser = await prisma.user.findUnique({
      where: { email: testEmail }
    })
    
    // 5. パスワード検証
    const isPasswordValid = await verifyPassword(
      testPassword,
      retrievedUser!.passwordHash
    )
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email
      },
      passwordVerification: isPasswordValid
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}