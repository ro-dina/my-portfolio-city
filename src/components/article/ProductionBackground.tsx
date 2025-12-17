import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  id?: string;
};

export default function ProductionBackground({ title, children, id }: Props) {
  return (
    <section
      id={id}
      className="mt-8 rounded-xl border border-slate-200/70 bg-white/60 p-5 backdrop-blur dark:border-slate-800/80 dark:bg-slate-900/50"
    >
      <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-slate-700 dark:text-slate-200">
        {children}
      </div>
    </section>
  );
}