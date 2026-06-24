import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const variants = {
  up:     { hidden: { opacity: 0, y: 60 },        visible: { opacity: 1, y: 0 } },
  down:   { hidden: { opacity: 0, y: -60 },       visible: { opacity: 1, y: 0 } },
  left:   { hidden: { opacity: 0, x: -70 },       visible: { opacity: 1, x: 0 } },
  right:  { hidden: { opacity: 0, x: 70 },        visible: { opacity: 1, x: 0 } },
  zoom:   { hidden: { opacity: 0, scale: 0.75 },  visible: { opacity: 1, scale: 1 } },
  flip:   { hidden: { opacity: 0, rotateX: 90 },  visible: { opacity: 1, rotateX: 0 } },
  rotate: { hidden: { opacity: 0, rotate: -12, scale: 0.85 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
};

const easings = {
  up:     [0.16, 1, 0.3, 1],
  down:   [0.16, 1, 0.3, 1],
  left:   [0.16, 1, 0.3, 1],
  right:  [0.16, 1, 0.3, 1],
  zoom:   [0.34, 1.56, 0.64, 1],
  flip:   [0.16, 1, 0.3, 1],
  rotate: [0.34, 1.3, 0.64, 1],
};

export default function ScrollReveal({ children, delay = 0, direction = 'up', duration = 0.7 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction] ?? variants.up}
      transition={{ duration, delay, ease: easings[direction] ?? easings.up }}
      style={direction === 'flip' ? { perspective: 800 } : {}}
    >
      {children}
    </motion.div>
  );
}
