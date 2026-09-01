import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const clients = [
  {
    name: 'СТА',
    logo: '/images/clients/sta.png',
    logoClass: 'h-6 w-auto sm:h-7',
  },
  {
    name: 'ПРОМРЕСУРС',
    logo: '/images/clients/promresurs.webp',
    logoClass: 'h-[4.5rem] w-auto sm:h-20',
  },
  {
    name: 'КИП-КОНСАЛТ',
    logo: '/images/clients/kip-consult.webp',
    logoClass: 'h-10 w-auto sm:h-11',
  },
] as const;

export default function Clients() {
  const { t } = useTranslation();

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
            <div className="grid grid-cols-2 border-l border-t border-[#cbd3d8] bg-white sm:grid-cols-4">
              {clients.map((client) => (
                <div
                  key={client.name}
                  className="flex min-h-28 items-center justify-center border-b border-r border-[#cbd3d8] px-5 py-6"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`${client.logoClass} max-w-full object-contain`}
                    loading="lazy"
                  />
                </div>
              ))}
              <div
                className="flex min-h-28 items-center justify-center border-b border-r border-[#cbd3d8] px-3 py-6 sm:px-5"
                aria-label="Берилл-М"
              >
                <div className="flex items-center gap-2 text-[#172027] sm:gap-3">
                  <span className="grid size-10 place-items-center border border-[#172027] font-mono text-sm font-semibold">
                    БМ
                  </span>
                  <span className="text-xs font-semibold tracking-[0.04em] sm:text-sm">БЕРИЛЛ-М</span>
                </div>
              </div>
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
