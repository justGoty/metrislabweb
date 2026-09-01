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

function App() {
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isCatalogPage = normalizedPath === '/catalog';
  const isPrivacyPage = normalizedPath === '/privacy';

  return (
    <>
      <ScrollToHash />
      <Navbar />
      {isCatalogPage ? <CatalogPage /> : isPrivacyPage ? <PrivacyPage /> : <HomePage />}
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
