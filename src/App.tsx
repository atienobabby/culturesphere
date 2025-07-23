import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Music from './pages/Music';
import Dining from './pages/Dining';
import Travel from './pages/Travel';
import Fashion from './pages/Fashion';
import Learning from './pages/Learning';
import Wellness from './pages/Wellness';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/music" element={<Music />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/wellness" element={<Wellness />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;