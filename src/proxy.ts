import {NextRequest, NextResponse} from 'next/server'
import {verifySessionForProxy} from '@/lib/session'

const protectedPaths = ['/admin', '/dashboard']

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

    if(!isProtected){
        return NextResponse.next()
    }

    const token = request.cookies.get('session')?.value

    if(!token){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const payload = await verifySessionForProxy(token)

    if(!payload){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if(pathname.startsWith('/admin') && payload.role !== 'admin'){
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*']
}
