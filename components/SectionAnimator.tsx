import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const SectionAnimator: React.FC<Props> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 ease-out ${
        isVisible ? 'opacity-100 animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: '0s' }} // Reset animation delay from global style
    >
      {children}
    </div>
  );
};

export default SectionAnimator;
