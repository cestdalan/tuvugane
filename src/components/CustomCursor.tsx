import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'media'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for Awwwards-style luxury feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over an element with data-cursor
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null;
      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
        setCursorVariant(text ? 'media' : 'hover');
      } else {
        const clickable = (e.target as HTMLElement)?.closest('button, a, input, textarea, select, [role="button"]');
        if (clickable) {
          setCursorText('');
          setCursorVariant('hover');
        } else {
          setCursorText('');
          setCursorVariant('default');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-100 overflow-hidden hidden md:block">
      {/* Outer interactive ring / follower */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: cursorVariant === 'media' ? 84 : cursorVariant === 'hover' ? 44 : 26,
          height: cursorVariant === 'media' ? 84 : cursorVariant === 'hover' ? 44 : 26,
          backgroundColor:
            cursorVariant === 'media'
              ? 'rgba(255, 255, 255, 0.95)'
              : cursorVariant === 'hover'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'transparent',
          border:
            cursorVariant === 'media'
              ? 'none'
              : cursorVariant === 'hover'
              ? '1px solid rgba(255, 255, 255, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.45)',
          backdropFilter: cursorVariant === 'media' ? 'none' : 'blur(2px)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <span className="text-[10px] font-liber font-black tracking-widest text-black uppercase select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint dot */}
      {cursorVariant !== 'media' && (
        <motion.div
          className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            x: mouseX,
            y: mouseY,
          }}
        />
      )}
    </div>
  );
}
