import React from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => (
    <div className="pt-32 pb-20 min-h-screen">
        <section className="max-w-3xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-black italic mb-6">
                Cotizar <span className="text-orange-500">Reparación</span>
            </h1>
            <p className="text-gray-400 text-xl mb-12">
                Cuéntanos sobre tu dispositivo y te enviamos una cotización en menos de 30 minutos.
            </p>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                    <input
                        type="tel"
                        placeholder="Teléfono / WhatsApp"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                </div>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                />
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors">
                    <option value="">Tipo de dispositivo</option>
                    <option>iPhone</option>
                    <option>Android / Samsung</option>
                    <option>iPad / Tablet</option>
                    <option>Laptop / MacBook</option>
                    <option>Otro</option>
                </select>
                <textarea
                    rows={5}
                    placeholder="Describe el problema de tu dispositivo..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
                <button
                    type="submit"
                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest"
                >
                    Enviar Cotización
                </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-8">
                ¿Prefieres hablar directo?{' '}
                <a
                    href="https://wa.me/5215512345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline font-bold"
                >
                    Escríbenos por WhatsApp
                </a>
            </p>
        </section>
    </div>
);

export default Contact;
