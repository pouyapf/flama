import React, { useState, useEffect, useRef } from 'react';

function LightEffect({ color, trigger }) {
  const [top, setTop] = useState('-31rem');
  const [opacity, setOpacity] = useState(0.2);
  const ref = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const handleScroll = () => {
      const element = ref.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const scrollFraction = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.75)));
          const newTop = -31 + (14 * scrollFraction); // -30rem to -18rem
          const newOpacity = 0.2 + (0.8 * scrollFraction); // 0.4 to 1

          setTop(`${newTop}rem`);
          setOpacity(newOpacity);
        } else {
          setTop('-31rem');
          setOpacity(0.2);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [trigger]);

  if (!trigger) {
    return (
      <div className='w-full  flex justify-center items-center h-0'>
        <div className='absolute -top-72 bg-blue-radial-gradient lg:w-[50%] md:w-[90%] w-[90%] rounded-full h-[32rem]'></div>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-center items-center h-0'>
      <div
        ref={ref}
        className={`absolute lg:w-[50%] md:w-[90%] w-[90%] ${color}  rounded-full h-[32rem]`}
        style={{ top: top, opacity: opacity }}
      ></div>
    </div>
  );
}

export default LightEffect;
