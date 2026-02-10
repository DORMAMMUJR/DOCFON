
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Academia from './pages/Academia';
import Marketplace from './pages/Marketplace';
import Franchise from './pages/Franchise';
import Technology from './pages/Technology';
import { Icons, COLORS } from './constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Academia', path: '/academia' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Franquicia', path: '/franchise' },
    { name: 'Tecnología', path: '/technology' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-xl italic text-white shadow-lg">D</div>
          <span className="text-2xl font-black tracking-tighter text-white">DOC<span className="text-orange-500">FON</span></span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`text-sm font-semibold transition-colors uppercase tracking-widest ${location.pathname === link.path ? 'text-orange-500' : 'text-gray-300 hover:text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 neon-orange">
            COTIZAR REPARACIÓN
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-black border-t border-white/10 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-600 rounded-md flex items-center justify-center font-bold italic">D</div>
          <span className="text-xl font-black tracking-tighter">DOC<span className="text-orange-500">FON</span></span>
        </Link>
        <p className="text-gray-400 text-sm leading-relaxed">
          El ecosistema líder en reparación tecnológica y educación técnica en México. Impulsando la nueva generación de emprendedores tecnológicos.
        </p>
        <div className="flex space-x-4">
          {/* Social Icons Placeholder */}
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
            <span className="text-xs">FB</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
            <span className="text-xs">IG</span>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-bold mb-6">Explorar</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><Link to="/academia" className="hover:text-orange-500">Academia Técnica</Link></li>
          <li><Link to="/marketplace" className="hover:text-orange-500">Marketplace de Refacciones</Link></li>
          <li><Link to="/franchise" className="hover:text-orange-500">Modelos de Franquicia</Link></li>
          <li><Link to="/technology" className="hover:text-orange-500">Plataforma TEIKON/VISO</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6">Soporte</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><Link to="/help" className="hover:text-orange-500">Preguntas Frecuentes</Link></li>
          <li><Link to="/terms" className="hover:text-orange-500">Términos y Condiciones</Link></li>
          <li><Link to="/privacy" className="hover:text-orange-500">Aviso de Privacidad</Link></li>
          <li><Link to="/locations" className="hover:text-orange-500">Mapa de Sucursales</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6">Newsletter Corporate</h4>
        <p className="text-gray-400 text-sm mb-4">Recibe noticias sobre expansión y oportunidades de inversión.</p>
        <div className="flex">
          <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-orange-500 text-sm" />
          <button className="bg-orange-500 text-white px-4 py-2 rounded-r-lg font-bold text-sm">OK</button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
      <p>© 2024 DOCFON México. Todos los derechos reservados.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <p>Potenciado por TEIKON POS</p>
        <p>Estrategia VISO Automation</p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/academia" element={<Academia />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/technology" element={<Technology />} />
        </Routes>
      </main>
      <Footer />
      
      {/* Floating WhatsApp Action */}
      <a 
        href="https://wa.me/521000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center neon-orange"
      >
        <Icons.Whatsapp className="w-8 h-8" />
      </a>
    </HashRouter>
  );
};

export default App;
