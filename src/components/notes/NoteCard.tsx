import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { pickText, type SchoolArticleCard } from "@/data/schoolTypes";

export default function NoteCard({ note }: { note: SchoolArticleCard }) {
  return (
    <article className="group flex h-full flex-col border-t border-slate-200 py-5 dark:border-slate-800">
      <Link href={`/notes/${note.slug}`} className="focus-visible:outline-offset-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold tracking-tight text-slate-950 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-400">
            {pickText(note.title, "ja")}
          </h3>
          <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" aria-hidden>→</span>
        </div>
      </Link>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {pickText(note.summary, "ja") || "内容を整理中です。"}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {note.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
      <time className="mt-auto pt-5 text-xs text-slate-500" dateTime={note.updatedAt || undefined}>
        Updated {note.updatedAt || "—"}
      </time>
    </article>
  );
}
