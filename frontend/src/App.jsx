import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import Rules from './components/Rules.jsx';
import Game from './components/Game.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/play" element={<Game />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;
