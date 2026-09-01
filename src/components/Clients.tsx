import { ArrowRight, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Clients() {
  const { t } = useTranslation();
  const clients = ['СТА', 'ПРОМРЕСУРС', 'КИП-КОНСАЛТ', 'БЕРИЛЛ-М'];

  return (
    <section className="border-y border-[#cbd3d8] bg-[#f2f5f6] py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="section-kicker">{t('clients.label')}</p>
            <h2 className="mt-4 max-w-lg text-2xl font-semibold leading-tight text-[#172027] sm:text-3xl">
              {t('clients.title')}
            </h2>
          </div>
          <div>
            <div className="grid grid-cols-2 border-l border-t border-[#cbd3d8] sm:grid-cols-4">
              {clients.map((client) => (
                <div key={client} className="flex min-h-28 items-center justify-center gap-2 border-b border-r border-[#cbd3d8] bg-white px-3 text-center">
                  <Building2 size={17} className="shrink-0 text-[#7c8c94]" />
                  <span className="text-xs font-semibold text-[#27343b] sm:text-sm">{client}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="link-arrow mt-6">
              {t('clients.cta')}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
