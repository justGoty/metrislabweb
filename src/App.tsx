import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Advantages from './components/Advantages';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Advantages />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
