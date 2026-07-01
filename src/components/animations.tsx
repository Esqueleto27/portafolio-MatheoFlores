"use client";
import { type Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.72, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.52, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export const staggerContainer = (staggerTime = 0.09, delay = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delay,
    },
  },
});

export const drawLine: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.25, 0.4, 0.25, 1] },
  },
};
