import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ReplacingPage } from './pages/ReplacingPage';
import { SortingPage } from './pages/SortingPage';

function App() {
  const [esModoOscuro, setEsModoOscuro] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setEsModoOscuro(true);
    }
  }, []);

  useEffect(() => {
    if (esModoOscuro) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [esModoOscuro]);

  const alternarTema = () => {
    setEsModoOscuro(!esModoOscuro);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage esModoOscuro={esModoOscuro} alternarTema={alternarTema} />} />
        <Route path="/replace" element={<ReplacingPage esModoOscuro={esModoOscuro} alternarTema={alternarTema} />} />
        <Route path="/purge" element={<SortingPage esModoOscuro={esModoOscuro} alternarTema={alternarTema} />} />
      </Routes>
    </Router>
  );
}

export default App;
