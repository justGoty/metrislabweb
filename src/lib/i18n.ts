import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../public/locales/en/translation.json';
import ru from '../../public/locales/ru/translation.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    supportedLngs: ['ru', 'en'],
    initAsync: false,
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  });

export function restoreLanguagePreference() {
  const syncDocumentLanguage = (language: string) => {
    document.documentElement.lang = language.startsWith('en') ? 'en' : 'ru';
    try { localStorage.setItem('i18nextLng', language); } catch { /* Storage may be disabled. */ }
  };
  i18n.on('languageChanged', syncDocumentLanguage);
  try {
    const saved = localStorage.getItem('i18nextLng');
    if (saved?.startsWith('en')) void i18n.changeLanguage('en');
  } catch { /* Keep Russian when storage is unavailable. */ }
  return () => { i18n.off('languageChanged', syncDocumentLanguage); };
}

export default i18n;
