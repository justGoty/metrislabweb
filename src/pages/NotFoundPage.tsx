import { ArrowRight, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { i18n } = useTranslation();
  const isRussian = !i18n.language.startsWith('en');
  return (
    <main className="min-h-[70svh] bg-white px-5 pb-20 pt-40 sm:px-8 sm:pt-48">
      <div className="mx-auto max-w-[1120px]">
        <p className="section-kicker">404</p>
        <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">{isRussian ? 'Страница не найдена' : 'Page not found'}</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-[#53636c]">
          {isRussian ? 'Возможно, адрес изменился. Выберите газоанализатор в каталоге или свяжитесь с нами по вопросу обслуживания.' : 'The address may have changed. Find your gas analyzer in the catalog or contact us about servicing.'}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/catalog/" className="button-primary">{isRussian ? 'Каталог газоанализаторов' : 'Gas analyzer catalog'}<ArrowRight size={18} /></a>
          <a href="/" className="button-secondary">{isRussian ? 'На главную' : 'Home'}</a>
        </div>
        <a href="tel:+79060799144" className="link-arrow mt-8"><Phone size={17} />+7 906 079 91 44</a>
      </div>
    </main>
  );
}
