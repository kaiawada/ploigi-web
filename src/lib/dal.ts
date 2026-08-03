import { cache } from 'react'
import { verifySession as verifyToken, getSessionCookie } from './session'
import { prisma } from './prisma'

// verifySession をキャッシュ化
// 同じリクエスト内で複数回呼ばれても、1回目の結果をキャッシュから返す
export const verifySession = cache(async () => {
  try {
    // cookie からトークンを取得し、セッションを検証
    const token = await getSessionCookie()

    if (!token) {
      return null
    }

    const payload = await verifyToken(token)

    if (!payload) {
      return null
    }

    // ユーザー情報を DB から取得
    const user = await prisma.user.findUnique({
      where: { id: payload.userID },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    })

    return user
  } catch (error) {
    console.error('Session verification error:', error)
    return null
  }
})