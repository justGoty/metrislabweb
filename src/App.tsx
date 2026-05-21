import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Advantages from './components/Advantages';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ParallaxBackground from './components/ParallaxBackground';

function App() {
  return (
    <>
      <ParallaxBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Advantages />
        <ContactForm />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
