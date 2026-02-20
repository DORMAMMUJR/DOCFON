import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-600 rounded-md flex items-center justify-center font-bold italic">
                        D
                    </div>
                    <span className="text-xl font-black tracking-tighter">
                        DOC<span className="text-orange-500">FON</span>
                    </span>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed">
                    El ecosistema líder en reparación tecnológica y educación técnica en México. Impulsando la nueva generación de emprendedores tecnológicos.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="https://facebook.com/docfon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook DOCFON"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer"
                    >
                        <span className="text-xs font-bold">FB</span>
                    </a>
                    <a
                        href="https://instagram.com/docfon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram DOCFON"
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer"
                    >
                        <span className="text-xs font-bold">IG</span>
                    </a>
                </div>
            </div>

            {/* Explorar */}
            <div>
                <h4 className="text-white font-bold mb-6">Explorar</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                    <li><Link to="/academia" className="hover:text-orange-500 transition-colors">Academia Técnica</Link></li>
                    <li><Link to="/marketplace" className="hover:text-orange-500 transition-colors">Marketplace de Refacciones</Link></li>
                    <li><Link to="/franchise" className="hover:text-orange-500 transition-colors">Modelos de Franquicia</Link></li>
                    <li><Link to="/technology" className="hover:text-orange-500 transition-colors">Plataforma TEIKON/VISO</Link></li>
                </ul>
            </div>

            {/* Soporte */}
            <div>
                <h4 className="text-white font-bold mb-6">Soporte</h4>
                <ul className="space-y-4 text-gray-400 text-sm">
                    <li><Link to="/help" className="hover:text-orange-500 transition-colors">Preguntas Frecuentes</Link></li>
                    <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Términos y Condiciones</Link></li>
                    <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Aviso de Privacidad</Link></li>
                    <li><Link to="/locations" className="hover:text-orange-500 transition-colors">Mapa de Sucursales</Link></li>
                </ul>
            </div>

            {/* Newsletter */}
            <div>
                <h4 className="text-white font-bold mb-6">Newsletter Corporate</h4>
                <p className="text-gray-400 text-sm mb-4">Recibe noticias sobre expansión y oportunidades de inversión.</p>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-orange-500 text-sm"
                    />
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-4 py-2 rounded-r-lg font-bold text-sm"
                    >
                        OK
                    </button>
                </form>
            </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} DOCFON México. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <p>Potenciado por TEIKON POS</p>
                <p>Estrategia VISO Automation</p>
            </div>
        </div>
    </footer>
);

export default Footer;
