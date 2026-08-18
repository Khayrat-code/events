import { NextResponse, type NextRequest } from "next/server"

const LOCALES = ["ar", "en"] as const

/**
 * Locale-less URLs land on the Arabic version:
 *   /            -> /ar
 *   /complaints  -> /ar/complaints
 *   /admin       -> /ar/admin
 * URLs already carrying /ar or /en pass through untouched.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  )
  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/ar${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Everything except Next internals and static assets (files with an extension)
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
}
