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
import { ThemeProvider } from './contexts/ThemeContext';
import SectionAnimator from './components/SectionAnimator';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-sans leading-normal tracking-normal scroll-smooth">
        <Header />
        <main>
          <Hero />
          <SectionAnimator>
            <Services />
          </SectionAnimator>
          <SectionAnimator>
            <About />
          </SectionAnimator>
          <SectionAnimator>
            <Testimonials />
          </SectionAnimator>
          <SectionAnimator>
            <Contact />
          </SectionAnimator>
        </main>
        <Footer />
        <AIChat />
        <BackToTopButton />
      </div>
    </ThemeProvider>
  );
};

export default App;