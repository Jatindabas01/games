import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import './App.css';
import Home from './pages/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';

// Pages
import TicTacToe from './pages/TicTacToe';
import MemoryGame from './pages/MemoryGame';
import SnakeGame from './pages/SnakeGame';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div style={{ backgroundColor: theme.colors.background.main, minHeight: '100vh' }}>
          <Nav />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tictactoe" element={<TicTacToe />} />
              <Route path="/memory" element={<MemoryGame />} />
              <Route path="/snake" element={<SnakeGame />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
