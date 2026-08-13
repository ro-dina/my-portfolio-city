import Link from "next/link";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div className="max-w-2xl">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl dark:text-white">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
            {description}
          </p>
        ) : null}
      </div>
      {href && linkLabel ? (
        <Link href={href} className="quiet-link hidden shrink-0 sm:inline-flex">
          {linkLabel} <span aria-hidden>→</span>
        </Link>
      ) : null}
    </div>
  );
}
