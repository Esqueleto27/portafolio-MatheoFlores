import { Link } from "@/i18n/navigation";

export function SectionCard({
  href,
  icon,
  label,
  description,
  count,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  count: string;
}) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-2xl border border-hair hover:border-accent bg-card no-underline transition-colors"
    >
      <div className="w-11 h-11 rounded-xl bg-fill2 text-accent-2 flex items-center justify-center mb-[18px]">
        {icon}
      </div>
      <p className="text-base font-semibold text-text mb-1.5">{label}</p>
      <p className="text-[13px] text-muted leading-normal mb-4">{description}</p>
      <p className="text-xs font-semibold text-accent font-mono">{count}</p>
    </Link>
  );
}
