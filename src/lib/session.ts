import { SignJWT, jwtVerify  } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!) 

const SESSION_COOKIE_NAME = 'session'

//トークン発行
export async function createSession(userID: number, email: string, role: string) {
    const token = await new SignJWT({ userID, email, role })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .sign(secret)

    return token

}

//トークン検証
export async function verifySession(token: string) {
    try { 
        const verified = await jwtVerify(token, secret)
        return verified.payload as { userID: number, email: string }
    }   catch (error) {
        return null
    }
}

//cookieにセッショントークン保存
export async function setSessionCookie(token: string) {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60*60*24
    })
}

//cookieからトークン取得
export async function getSessionCookie() {
    const cookieStore = await cookies()
    return cookieStore.get(SESSION_COOKIE_NAME)?.value
}

//cookieセッション削除
export async function clearSessionCookie() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)
}

//proxy.ts用
export async function verifySessionForProxy(token: string){
    try{
        const verified = await jwtVerify(token, secret)
        return verified.payload as { userID: number, email: string, role: string }
    }   catch (error) {
        return null
    }
}

