import {
  createSession,
  verifySession,
  setSessionCookie,
  getSessionCookie,
  clearSessionCookie
} from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 1. セッショントークンを発行
    const token = await createSession(1, 'test@example.com')
    console.log('Generated token:', token)

    // 2. トークンを検証
    const payload = await verifySession(token)
    console.log('Verified payload:', payload)

    // 3. Cookieに保存
    await setSessionCookie(token)
    console.log('Session cookie set')

    // 4. Cookieから取得
    const storedToken = await getSessionCookie()
    console.log('Retrieved token from cookie:', storedToken)

    // 5. 取得したトークンを再度検証
    const verifiedPayload = await verifySession(storedToken!)
    console.log('Verified payload from cookie:', verifiedPayload)

    return NextResponse.json({
      success: true,
      tokenGenerated: !!token,
      tokenVerified: !!payload,
      payloadContent: payload,
      cookieStored: !!storedToken,
      cookieVerified: !!verifiedPayload
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}