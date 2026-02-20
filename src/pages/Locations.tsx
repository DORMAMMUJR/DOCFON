import React from 'react';

const locations = [
    { city: 'Ciudad de México', zone: 'CDMX', count: 12, address: 'Insurgentes Sur 1234, Col. Del Valle', status: 'Abierto' },
    { city: 'Guadalajara', zone: 'JAL', count: 8, address: 'Av. López Mateos 500, Col. Chapalita', status: 'Abierto' },
    { city: 'Monterrey', zone: 'NL', count: 10, address: 'Av. Garza Sada 2001, Col. Tecnológico', status: 'Abierto' },
    { city: 'Puebla', zone: 'PUE', count: 5, address: 'Blvd. Atlixcáyotl 1200, Col. La Vista', status: 'Abierto' },
    { city: 'Tijuana', zone: 'BC', count: 6, address: 'Blvd. Agua Caliente 4558', status: 'Abierto' },
    { city: 'León', zone: 'GTO', count: 4, address: 'Blvd. Adolfo López Mateos 2602', status: 'Próximamente' },
    { city: 'Mérida', zone: 'YUC', count: 3, address: 'Calle 60 Norte 420, Col. Buenavista', status: 'Próximamente' },
    { city: 'Querétaro', zone: 'QRO', count: 5, address: 'Blvd. Bernardo Quintana 1000', status: 'Abierto' },
];

const Locations: React.FC = () => (
    <div className="pt-32 pb-20 min-h-screen">
        <section className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-black italic mb-6">
                    Mapa de <span className="text-orange-500">Sucursales</span>
                </h1>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                    Encuentra tu DOCFON más cercano. Presencia en las principales ciudades de México.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto text-center">
                <div>
                    <p className="text-4xl font-black text-white">85</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Sucursales</p>
                </div>
                <div>
                    <p className="text-4xl font-black text-white">18</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Estados</p>
                </div>
                <div>
                    <p className="text-4xl font-black text-white">2026</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Meta: 200 cdds</p>
                </div>
            </div>

            {/* Grid de ubicaciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {locations.map((loc) => (
                    <div
                        key={loc.city}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/40 transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-black text-lg group-hover:text-orange-500 transition-colors">
                                    {loc.city}
                                </h3>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{loc.zone}</p>
                            </div>
                            <span
                                className={`text-xs font-bold px-2 py-1 rounded-full ${loc.status === 'Abierto'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-orange-500/20 text-orange-400'
                                    }`}
                            >
                                {loc.status}
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4">{loc.address}</p>
                        <p className="text-sm font-bold text-white">
                            {loc.count} {loc.count === 1 ? 'sucursal' : 'sucursales'}
                        </p>
                    </div>
                ))}
            </div>

            {/* CTA Franquicia */}
            <div className="mt-20 text-center p-12 border border-white/10 rounded-3xl bg-white/5">
                <h2 className="text-3xl font-black italic mb-4">
                    ¿Quieres abrir en tu ciudad?
                </h2>
                <p className="text-gray-400 mb-8">
                    Si tu ciudad no aparece en el mapa, puede ser tu oportunidad de ser el primer franquiciatario.
                </p>
                <a
                    href="/franchise"
                    className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all uppercase tracking-widest"
                >
                    Ver Modelos de Franquicia
                </a>
            </div>
        </section>
    </div>
);

export default Locations;
