import { redirect } from "next/navigation";
import { isAdminAuthenticated, isAuthConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdminAuthenticated()) redirect("/admin/articles");
  const { error } = await searchParams;
  return (
    <div className="grid min-h-[calc(100svh-8rem)] place-items-center px-5 py-16">
      <div className="w-full max-w-sm border border-slate-200 p-7 dark:border-slate-800">
        <p className="eyebrow">File-based CMS</p>
        <h1 className="mt-3 text-2xl font-semibold dark:text-white">Admin login</h1>
        {!isAuthConfigured() ? <p className="mt-3 text-sm leading-6 text-amber-700 dark:text-amber-400">本番環境では `ADMIN_PASSWORD` を設定してください。</p> : null}
        {error ? <p className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">パスワードが正しくありません。</p> : null}
        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <label className="block text-sm font-medium dark:text-slate-200">Password
            <input name="password" type="password" autoComplete="current-password" className="mt-2 w-full border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-900" />
          </label>
          <button className="primary-link w-full">Log in</button>
        </form>
      </div>
    </div>
  );
}
