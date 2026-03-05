
import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../constants';

const Home: React.FC = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-bold tracking-widest text-orange-500 uppercase animate-pulse">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        <span>Nueva convocatoria Academia 2024 Abierta</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight max-w-5xl mx-auto">
                        Aprende reparación profesional y abre tu <span className="gradient-text">propia franquicia tecnológica.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Academia certificada, marketplace técnico y franquicias listas para escalar en todo México. El ecosistema completo para el técnico moderno.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10">
                        <Link to="/academia" className="w-full md:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-orange-500 text-white rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all shadow-[0_0_40px_rgba(255,107,0,0.3)] hover:-translate-y-1">
                            <Icons.Academy className="w-6 h-6" />
                            <span>IR A ACADEMIA</span>
                        </Link>
                        <Link to="/marketplace" className="w-full md:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-[0_0_40px_rgba(0,102,255,0.3)] hover:-translate-y-1">
                            <Icons.Cart className="w-6 h-6" />
                            <span>MARKETPLACE</span>
                        </Link>
                        <Link to="/franchise" className="w-full md:w-auto flex items-center justify-center space-x-3 px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all hover:-translate-y-1">
                            <Icons.Franchise className="w-6 h-6" />
                            <span>FRANQUICIAS</span>
                        </Link>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -z-0"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/5 blur-[120px] rounded-full -z-0"></div>
            </section>

            {/* Metrics Section */}
            <section className="py-14 bg-black border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
                    {[
                        { label: 'Técnicos Certificados', value: '15,000+' },
                        { label: 'Sucursales en México', value: '85' },
                        { label: 'Refacciones Vendidas', value: '1.2M' },
                        { label: 'Crecimiento Anual', value: '240%' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center space-y-2">
                            <h3 className="text-4xl md:text-5xl font-black text-white">{stat.value}</h3>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Technology Focus Section */}
            <section className="py-20 bg-black overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black leading-tight italic">
                            El sistema que mueve la red <span className="text-orange-500">DOCFON</span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            No somos solo reparación, somos una empresa de software. Toda nuestra red opera bajo estándares de clase mundial.
                        </p>

                        <div className="space-y-6">
                            <div className="p-6 glass-card rounded-3xl border-l-4 border-blue-500 flex items-start space-x-6">
                                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 font-bold shrink-0">T</div>
                                <div>
                                    <h4 className="text-2xl font-bold mb-2">TEIKON POS</h4>
                                    <p className="text-gray-400">Control total de inventarios, órdenes de servicio y finanzas en tiempo real. La inteligencia detrás del mostrador.</p>
                                </div>
                            </div>
                            <div className="p-6 glass-card rounded-3xl border-l-4 border-orange-500 flex items-start space-x-6">
                                <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500 font-bold shrink-0">V</div>
                                <div>
                                    <h4 className="text-2xl font-bold mb-2">VISO CRM</h4>
                                    <p className="text-gray-400">Automatización de WhatsApp y seguimiento de clientes con IA. Fidelización y ventas en piloto automático.</p>
                                </div>
                            </div>
                        </div>

                        <Link to="/technology" className="inline-flex items-center space-x-2 text-orange-500 font-bold group">
                            <span>EXPLORAR STACK TECNOLÓGICO</span>
                            <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-gray-800 to-black rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
                            <img src="https://picsum.photos/800/800?tech=1" alt="Software Dashboard" className="w-full h-full object-cover opacity-60 mix-blend-overlay" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-3/4 h-3/4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 space-y-4">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="w-20 h-4 bg-orange-500/20 rounded-full"></div>
                                        <div className="w-8 h-8 bg-blue-500/20 rounded-full"></div>
                                    </div>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-4 bg-white/5 rounded-full w-full"></div>
                                    ))}
                                    <div className="pt-10 flex gap-4">
                                        <div className="h-20 w-1/2 bg-blue-600/20 rounded-xl"></div>
                                        <div className="h-20 w-1/2 bg-orange-500/20 rounded-xl"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Floating blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 blur-3xl opacity-20 -z-10"></div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black italic">Testimonios de Éxito</h2>
                        <p className="text-gray-400">Historias reales de nuestra red nacional.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: 'Ricardo S.', role: 'Dueño de Franquicia (Monterrey)', text: 'Abrir mi DOCFON fue la mejor decisión. El sistema TEIKON hace que manejar 3 sucursales sea sencillo.' },
                            { name: 'Elena G.', role: 'Técnica Certificada', text: 'La academia me dio no solo técnica, sino mentalidad empresarial. Hoy tengo mi propio taller móvil.' },
                            { name: 'Marco L.', role: 'Socio Marketplace', text: 'La calidad de las pantallas y herramientas es insuperable. Mis devoluciones bajaron un 90%.' },
                        ].map((t, i) => (
                            <div key={i} className="p-8 bg-black border border-white/10 rounded-3xl space-y-6">
                                <p className="text-lg text-gray-300 italic">"{t.text}"</p>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden">
                                        <img src={`https://picsum.photos/100/100?user=${i}`} alt={t.name} />
                                    </div>
                                    <div>
                                        <h5 className="font-bold">{t.name}</h5>
                                        <p className="text-xs text-orange-500 font-bold uppercase">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking / CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900 to-orange-900 p-1 rounded-[40px]">
                    <div className="bg-black rounded-[38px] p-12 md:p-20 text-center space-y-10">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">¿Listo para escalar al siguiente nivel?</h2>
                        <p className="text-xl text-gray-400">Agenda una llamada de descubrimiento con nuestro equipo de expansión.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-6">
                            <button className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-2xl uppercase tracking-widest">
                                Agendar Videollamada
                            </button>
                            <button className="px-10 py-5 border border-white/20 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest">
                                Descargar Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
