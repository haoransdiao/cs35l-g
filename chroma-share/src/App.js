import './App.css';
import Navbar from './Navbar';
import Hero from './Hero';
import Footer from './Footer'

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="Hero">
        <Hero />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
