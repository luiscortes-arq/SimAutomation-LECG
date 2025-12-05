import React from 'react';

interface PropiedadesTarjetaVidrio {
  children: React.ReactNode;
  className?: string;
}

export const TarjetaVidrio: React.FC<PropiedadesTarjetaVidrio> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-[#070707] border border-zinc-200 dark:border-white/10 rounded-xl shadow-lg relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
