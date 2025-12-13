export default function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-100">
      {children}
    </span>
  );
}