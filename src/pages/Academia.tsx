import React from 'react';
import { Course } from '../types';

import imgSoldadura from '@/assets/academia/microsoldadura.jpg';
import imgDisplay from '@/assets/academia/display.png';
import imgMultimarca from '@/assets/academia/multimarca.jpg';
import imgSoftware from '@/assets/academia/software.jpg';

const courses: Course[] = [
    {
        id: '1',
        title: 'Micro-soldadura Profesional',
        level: 'Avanzado',
        duration: '40 Horas',
        price: 4500,
        image: imgSoldadura,
        description: 'Reparación de tarjetas lógicas a nivel componente, reballing y técnicas avanzadas.'
    },
    {
        id: '2',
        title: 'Reparación de Pantallas y Displays',
        level: 'Certificación',
        duration: '60 Horas',
        price: 6800,
        image: imgDisplay,
        description: 'Certificación completa en reparación y laminado de pantallas OLED/LCD para dispositivos premium.'
    },
    {
        id: '3',
        title: 'Reparación Multimarca',
        level: 'Básico',
        duration: '32 Horas',
        price: 2900,
        image: imgMultimarca,
        description: 'Fundamentos de electrónica aplicados a dispositivos móviles de todas las gamas.'
    },
    {
        id: '4',
        title: 'Software & Desbloqueos',
        level: 'Intermedio',
        duration: '24 Horas',
        price: 3200,
        image: imgSoftware,
        description: 'Flasheo, recuperación de sistema y bypass avanzado bajo marcos legales.'
    }
];

const Academia: React.FC = () => {
    return (
        <div className="pt-32 pb-20">
            {/* Header / Hero Banner */}
            <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <div className="relative w-full h-80 md:h-[500px] rounded-[40px] overflow-hidden mb-12 border border-white/10 shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" alt="Academia DOCFON Portada" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-8 md:p-16 text-center">
                        <h1 className="text-5xl md:text-7xl font-black italic mb-6">Academia <span className="text-orange-500">DOCFON</span></h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto drop-shadow-lg font-medium">
                            Conviértete en un experto certificado. No solo enseñamos a reparar, formamos empresarios tecnológicos con metodología alemana.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats row */}
            <section className="bg-white/5 py-12 mb-20 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center"><p className="text-3xl font-black">98%</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Tasa de Empleabilidad</p></div>
                    <div className="text-center"><p className="text-3xl font-black">100+</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Talleres Aliados</p></div>
                    <div className="text-center"><p className="text-3xl font-black">Online</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Modalidad Flexible</p></div>
                    <div className="text-center"><p className="text-3xl font-black">Oficial</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Certificado SECOFI</p></div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                {courses.map((course) => (
                    <div key={course.id} className="group bg-black border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-[0_0_30px_rgba(255,107,0,0.1)] flex flex-col">
                        <div className="h-48 relative overflow-hidden flex-shrink-0">
                            <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                                {course.level}
                            </div>
                        </div>
                        <div className="p-6 space-y-4 flex flex-col flex-1">
                            <h3 className="text-xl font-bold leading-tight">{course.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-3">{course.description}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                                <span className="text-gray-500 text-xs font-bold uppercase">{course.duration}</span>
                                <span className="text-xl font-black text-white">${course.price.toLocaleString()} MXN</span>
                            </div>
                            <button className="w-full py-4 mt-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white hover:text-black transition-all">
                                MÁS INFORMACIÓN
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Modelo Express / Oxxo-style */}
            <section className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16">
                    <div className="space-y-6">
                        <div className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-2 border border-blue-500/20">
                            Franquicias & Escalabilidad
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black italic">Modelo Express <br /><span className="text-orange-500">Oxxo-Style</span></h2>
                        <p className="text-gray-300 text-lg leading-relaxed pt-4 border-t border-white/10">
                            Nuestro concepto de franquicia está diseñado para ser tan eficiente y escalable como una tienda de conveniencia. Aprende a operar sucursales de reparación rápidas, estandarizadas y altamente rentables. Con DOCFON, no solo te conviertes en técnico, sino en dueño de un ecosistema en crecimiento.
                        </p>
                        <ul className="space-y-4 pt-4">
                            <li className="flex items-center gap-3 font-medium"><span className="text-orange-500 font-bold text-xl">✔</span> Procesos estandarizados de reparación exprés.</li>
                            <li className="flex items-center gap-3 font-medium"><span className="text-orange-500 font-bold text-xl">✔</span> Rápido retorno de inversión probado.</li>
                            <li className="flex items-center gap-3 font-medium"><span className="text-orange-500 font-bold text-xl">✔</span> Abastecimiento continuo de refacciones grado A+.</li>
                        </ul>
                    </div>
                    <div className="rounded-[30px] overflow-hidden border border-white/10 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
                        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Modelo Oxxo Style DOCFON" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                </div>
            </section>

            {/* Career Path */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-12 md:p-20 rounded-[40px] border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black italic">Tu Carrera como Técnico <span className="text-blue-500">Elite</span></h2>
                            <div className="space-y-6">
                                {[
                                    { step: '01', title: 'Fundamentos Electrónicos', desc: 'Entiende cómo fluye la energía en dispositivos móviles.' },
                                    { step: '02', title: 'Diagnóstico Avanzado', desc: 'Identifica fallas complejas sin adivinar.' },
                                    { step: '03', title: 'Certificación Regional', desc: 'Recibe tu aval oficial para operar sucursales.' },
                                    { step: '04', title: 'Apertura de Negocio', desc: 'Te apoyamos a abrir tu primer taller con DOCFON.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-2xl font-black text-orange-500/30">{item.step}</span>
                                        <div>
                                            <h4 className="font-bold text-lg">{item.title}</h4>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-2xl font-black mb-8 italic">Solicitar Beca / Información</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Nombre completo" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500" />
                                <input type="email" placeholder="Correo electrónico" className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500" />
                                <select className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 text-gray-400">
                                    <option>Seleccionar curso de interés</option>
                                    <option>Micro-soldadura Profesional</option>
                                    <option>Reparación de Pantallas y Displays</option>
                                    <option>Multimarca Básico</option>
                                </select>
                                <button className="w-full py-4 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition-all shadow-xl">
                                    ENVIAR SOLICITUD
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Academia;
