import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Laboratory from './components/Laboratory';
import Clients from './components/Clients';
import GasAnalyzerModels from './components/GasAnalyzerModels';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CatalogPage from './pages/CatalogPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import { restoreLanguagePreference } from './lib/i18n';
import { usePageMeta } from './lib/usePageMeta';
import { getPageMeta } from './data/pageMeta';
import { useTranslation } from 'react-i18next';

function ScrollToHash() {
  useEffect(() => {
    if (!window.location.hash) return;

    const targetId = window.location.hash.slice(1);
    const scroll = () => {
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
    };
    const timeoutIds = [120, 900].map((delay) => window.setTimeout(scroll, delay));
    document.fonts?.ready.then(scroll);

    return () => timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }, []);

  return null;
}

function HomePage() {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Services />
      <Process />
      <Laboratory />
      <GasAnalyzerModels />
      <Clients />
      <FAQ />
      <ContactForm />
    </main>
  );
}

function App({ pathname }: { pathname: string }) {
  const { i18n } = useTranslation();
  usePageMeta(getPageMeta(pathname, i18n.resolvedLanguage));
  useEffect(restoreLanguagePreference, []);
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const isCatalogPage = normalizedPath === '/catalog';
  const isPrivacyPage = normalizedPath === '/privacy';

  return (
    <>
      <ScrollToHash />
      <Navbar isHomePage={normalizedPath === '/'} />
      {isCatalogPage ? <CatalogPage /> : isPrivacyPage ? <PrivacyPage /> : normalizedPath === '/' ? <HomePage /> : <NotFoundPage />}
      <Footer isHomePage={normalizedPath === '/'} />
      <ScrollToTop />
    </>
  );
}

export default App;
