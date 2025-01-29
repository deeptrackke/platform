import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

export default async function middleware(req: NextRequest) {
  const session = await getSession();
  const path = req.nextUrl.pathname;

  // Redirect to login if no session for protected routes
  if (path.startsWith("/dashboard") && !session?.user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to dashboard if logged in and trying to access auth pages
  if (["/login", "/signup"].includes(path) && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"]
};