
import React from 'react';
import { Icons } from '../constants';
import { BusinessModel, FranchiseModel } from '../types';

const models: FranchiseModel[] = [
    {
        type: BusinessModel.EXPRESS,
        investment: '$250k - $400k',
        sqm: '15 - 30 m²',
        roi: '12 - 18 Meses',
        features: ['Ubicación en isla o local pequeño', 'Servicios de reparación rápida', 'Accesorios de alta rotación', 'TEIKON Light incluido']
    },
    {
        type: BusinessModel.STANDARD,
        investment: '$600k - $900k',
        sqm: '45 - 80 m²',
        roi: '18 - 24 Meses',
        features: ['Local de calle o centro comercial', 'Laboratorio técnico completo', 'Zona VIP de espera', 'Full Stack Tech (VISO + TEIKON)']
    },
    {
        type: BusinessModel.ACADEMY,
        investment: '$1.5M - $2.5M',
        sqm: '120m² +',
        roi: '24 - 36 Meses',
        features: ['Centro Regional de Capacitación', 'Marketplace de mayoreo integrado', 'Aulas técnicas certificadas', 'Derechos de zona exclusivos']
    }
];

const Franchise: React.FC = () => {
    return (
        <div className="pt-32 pb-20">
            <section className="max-w-7xl mx-auto px-6 text-center mb-24">
                <span className="text-orange-500 font-black tracking-widest text-xs uppercase mb-4 block">OPORTUNIDAD DE INVERSIÓN</span>
                <h1 className="text-5xl md:text-8xl font-black italic mb-8 leading-tight">Sé parte de la red de <span className="gradient-text">más rápido crecimiento.</span></h1>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    Más que un taller, una central tecnológica. Ofrecemos un modelo llave en mano con rentabilidad probada y tecnología exclusiva.
                </p>
            </section>

            {/* Comparison Grid */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
                {models.map((model, i) => (
                    <div key={i} className={`relative p-10 rounded-[40px] border transition-all flex flex-col ${i === 1 ? 'bg-white/5 border-orange-500 shadow-[0_0_60px_rgba(255,107,0,0.2)]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                        {i === 1 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                EL MÁS RENTABLE
                            </div>
                        )}
                        <h3 className="text-3xl font-black mb-1 italic">Modelo</h3>
                        <h4 className={`text-5xl font-black mb-8 italic ${i === 1 ? 'text-orange-500' : 'text-white'}`}>{model.type}</h4>

                        <div className="space-y-6 mb-12">
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-gray-500 text-sm font-bold uppercase">Inversión</span>
                                <span className="font-bold text-lg">{model.investment}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-gray-500 text-sm font-bold uppercase">Espacio</span>
                                <span className="font-bold text-lg">{model.sqm}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                <span className="text-gray-500 text-sm font-bold uppercase">Retorno (ROI)</span>
                                <span className="font-bold text-lg text-blue-500">{model.roi}</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-12 flex-1">
                            {model.features.map((feat, j) => (
                                <li key={j} className="flex items-start space-x-3 text-sm text-gray-400">
                                    <Icons.Check className="w-5 h-5 text-orange-500 shrink-0" />
                                    <span>{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${i === 1 ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-black hover:bg-gray-100'}`}>
                            SOLICITAR DOSSIER
                        </button>
                    </div>
                ))}
            </section>

            {/* What's included */}
            <section className="bg-white/5 py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black italic text-center mb-20">¿Qué incluye tu <span className="text-orange-500">Franquicia?</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { title: 'Tecnología', desc: 'Sistemas TEIKON y VISO para control total de ventas y marketing.' },
                            { title: 'Training', desc: 'Capacitación intensiva para dueños y técnicos en nuestra academia.' },
                            { title: 'Suministros', desc: 'Acceso prioritario al Marketplace con precios preferenciales DOCFON.' },
                            { title: 'Territorio', desc: 'Protección de zona exclusiva para asegurar tu mercado local.' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl italic">{i + 1}</div>
                                <h4 className="text-xl font-bold italic">{item.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black italic">Proceso de Apertura</h2>
                    <p className="text-gray-400">De 60 a 90 días para estar operando al 100%.</p>
                </div>
                <div className="relative border-l-2 border-white/10 ml-6 md:ml-0 md:border-l-0 md:flex md:justify-between space-y-12 md:space-y-0">
                    {[
                        { label: 'Aplicación', desc: 'Entrevista y validación de perfil inversionista.' },
                        { label: 'Contrato', desc: 'Firma y selección de territorio estratégico.' },
                        { label: 'Adecuación', desc: 'Obra civil y equipamiento tecnológico.' },
                        { label: 'Lanzamiento', desc: 'Inauguración con campaña de marketing nacional.' }
                    ].map((step, i) => (
                        <div key={i} className="relative md:w-1/4 px-10">
                            <div className="absolute -left-[11px] md:left-1/2 md:-translate-x-1/2 top-0 w-5 h-5 bg-orange-500 rounded-full border-4 border-black"></div>
                            <div className="pt-6 md:text-center">
                                <h4 className="font-bold text-lg mb-2">{step.label}</h4>
                                <p className="text-gray-500 text-sm">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lead capture form */}
            <section className="py-32 px-6">
                <div className="max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-[40px] text-black shadow-2xl">
                    <h2 className="text-4xl font-black italic mb-8">Únete a la Red Elite</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-500">Nombre</label>
                            <input type="text" className="w-full bg-gray-100 border-none rounded-xl px-4 py-4" placeholder="Ej. Juan Pérez" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-500">Ciudad de Interés</label>
                            <input type="text" className="w-full bg-gray-100 border-none rounded-xl px-4 py-4" placeholder="Ej. Guadalajara" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-500">WhatsApp</label>
                            <input type="tel" className="w-full bg-gray-100 border-none rounded-xl px-4 py-4" placeholder="+52 ..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-500">Capital Disponible</label>
                            <select className="w-full bg-gray-100 border-none rounded-xl px-4 py-4">
                                <option>$250k - $500k</option>
                                <option>$500k - $1M</option>
                                <option>+$1M</option>
                            </select>
                        </div>
                        <button className="md:col-span-2 py-5 bg-orange-500 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl uppercase tracking-widest mt-4">
                            SOLICITAR CONSULTORÍA GRATUITA
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Franchise;
