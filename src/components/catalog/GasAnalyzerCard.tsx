import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import type { GasAnalyzer } from '../../data/gasAnalyzers';

interface GasAnalyzerCardProps {
  analyzer: GasAnalyzer;
  name: string;
  description: string;
  manufacturer: string;
  typeLabel: string;
  manufacturerLabel: string;
  actionLabel: string;
}
export default function GasAnalyzerCard({
  analyzer,
  name,
  description,
  manufacturer,
  typeLabel,
  manufacturerLabel,
  actionLabel,
}: GasAnalyzerCardProps) {
  const requestHref = `/?model=${encodeURIComponent(name)}#contact`;

  return (
    <article className="group min-h-full overflow-hidden rounded-lg border border-slate-200 bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#1d9bf0]/40 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="flex aspect-[4/3] items-center justify-center border-b border-slate-100 bg-[#f6fafd] p-7">
        <img
          src={analyzer.image}
          alt={`${typeLabel} ${name}`}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex min-h-[310px] flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#eef8ff] px-2.5 py-1 text-xs font-semibold text-[#0b3a5b]">
            <BadgeCheck size={14} className="text-[#ff8a00]" />
            {typeLabel}
          </span>
        </div>

        <h2 className="mb-3 text-xl font-bold text-[#0b3a5b]">{name}</h2>
        <p className="mb-6 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-auto border-t border-slate-100 pt-4">
          <p className="mb-4 text-xs text-slate-500">
            {manufacturerLabel}: <span className="font-semibold text-slate-700">{manufacturer}</span>
          </p>
          <a
            href={requestHref}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0b3a5b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#145277]"
          >
            {actionLabel}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}
