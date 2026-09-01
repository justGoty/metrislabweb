import { ArrowUpRight } from 'lucide-react';
import type { GasAnalyzer } from '../../data/gasAnalyzers';

interface GasAnalyzerCardProps {
  analyzer: GasAnalyzer;
  index: number;
  name: string;
  description: string;
  manufacturer: string;
  typeLabel: string;
  manufacturerLabel: string;
  actionLabel: string;
}

export default function GasAnalyzerCard({
  analyzer,
  index,
  name,
  description,
  manufacturer,
  typeLabel,
  manufacturerLabel,
  actionLabel,
}: GasAnalyzerCardProps) {
  const requestHref = `/?model=${encodeURIComponent(name)}#contact`;

  return (
    <article className="group flex min-h-full min-w-0 flex-col border-b border-r border-[#aeb9bf] bg-white">
      <header className="flex min-h-11 items-center justify-between gap-3 border-b border-[#cbd3d8] px-4 font-mono text-[11px] text-[#63717a] sm:px-5">
        <span>ML / GAS / {String(index).padStart(2, '0')}</span>
        <span className="flex min-w-0 items-center gap-2 text-right text-[#0b4668]">
          <span className="h-1.5 w-1.5 flex-none bg-[#277a57]" aria-hidden="true" />
          <span className="truncate">{typeLabel}</span>
        </span>
      </header>

      <div className="relative flex aspect-[5/4] items-center justify-center overflow-hidden border-b border-[#cbd3d8] bg-[#f2f5f6] p-6 sm:p-8">
        <span
          className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-[#8f9da5]"
          aria-hidden="true"
        />
        <span
          className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-[#8f9da5]"
          aria-hidden="true"
        />
        <img
          src={analyzer.image}
          alt={`${typeLabel} ${name}`}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-200 motion-reduce:transition-none group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-medium uppercase text-[#63717a]">{manufacturer}</p>
            <h2 className="break-words font-mono text-xl font-semibold leading-tight text-[#172027] sm:text-2xl">{name}</h2>
          </div>
          <span className="mt-1 h-2.5 w-2.5 flex-none bg-[#f28c18]" aria-hidden="true" />
        </div>

        <p className="mb-7 text-sm leading-6 text-[#56636b]">{description}</p>

        <dl className="mt-auto border-t border-[#cbd3d8] text-xs">
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] border-b border-[#cbd3d8] py-3">
            <dt className="pr-3 text-[#63717a]">{manufacturerLabel}</dt>
            <dd className="min-w-0 break-words font-mono font-semibold text-[#172027]">{manufacturer}</dd>
          </div>
        </dl>

        <a
          href={requestHref}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-[2px] border border-[#0b4668] bg-[#0b4668] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#083750] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b4668]"
        >
          <span>{actionLabel}</span>
          <ArrowUpRight size={18} className="flex-none" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
