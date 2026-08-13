"use client";

import { useMemo, useState } from "react";
import NoteCard from "@/components/notes/NoteCard";
import { pickText, type SchoolArticleCard } from "@/data/schoolTypes";

export default function NotesExplorer({ notes }: { notes: SchoolArticleCard[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const tags = useMemo(() => ["All", ...Array.from(new Set(notes.flatMap((note) => note.tags))).sort()], [notes]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesTag = tag === "All" || note.tags.includes(tag);
      const text = `${pickText(note.title, "ja")} ${pickText(note.summary, "ja")} ${note.tags.join(" ")}`.toLowerCase();
      return matchesTag && (!normalized || text.includes(normalized));
    });
  }, [notes, query, tag]);

  return (
    <>
      <div className="mb-10 space-y-4 border-y border-slate-200 py-4 dark:border-slate-800">
        <label htmlFor="note-search" className="sr-only">ノートを検索</label>
        <input
          id="note-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="タイトル・概要・タグから検索"
          className="w-full max-w-md border-0 border-b border-slate-300 bg-transparent px-0 py-2 text-sm outline-none transition focus:border-blue-600 dark:border-slate-700 dark:text-white dark:focus:border-blue-400"
        />
        <div className="flex gap-2 overflow-x-auto pb-1" aria-label="タグで絞り込む">
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item)}
              aria-pressed={tag === item}
              className={`shrink-0 border px-3 py-1.5 text-xs transition ${tag === item ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950" : "border-slate-200 text-slate-600 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="mb-3 text-xs text-slate-500" aria-live="polite">{filtered.length} notes</p>
      <div className="grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((note) => <NoteCard key={note.slug} note={note} />)}
      </div>
    </>
  );
}
