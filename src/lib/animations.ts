import type { Variants } from 'framer-motion';

export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft: { type: 'spring'; stiffness: number; damping: number; mass: number } = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1,
};

export const springGentle: { type: 'spring'; stiffness: number; damping: number; mass: number } = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
  mass: 1.2,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const whileHoverCard = {
  y: -4,
  transition: { duration: 0.3, ease: easeOut },
};

export const whileHoverScale = {
  scale: 1.02,
  transition: { duration: 0.3, ease: easeOut },
};
