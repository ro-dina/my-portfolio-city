export default function StatusChip({ status }: { status?: "wip" | "done" | "idea" }) {
  if (!status) return null;
  const map = {
    wip: "bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300",
    done: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-300",
    idea: "bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300",
  } as const;
  return (
    <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${map[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}