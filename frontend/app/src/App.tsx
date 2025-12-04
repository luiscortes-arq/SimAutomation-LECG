import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ReplacingPage } from './pages/ReplacingPage';
import { SortingPage } from './pages/SortingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/replace" element={<ReplacingPage onBack={() => window.history.back()} />} />
        <Route path="/purge" element={<SortingPage onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}

export default App;
