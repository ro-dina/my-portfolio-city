import { NextResponse } from "next/server";
import { ADMIN_COOKIE, createAdminToken, verifyPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  if (!verifyPassword(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }
  const response = NextResponse.redirect(new URL("/admin/articles", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
