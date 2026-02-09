import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function normalizeHost(value: string) {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase();
}

export function middleware(req: NextRequest) {
  const currentHost = (req.headers.get("host") ?? "").toLowerCase();
  const productionHost = normalizeHost(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL ??
      "",
  );

  if (!currentHost || !productionHost) return NextResponse.next();
  if (currentHost === productionHost) return NextResponse.next();

  // If users open an old deployment URL on vercel.app from bookmarks,
  // always move them to the stable production domain.
  if (currentHost.endsWith(".vercel.app")) {
    const destination = new URL(req.url);
    destination.host = productionHost;
    destination.protocol = "https:";
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
