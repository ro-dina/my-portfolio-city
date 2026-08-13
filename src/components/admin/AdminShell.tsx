import Link from "next/link";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-5">
            <Link href="/admin/articles" className="font-mono text-sm font-semibold dark:text-white">FILE CMS</Link>
            <nav className="flex gap-4 text-sm text-slate-500" aria-label="管理画面">
              <Link href="/admin/articles" className="hover:text-slate-950 dark:hover:text-white">Articles</Link>
              <Link href="/notes" target="_blank" className="hover:text-slate-950 dark:hover:text-white">Public site ↗</Link>
            </nav>
          </div>
          <form action="/api/admin/logout" method="post"><button className="text-xs text-slate-500 hover:text-slate-950 dark:hover:text-white">Log out</button></form>
        </div>
      </header>
      {children}
    </div>
  );
}
