import React from 'react';

const Privacy: React.FC = () => (
    <div className="pt-32 pb-20 min-h-screen">
        <section className="max-w-3xl mx-auto px-6 space-y-10">
            <div>
                <h1 className="text-5xl md:text-6xl font-black italic mb-4">
                    Aviso de <span className="text-orange-500">Privacidad</span>
                </h1>
                <p className="text-gray-500 text-sm">Última actualización: enero 2025</p>
            </div>

            {[
                {
                    title: 'Responsable del Tratamiento',
                    body: 'DOCFON México S.A. de C.V., con domicilio en Ciudad de México, es responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).',
                },
                {
                    title: 'Datos que Recopilamos',
                    body: 'Recopilamos: nombre completo, teléfono, correo electrónico, información del dispositivo a reparar, y datos de facturación. Para franquicias, también información financiera y fiscal del franquiciatario.',
                },
                {
                    title: 'Finalidades del Tratamiento',
                    body: 'Sus datos se usan para: (1) gestionar órdenes de servicio, (2) enviar cotizaciones y actualizaciones de reparación, (3) procesar pagos, (4) enviar comunicaciones de academia y franquicia, y (5) mejorar nuestros servicios.',
                },
                {
                    title: 'Transferencias de Datos',
                    body: 'No transferimos datos personales a terceros sin su consentimiento, excepto cuando sea necesario para completar el servicio solicitado (procesadores de pago, logística) o por requerimiento de autoridad competente.',
                },
                {
                    title: 'Derechos ARCO',
                    body: 'Tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales. Para ejercerlos, envíe solicitud a privacidad@docfon.mx con identificación oficial.',
                },
                {
                    title: 'Cookies',
                    body: 'Utilizamos cookies propias y de terceros para mejorar la experiencia de navegación y analizar el tráfico. Puede desactivarlas desde la configuración de su navegador.',
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

export default Privacy;
