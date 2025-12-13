import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { codingProjects } from "@/data/codingProjects";

type Params = { params: { slug: string } };

// 事前ビルド用（SSG）
export function generateStaticParams() {
  return codingProjects.map((p) => ({ slug: p.slug }));
}

// SEOメタ
export function generateMetadata({ params }: Params): Metadata {
  const p = codingProjects.find((x) => x.slug === params.slug);
  if (!p) return {};
  const title = `${p.title} | Coding Projects`;
  const description = p.summary ?? p.title;
  const images = p.hero ? [{ url: p.hero.src, width: p.hero.width, height: p.hero.height, alt: p.hero.alt }] : [];
  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default function CodingProjectPage({ params }: Params) {
  const project = codingProjects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <article className="prose prose-slate dark:prose-invert mx-auto max-w-3xl px-6 py-10">
      <h1>{project.title}</h1>
      <p className="text-sm text-slate-500">
        更新日: {new Date(project.updatedAt).toLocaleDateString()}
      </p>

      {project.hero && (
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          width={project.hero.width}
          height={project.hero.height}
          className="rounded-xl shadow my-6"
          priority
        />
      )}

      {/* 本文（自由にJSXを書けます） */}
      {project.body()}

      {project.links && project.links.length > 0 && (
        <>
          <h2>Links</h2>
          <ul>
            {project.links.map((l) => (
              <li key={l.href}>
                <a className="text-sky-600 dark:text-sky-400 hover:underline" href={l.href} target="_blank">
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}