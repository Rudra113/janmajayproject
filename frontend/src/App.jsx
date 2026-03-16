import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CarListing from './pages/CarListing';
import CarDetail from './pages/CarDetail';
import Recommendation from './pages/Recommendation';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container" style={{ paddingTop: '120px', paddingBottom: '40px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<CarListing />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/recommend" element={<Recommendation />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
