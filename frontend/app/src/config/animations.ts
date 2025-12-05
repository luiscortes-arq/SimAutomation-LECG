export const animations = {
  transition: {
    default: { duration: 0.3, ease: "easeInOut" as const },
    slow: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    spring: { type: "spring", stiffness: 300, damping: 30 },
    expo: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    float: { duration: 4, repeat: Infinity, repeatType: "reverse" as const },
    pulse: { duration: 2, repeat: Infinity },
    progress: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
    springSubtle: { type: "spring", bounce: 0.2, duration: 0.6 } as const,
    customBezier: [0.22, 1, 0.36, 1] as const,
  },
  variants: {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    fadeInDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    fadeInRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
    staggerContainer: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    breathing: {
      animate: {
        scale: [1, 1.1, 1],
        opacity: [0.2, 0.4, 0.2],
        transition: {
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      }
    },
    scaleUpSmall: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    slideInLeft: {
      initial: { x: -50, opacity: 0 },
      whileInView: { x: 0, opacity: 1 },
    },
    float: {
      initial: { rotate: -3 },
      animate: { rotate: -2 },
    },
    pulseRing: {
      animate: { boxShadow: ["0 0 0px rgba(63,97,131,0)", "0 0 20px rgba(63,97,131,0.5)", "0 0 0px rgba(63,97,131,0)"] },
    }
  }
};
