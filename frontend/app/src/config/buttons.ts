export const buttons = {
  base: "rounded-full px-6 py-2 font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer",
  variants: {
    primary: "bg-[#2997ff] text-white hover:bg-[#0077ED] shadow-lg hover:shadow-xl",
    secondary: "bg-[#1d1d1f] text-[#2997ff] border border-[#2997ff] hover:bg-[#2997ff] hover:text-white",
    ghost: "bg-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10",
    outline: "bg-transparent border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20",
    danger: "bg-hermosillo-red text-white hover:bg-red-700",
    success: "bg-hermosillo-palm text-white hover:bg-[#5a6b3d]",
  },
  sizes: {
    sm: "text-xs px-4 py-1.5",
    md: "text-sm px-6 py-2",
    lg: "text-base px-8 py-3",
    icon: "p-2 aspect-square",
  }
};
