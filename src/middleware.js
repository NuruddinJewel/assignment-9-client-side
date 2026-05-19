import { NextResponse } from "next/server";

export function middleware(request) {
  const currentPath = request.nextUrl.pathname;

  // Better-Auth Session Token
  const sessionToken =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  // Protected Route
  const isProtected =
    currentPath.startsWith("/bookings") ||
    currentPath.startsWith("/add-facility") ||
    currentPath.startsWith("/manage") ||
    /^\/facilities\/.+/.test(currentPath);

  // Protected Page
  if (isProtected && !sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", currentPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/bookings/:path*",
    "/add-facility/:path*",
    "/manage/:path*",
    "/facilities/:id+"
  ],
};