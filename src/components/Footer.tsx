import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Brand — ocupa 2 columnas en lg */}
            <div className="lg:col-span-2 space-y-6">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-blue-600 rounded-md flex items-center justify-center font-bold italic">
                        D
                    </div>
                    <span className="text-xl font-black tracking-tighter">
                        DOC<span className="text-orange-500">FON</span>
                    </span>
                </Link>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                    El ecosistema líder en reparación tecnológica y educación técnica en México. Impulsando la nueva generación de emprendedores tecnológicos.
                </p>
                {/* Redes sociales */}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Síguenos</p>
                    <div className="flex space-x-3">
                        {[
                            { label: 'FB', href: 'https://facebook.com/docfon', aria: 'Facebook DOCFON' },
                            { label: 'IG', href: 'https://instagram.com/docfon', aria: 'Instagram DOCFON' },
                            { label: 'TT', href: 'https://tiktok.com/@docfon', aria: 'TikTok DOCFON' },
                            { label: 'YT', href: 'https://youtube.com/@docfon', aria: 'YouTube DOCFON' },
                        ].map(({ label, href, aria }) => (
                            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={aria}
                                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-all text-xs font-bold">
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Explorar */}
            <div>
                <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Explorar</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                    <li><Link to="/academia" className="hover:text-orange-500 transition-colors">Academia Técnica</Link></li>
                    <li><Link to="/marketplace" className="hover:text-orange-500 transition-colors">Marketplace</Link></li>
                    <li><Link to="/franchise" className="hover:text-orange-500 transition-colors">Franquicias</Link></li>
                    <li><Link to="/technology" className="hover:text-orange-500 transition-colors">Tecnología TEIKON</Link></li>
                    <li><Link to="/vender-telefono" className="hover:text-orange-500 transition-colors">Vende tu Teléfono</Link></li>
                </ul>
            </div>

            {/* Soporte y Legal */}
            <div>
                <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Soporte</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                    <li><Link to="/help" className="hover:text-orange-500 transition-colors">Preguntas Frecuentes</Link></li>
                    <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Cotizar Reparación</Link></li>
                    <li><Link to="/locations" className="hover:text-orange-500 transition-colors">Mapa de Sucursales</Link></li>
                    <li>
                        <a href="https://wa.me/525541893360" target="_blank" rel="noopener noreferrer"
                            className="hover:text-orange-500 transition-colors">
                            WhatsApp Directo
                        </a>
                    </li>
                    <li>
                        <a href="https://blog.docfon.mx" target="_blank" rel="noopener noreferrer"
                            className="hover:text-orange-500 transition-colors flex items-center gap-1">
                            Blog <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold">NUEVO</span>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Legal + Newsletter */}
            <div className="space-y-8">
                <div>
                    <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-widest">Legal</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link to="/privacy" className="hover:text-orange-500 transition-colors">Aviso de Privacidad</Link></li>
                        <li><Link to="/terms" className="hover:text-orange-500 transition-colors">Términos y Condiciones</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-widest">Newsletter</h4>
                    <p className="text-gray-400 text-xs mb-3">Recibe noticias de expansión y oportunidades.</p>
                    <form onSubmit={(e) => e.preventDefault()} className="flex">
                        <input type="email" placeholder="Email"
                            className="bg-white/5 border border-white/10 rounded-l-lg px-3 py-2 w-full focus:outline-none focus:border-orange-500 text-xs" />
                        <button type="submit"
                            className="bg-orange-500 hover:bg-orange-600 transition-colors text-white px-3 py-2 rounded-r-lg font-bold text-xs whitespace-nowrap">
                            OK
                        </button>
                    </form>
                </div>
            </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-3">
            <p>© {new Date().getFullYear()} DOCFON México. Todos los derechos reservados.</p>
            <div className="flex space-x-6">
                <Link to="/privacy" className="hover:text-gray-400 transition-colors">Privacidad</Link>
                <Link to="/terms" className="hover:text-gray-400 transition-colors">Términos</Link>
                <p>Potenciado por TEIKON POS · VISO Automation</p>
            </div>
        </div>
    </footer>
);

export default Footer;
