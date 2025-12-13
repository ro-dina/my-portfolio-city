import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] grid place-items-center px-6 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-widest text-slate-500">404</p>
        <h1 className="mt-2 text-3xl font-bold">ページが見つかりません</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          URLが誤っているか、ページが移動または削除された可能性があります。
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900">
            トップへ
          </Link>
          <Link href="/coding" className="rounded-md border px-4 py-2 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/10">
            Coding 一覧へ
          </Link>
        </div>
      </div>
    </main>
  );
}