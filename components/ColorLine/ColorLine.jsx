import React, { useState, useEffect, useRef } from 'react';

function ColorLine({ color }) {
  const lineRef = useRef(null);
  const [width, setWidth] = useState('0%');
  const [opacity, setOpacity] = useState(0.4);

  useEffect(() => {
    const handleScroll = () => {
      const element = lineRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollY = window.scrollY;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrollFraction = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.75)));
          const newWidth = Math.min(scrollFraction * 100, 100);
          const newOpacity = Math.min(0.2 + (0.8 * scrollFraction), 1.0);
          setWidth(`${newWidth}%`);
          setOpacity(newOpacity);
        } else if (scrollY === 0) {
          setWidth('0%');
          setOpacity(0.4);
        }
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll);
          handleScroll(); // Initial call to update immediately when the element is in view
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      });
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div
        ref={lineRef}
        className={`h-1 ${color} sm:max-w-[90%]  lg:max-w-[50%] bg-gradient-to-r from-transparent via-current to-transparent`}
        style={{ width, opacity}}
      ></div>
    </div>
  );
}

export default ColorLine;
