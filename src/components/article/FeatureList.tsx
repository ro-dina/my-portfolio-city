import type { ReactNode } from "react";

export default function FeatureList({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-1">{children}</ul>;
}