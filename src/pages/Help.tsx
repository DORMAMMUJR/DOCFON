import React, { useState } from 'react';

const faqs = [
    {
        q: '¿Cuánto tiempo tarda una reparación de pantalla?',
        a: 'La mayoría de reparaciones de pantalla se realizan en 30 a 60 minutos dependiendo del modelo del dispositivo.',
    },
    {
        q: '¿Las refacciones que usan tienen garantía?',
        a: 'Sí. Todas nuestras refacciones originales o de alta calidad incluyen garantía de 90 días en partes y mano de obra.',
    },
    {
        q: '¿Puedo tomar los cursos de la Academia de forma online?',
        a: 'Sí, ofrecemos modalidad 100% online con acceso de por vida al material, prácticas en kit físico enviado a domicilio y certificación oficial.',
    },
    {
        q: '¿Qué inversión necesito para abrir una franquicia DOCFON?',
        a: 'Contamos con tres modelos desde $80,000 MXN (Express) hasta $300,000 MXN (Academy Hub). Incluyen todo el equipamiento, capacitación y acceso al sistema TEIKON.',
    },
    {
        q: '¿El sistema TEIKON POS tiene costo mensual?',
        a: 'El acceso a TEIKON POS está incluido en los planes de franquicia. Para talleres independientes tenemos planes desde $499 MXN/mes.',
    },
    {
        q: '¿Hacen reparaciones a domicilio?',
        a: 'Actualmente ofrecemos servicio a domicilio en las ciudades donde tenemos sucursales. Consulta disponibilidad en tu zona.',
    },
];

const Help: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <section className="max-w-3xl mx-auto px-6">
                <h1 className="text-5xl md:text-6xl font-black italic mb-4">
                    Preguntas <span className="text-orange-500">Frecuentes</span>
                </h1>
                <p className="text-gray-400 text-xl mb-16">
                    Resolvemos tus dudas más comunes sobre reparaciones, academia y franquicias.
                </p>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={faq.q}
                            className="border border-white/10 rounded-2xl overflow-hidden"
                        >
                            <button
                                className="w-full flex justify-between items-center px-6 py-5 text-left font-bold hover:bg-white/5 transition-colors"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                aria-expanded={openIndex === i}
                            >
                                <span>{faq.q}</span>
                                <span className={`text-orange-500 text-xl transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Help;
