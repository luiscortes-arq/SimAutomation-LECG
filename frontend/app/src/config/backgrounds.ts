import { theme } from './theme';

export const backgrounds = {
  noise: {
    url: "url('https://grainy-gradients.vercel.app/noise.svg')",
    style: "opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none"
  },
  grid: {
    technical: {
      backgroundImage: 'linear-gradient(to right, rgba(128,128,128,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(128,128,128,0.03) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
    },
    dots: {
      backgroundImage: `radial-gradient(${theme.colors.hermosillo.palm} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 100%, transparent 100%)',
      className: "opacity-[0.1] dark:opacity-[0.08] pointer-events-none"
    },
    ultraPremium: {
      backgroundImage: `linear-gradient(${theme.colors.hermosillo.mediumBlue} 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.hermosillo.mediumBlue} 1px, transparent 1px)`,
      backgroundSize: '64px 64px',
      className: "opacity-[0.02] pointer-events-none"
    }
  },
  glow: {
    palm: "bg-hermosillo-palm/5 rounded-full blur-[120px] pointer-events-none",
    blue: "bg-hermosillo-darkBlue/20 dark:bg-hermosillo-darkBlue/15 rounded-[100%] blur-[100px] pointer-events-none"
  }
};
