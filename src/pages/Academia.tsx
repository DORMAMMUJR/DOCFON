import React, { useState } from 'react';
import { toast } from 'sonner';
import { Course } from '../types';

import imgSoldadura from '@/assets/academia/microsoldadura.jpg';
import imgDisplay from '@/assets/academia/display.png';
import imgMultimarca from '@/assets/academia/multimarca.jpg';
import imgSoftware from '@/assets/academia/software.jpg';

const DOCFON_WA = '525541893360';

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

const BecaForm: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [curso, setCurso] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nombre.trim() || !curso) {
            toast.error('Por favor completa tu nombre y selecciona un curso.', { duration: 3000 });
            return;
        }

        const mensaje = [
            `Hola DOCFON Academia! 👋`,
            ``,
            `Mi nombre es *${nombre.trim()}* y me interesa obtener información o una beca para el curso:`,
            ``,
            `📚 *${curso}*`,
            email.trim() ? `📧 Email: ${email.trim()}` : '',
            ``,
            `¿Podrían orientarme? ¡Gracias!`,
        ].filter(Boolean).join('\n');

        const url = `https://wa.me/${DOCFON_WA}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank', 'noopener,noreferrer');

        toast.success('¡Abriendo WhatsApp!', {
            description: 'Tu mensaje ya está listo para enviar.',
            duration: 3000,
            icon: '💬',
        });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre completo *"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <input
                type="email"
                placeholder="Correo electrónico (opcional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <select
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors text-gray-400"
            >
                <option value="">Seleccionar curso de interés *</option>
                <option>Micro-soldadura Profesional</option>
                <option>Reparación de Pantallas y Displays</option>
                <option>Reparación Multimarca Básico</option>
                <option>Software &amp; Desbloqueos</option>
            </select>
            <button
                type="submit"
                className="w-full py-4 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition-all shadow-xl flex items-center justify-center gap-3"
            >
                <span>💬</span>
                ENVIAR POR WHATSAPP
            </button>
        </form>
    );
};

const Academia: React.FC = () => {
    return (
        <div className="pt-28 pb-16">
            {/* Header / Hero Banner */}
            <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
                <div className="relative w-full h-64 md:h-[420px] rounded-[40px] overflow-hidden mb-10 border border-white/10 shadow-2xl">
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
            <section className="bg-white/5 py-10 mb-16 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center"><p className="text-3xl font-black">98%</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Tasa de Empleabilidad</p></div>
                    <div className="text-center"><p className="text-3xl font-black">100+</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Talleres Aliados</p></div>
                    <div className="text-center"><p className="text-3xl font-black">Online</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Modalidad Flexible</p></div>
                    <div className="text-center"><p className="text-3xl font-black">Oficial</p><p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Certificado SECOFI</p></div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
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
                            <ul className="space-y-2 text-sm text-gray-400 flex-1">
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">⏱</span>
                                    <span><span className="text-white font-semibold">Duración:</span> {course.duration}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-orange-500 font-bold">💻</span>
                                    <span><span className="text-white font-semibold">Modalidad:</span> Online / Presencial</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-500 font-bold mt-0.5">✔</span>
                                    <span>{course.description}</span>
                                </li>
                            </ul>
                            <div className="pt-4 border-t border-white/10">
                                <span className="text-2xl font-black text-white">${course.price.toLocaleString()} <span className="text-xs text-gray-500 font-normal">MXN</span></span>
                            </div>
                            <button
                                onClick={() => {
                                    const msg = `Hola DOCFON! 👋\n\nMe interesa el curso: *${course.title}*\n⏱ ${course.duration} — $${course.price.toLocaleString()} MXN\n\n¿Pueden darme más información?`;
                                    window.open(`https://wa.me/${DOCFON_WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                                }}
                                className="w-full py-4 mt-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-green-600 hover:text-white hover:border-green-600 transition-all flex items-center justify-center gap-2"
                            >
                                <span>💬</span> MÁS INFORMACIÓN
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Modelo Express / Oxxo-style */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-16">
                    <div className="space-y-6">
                        <div className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-2 border border-blue-500/20">
                            Franquicias &amp; Escalabilidad
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black italic">Modelo Express <br /><span className="text-orange-500">Oxxo-Style</span></h2>
                        <ul className="space-y-4 pt-4 border-t border-white/10">
                            {[
                                'Reparaciones rápidas y estandarizadas',
                                'Bajo costo de inversión inicial',
                                'Sistema operativo probado y replicable',
                                'Soporte técnico y abastecimiento continuo',
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-medium">
                                    <span className="text-orange-500 font-bold text-xl">✔</span> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[30px] overflow-hidden border border-white/10 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-transparent transition-all z-10 pointer-events-none"></div>
                        <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" alt="Modelo Oxxo Style DOCFON" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                </div>
            </section>

            {/* Career Path + Beca Form */}
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
                            <BecaForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Academia;
