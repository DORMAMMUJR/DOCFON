import React from 'react';

const Terms: React.FC = () => (
    <div className="pt-32 pb-20 min-h-screen">
        <section className="max-w-3xl mx-auto px-6 space-y-10">
            <div>
                <h1 className="text-5xl md:text-6xl font-black italic mb-4">
                    Términos y <span className="text-orange-500">Condiciones</span>
                </h1>
                <p className="text-gray-500 text-sm">Última actualización: enero 2025</p>
            </div>

            {[
                {
                    title: '1. Aceptación de los Términos',
                    body: 'Al acceder y utilizar los servicios de DOCFON México (reparación, academia y franquicia), aceptas quedar vinculado por estos Términos y Condiciones. Si no estás de acuerdo, te pedimos no utilizar nuestros servicios.',
                },
                {
                    title: '2. Servicios de Reparación',
                    body: 'DOCFON ofrece servicios de diagnóstico y reparación de dispositivos electrónicos. La garantía cubre exclusivamente la falla reparada por un período de 90 días naturales. No incluye daños físicos posteriores, fallas por humedad o software.',
                },
                {
                    title: '3. Academia y Certificaciones',
                    body: 'Los cursos adquiridos otorgan acceso de por vida al material digital. Las certificaciones son emitidas previo cumplimiento del 100% del programa y evaluación aprobatoria. DOCFON se reserva el derecho de actualizar los contenidos.',
                },
                {
                    title: '4. Marketplace',
                    body: 'Las transacciones en el marketplace están sujetas a disponibilidad de inventario. Los precios pueden variar sin previo aviso. Las devoluciones proceden dentro de los 7 días naturales con el producto en condición original.',
                },
                {
                    title: '5. Franquicias',
                    body: 'Los contratos de franquicia se rigen por el Contrato de Adhesión registrado ante la Secretaría de Economía. La información de proyección financiera es referencial y no garantiza resultados.',
                },
                {
                    title: '6. Limitación de Responsabilidad',
                    body: 'DOCFON no se hace responsable por pérdida de datos durante el proceso de reparación. Se recomienda respaldar la información antes de entregar el dispositivo.',
                },
                {
                    title: '7. Contacto',
                    body: 'Para dudas sobre estos términos, escríbenos a legal@docfon.mx o llámanos al número de atención al cliente publicado en nuestra página.',
                },
            ].map((section) => (
                <div key={section.title} className="space-y-3">
                    <h2 className="text-lg font-bold text-white">{section.title}</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">{section.body}</p>
                </div>
            ))}
        </section>
    </div>
);

export default Terms;
