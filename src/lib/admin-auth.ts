import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "portfolio_admin";

function getSecret() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function expectedToken() {
  return createHmac("sha256", getSecret()).update("file-cms-admin").digest("hex");
}

export function isAuthConfigured() {
  return Boolean(getSecret());
}

export function verifyPassword(password: string) {
  const configured = getSecret();
  if (!configured) return process.env.NODE_ENV === "development";
  const supplied = Buffer.from(password);
  const expected = Buffer.from(configured);
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export function createAdminToken() {
  return expectedToken();
}

export async function isAdminAuthenticated() {
  if (!isAuthConfigured()) return process.env.NODE_ENV === "development";
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  const supplied = Buffer.from(value);
  const expected = Buffer.from(expectedToken());
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}
