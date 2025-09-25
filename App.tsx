import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import BackToTopButton from './components/BackToTopButton';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-gray-300 font-sans leading-normal tracking-normal scroll-smooth">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIChat />
      <BackToTopButton />
    </div>
  );
};

export default App;
