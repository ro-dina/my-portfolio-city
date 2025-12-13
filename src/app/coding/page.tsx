import ProjectCard from "./components/coding/ProjectCard";
import { projects } from "@/data/project"

export const metadata = {
  title: "Programming – My City",
  description: "プログラミング作品のショーケース",
};

export default function CodingPage() {
    // ① 一覧に出すかを visibility でフィルタ
  const visible = projects.filter((p) => {
    const v = p.visibility ?? "public";     // 未設定は public 扱い
    return v === "public";                  // ← unlisted/hidden を除外
    // もし「hidden だけ除外」なら → return v !== "hidden";
  });

  const sorted = [...visible].sort(
    (a, b) => +new Date(b.updatedAt ?? 0) - +new Date(a.updatedAt ?? 0)
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-16">
        <section className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Programming
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Web / Algorithm / AI / Hardware… 作ったもの・作りかけ・アイデアの置き場です。
          </p>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}