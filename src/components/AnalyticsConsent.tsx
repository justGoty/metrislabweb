import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Settings2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  CONSENT_SETTINGS_EVENT, getAnalyticsConsent, getServerConsent, installAnalytics,
  openAnalyticsSettings, setAnalyticsConsent, subscribeToConsent,
} from '../lib/analytics';

const subscribe = () => () => {};

export function AnalyticsSettingsButton() {
  const { i18n } = useTranslation();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  return (
    <button type="button" hidden={!hydrated} onClick={openAnalyticsSettings}
      className="mt-3 flex min-h-9 items-center gap-2 text-[#d7e0e4] underline underline-offset-4 hover:text-white">
      <Settings2 size={14} aria-hidden="true" />
      {i18n.resolvedLanguage?.startsWith('ru') !== false ? 'Настройки аналитики' : 'Analytics settings'}
    </button>
  );
}

export default function AnalyticsConsent() {
  const { i18n } = useTranslation();
  const isRussian = i18n.resolvedLanguage?.startsWith('ru') !== false;
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const consent = useSyncExternalStore(subscribeToConsent, getAnalyticsConsent, getServerConsent);
  const [editing, setEditing] = useState(false);
  const panel = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(installAnalytics, []);
  useEffect(() => {
    const open = () => {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setEditing(true);
    };
    window.addEventListener(CONSENT_SETTINGS_EVENT, open);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, open);
  }, []);
  useEffect(() => { if (editing) panel.current?.focus(); }, [editing]);

  if (!hydrated || (consent !== null && !editing)) return null;
  const choose = (value: 'granted' | 'denied') => {
    setAnalyticsConsent(value);
    setEditing(false);
    returnFocus.current?.focus({ preventScroll: true });
  };

  return (
    <section ref={panel} tabIndex={-1} aria-labelledby="analytics-title"
      className="fixed inset-x-0 bottom-0 z-[45] max-h-[60dvh] overflow-y-auto border-t border-[#cbd3d8] bg-white text-[#172027] shadow-[0_-4px_24px_#1720270d] outline-none">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-12">
        <div className="max-w-3xl text-sm leading-6">
          <h2 id="analytics-title" className="font-semibold">{isRussian ? 'Аналитика сайта' : 'Website analytics'}</h2>
          <p className="mt-1 text-[#53636c]">
            {isRussian ? 'С вашего согласия используем Яндекс Метрику и cookies для оценки посещаемости и заявок. Без аналитики сайт работает так же.' : 'With your permission, we use Yandex Metrica and cookies to measure visits and enquiries. The website works without analytics.'}{' '}
            <a href="/privacy/#analytics" target="_blank" rel="noopener" className="underline underline-offset-4">
              {isRussian ? 'Подробнее' : 'Details'}
            </a>
          </p>
        </div>
        <div className="grid shrink-0 grid-cols-2 gap-3 text-xs font-semibold sm:text-sm">
          <button type="button" onClick={() => choose('denied')} className="min-h-11 border border-[#82949e] px-3 py-2 hover:bg-[#f2f5f6] focus-visible:outline-2 focus-visible:outline-offset-2">
            {isRussian ? 'Без аналитики' : 'No analytics'}
          </button>
          <button type="button" onClick={() => choose('granted')} className="min-h-11 border border-[#82949e] px-3 py-2 hover:bg-[#f2f5f6] focus-visible:outline-2 focus-visible:outline-offset-2">
            {isRussian ? 'Разрешить аналитику' : 'Allow analytics'}
          </button>
        </div>
      </div>
    </section>
  );
}
