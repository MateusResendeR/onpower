import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Partners from './pages/Partners';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

function App() {
    return (
      <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
      </Router>
    );
}

export default App