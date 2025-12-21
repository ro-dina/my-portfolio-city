import { notFound } from "next/navigation";
import { codingProjects } from "@/data/codingProjects";
import CodingProjectClient from "./CodingProjectClient";

export default async function CodingProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = codingProjects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const { body, ...projectClient } = project;

  // 👇 Server で関数を実行（関数は Client に渡さない）
  const bodyJa = body.ja();
  const bodyEn = body.en?.();

  return (
    <CodingProjectClient
      project={projectClient}
      body={{ ja: bodyJa, en: bodyEn }}
    />
  );
}