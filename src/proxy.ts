import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  const { supabase, response } = createClient(request);

  if (!supabase) return response;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedPage =
    request.nextUrl.pathname === "/bookmarks" ||
    request.nextUrl.pathname.startsWith("/bookmarks/");

  if (!user && isProtectedPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap|robots).*)",
  ],
};
