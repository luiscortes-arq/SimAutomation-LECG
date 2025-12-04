import React, { useState } from 'react';
import { BarraNavegacion as StickyNavbar } from './components/Navegacion/BarraNavegacion';
import { Hero } from './components/Hero';
import { CaracteristicaOrdenamiento as SortingFeature } from './components/CaracteristicaOrdenamiento';
import { CaracteristicaReemplazo as ReplacingFeature } from './components/CaracteristicaReemplazo';
import { DemostracionAntesDespues as BeforeAfterDemo } from './components/DemostracionAntesDespues';
import { TablaAhorros as SavingsTable } from './components/TablaAhorros';
import { PieDePagina as Footer } from './components/PieDePagina';
import { SortingPage } from './components/SortingPage';
import { ReplacingPage } from './components/ReplacingPage';

type ViewState = 'home' | 'sorting' | 'replacing';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} h-full w-full`}>
      {/* Global Sticky Navbar - Persists across all views */}
      <StickyNavbar 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <div className="h-screen w-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-500 overflow-hidden">
        
        {currentView === 'home' && (
          <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar">
            <div id="home" className="snap-start h-screen w-full relative">
              <Hero />
            </div>
            
            <div id="sorting" className="snap-start h-screen w-full relative">
                <SortingFeature onNavigate={() => setCurrentView('sorting')} />
            </div>
            
            <div id="replacing" className="snap-start h-screen w-full relative">
                <ReplacingFeature onNavigate={() => setCurrentView('replacing')} />
            </div>

            <div id="demo" className="snap-start h-screen w-full relative">
                <BeforeAfterDemo />
            </div>

            <div id="savings" className="snap-start h-screen w-full relative">
                <SavingsTable />
            </div>

            <div className="snap-start relative">
              <Footer />
            </div>
          </div>
        )}

        {currentView === 'sorting' && (
           <div className="h-full w-full overflow-y-auto">
             <SortingPage onBack={() => setCurrentView('home')} />
           </div>
        )}

        {currentView === 'replacing' && (
           <div className="h-full w-full overflow-y-auto">
             <ReplacingPage onBack={() => setCurrentView('home')} />
           </div>
        )}

      </div>
    </div>
  );
}

export default App;
