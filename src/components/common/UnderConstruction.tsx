"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  title?: string;
  message?: string;
  homeHref?: string;
};

export default function UnderConstruction({
  title = "この施設は準備中です",
  message = "ページが公開されるまでしばらくお待ちください。",
  homeHref = "/",
}: Props) {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-10">
      {/* card */}
      <section className="relative mx-auto w-full max-w-lg rounded-2xl border border-gray-200/60 bg-white/70 dark:bg-white/5 shadow-xl backdrop-blur-md p-8 md:p-10">
        {/* badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50/80 px-3 py-1 text-xs font-medium text-sky-700 dark:border-sky-400/40 dark:bg-sky-400/10 dark:text-sky-300">
          <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
          Coming soon
        </div>

        {/* title */}
        <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>

        {/* image */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <Image
            src="/images/furniture/closed.svg"             // public/closed.png
            alt="Closed sign"
            width={320}
            height={320}
            className="w-48 md:w-56 h-auto drop-shadow-lg"
            priority
          />
        </div>

        {/* message */}
        <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          {message}
        </p>

        {/* actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => router.back()}
            className="inline-flex justify-center items-center rounded-lg px-4 py-2.5 text-[15px] font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition dark:bg-white/10 dark:hover:bg-white/15 dark:text-gray-200"
            aria-label="前のページに戻る"
          >
            ← 戻る
          </button>

          <Link
            href={homeHref}
            className="inline-flex justify-center items-center rounded-lg px-4 py-2.5 text-[15px] font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 transition shadow-sm"
            aria-label="トップへ戻る"
          >
            ⌂ トップへ
          </Link>
        </div>
      </section>
    </div>
  );
}