import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { name: 'Academia', path: '/academia' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Franquicia', path: '/franchise' },
    { name: 'Tecnología', path: '/technology' },
];

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar menú al cambiar de ruta
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location.pathname]);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-xl italic text-white shadow-lg">
                        D
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">
                        DOC<span className="text-orange-500">FON</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-semibold transition-colors uppercase tracking-widest ${location.pathname === link.path
                                    ? 'text-orange-500'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 neon-orange"
                    >
                        COTIZAR REPARACIÓN
                    </Link>
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    aria-label="Abrir menú"
                >
                    <span
                        className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="bg-black/95 backdrop-blur-lg border-t border-white/10 px-6 py-6 flex flex-col space-y-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-semibold uppercase tracking-widest transition-colors ${location.pathname === link.path
                                    ? 'text-orange-500'
                                    : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        className="inline-block text-center px-5 py-3 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-all"
                    >
                        COTIZAR REPARACIÓN
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
