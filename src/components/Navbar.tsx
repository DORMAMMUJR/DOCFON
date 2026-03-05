import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoUrl from '../assets/docfon-logo.png.jpeg';
import { useCartStore } from '../store/useCartStore';
import { Icons } from '../constants';

const navLinks = [
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Franquicia', path: '/franchise' },
    { name: 'Tecnología', path: '/technology' },
];

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();

    // Obtenemos del store la cantidad total de artículos
    const { cart } = useCartStore();
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

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
                <Link to="/" className="flex items-center space-x-3">
                    <img
                        src={logoUrl}
                        alt="DOCFON Logo"
                        className="h-12 w-auto object-contain bg-white/90 rounded-xl p-1 shadow-lg border border-white/20 transition-transform hover:scale-105"
                    />
                    <span className="text-2xl font-black tracking-tighter text-white hidden sm:block">
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
                        className="px-5 py-2 bg-orange-500 text-white text-sm font-bold rounded-full hover:bg-orange-600 transition-all duration-300"
                    >
                        COTIZAR REPARACIÓN
                    </Link>

                    {/* Botón Login */}
                    <Link
                        to="/login"
                        className="text-white hover:text-orange-500 font-bold text-sm tracking-widest uppercase flex items-center gap-2 transition-colors"
                    >
                        <span className="hidden lg:inline">INGRESAR</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                    </Link>

                    {/* Botón Carrito */}
                    <Link
                        to="/checkout"
                        className="relative p-2 text-white hover:text-orange-500 transition-colors"
                    >
                        <Icons.Cart className="w-6 h-6" />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-blue-600 border-2 border-black text-white text-[10px] font-black rounded-full shadow-lg">
                                {cartItemsCount}
                            </span>
                        )}
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

                    {/* Botón Login en Mobile */}
                    <Link
                        to="/login"
                        className="flex items-center justify-between px-5 py-3 border border-white/20 hover:bg-white/10 text-white text-sm font-bold rounded-full transition-all uppercase"
                    >
                        <span className="flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                            INGRESAR
                        </span>
                    </Link>

                    {/* Botón Carrito en Mobile */}
                    <Link
                        to="/checkout"
                        className="flex items-center justify-between px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full transition-all"
                    >
                        <span className="flex items-center gap-3">
                            <Icons.Cart className="w-5 h-5" />
                            MI CARRITO
                        </span>
                        {cartItemsCount > 0 && (
                            <span className="px-2 py-1 bg-blue-600 text-[10px] font-black rounded-full">
                                {cartItemsCount} ITEMS
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
