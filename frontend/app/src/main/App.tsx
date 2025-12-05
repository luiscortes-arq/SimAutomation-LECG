
import React, { useState } from 'react';
import { Encabezado as StickyNavbar } from '../components/ui/Encabezado/Encabezado';
import { PaginaInicio } from '../pages/PaginaInicio';
import { PaginaPurgado } from '../pages/PaginaPurgado';
import { PaginaReemplazo } from '../pages/PaginaReemplazo';

type ViewState = 'home' | 'sorting' | 'replacing';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize theme on mount
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} h-full w-full`}>
      {/* Sticky Navigation Bar */}
      <StickyNavbar 
        esModoOscuro={isDarkMode} 
        alternarTema={toggleTheme} 
        vistaActual={currentView}
        alNavegar={handleNavigate}
      />

      <div className="h-screen w-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-500 overflow-hidden">
        
        {currentView === 'home' && (
          <PaginaInicio alNavegar={handleNavigate} />
        )}

        {currentView === 'sorting' && (
           <div className="h-full w-full overflow-y-auto">
             <PaginaPurgado onBack={() => setCurrentView('home')} />
           </div>
        )}

        {currentView === 'replacing' && (
           <div className="h-full w-full overflow-y-auto">
             <PaginaReemplazo onBack={() => setCurrentView('home')} />
           </div>
        )}

      </div>
    </div>
  );
}

export default App;
