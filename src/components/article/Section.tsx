import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  id?: string;
  highlightOnTarget?: boolean;
};

export default function Section({ title, children, id, highlightOnTarget = false }: Props) {
  return (
    <section
      id={id}
      className={`select-none rounded-2xl border border-slate-200 bg-white p-5 shadow-sm overflow-hidden [scroll-margin-top:var(--school-anchor-offset,7rem)] dark:border-white/10 dark:bg-slate-900 ${highlightOnTarget ? "toc-target-highlight" : ""}`}
    >
      <h2 className="section-title select-text inline-block max-w-full align-top text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-slate-700 dark:text-slate-200">
        {children}
      </div>
    </section>
  );
}
