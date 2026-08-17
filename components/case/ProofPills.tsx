export function ProofPills({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-2${className ? ` ${className}` : ""}`}
    >
      <span className="meta mr-2 text-night-ink/45">Outcomes</span>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-night-ink/90"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
