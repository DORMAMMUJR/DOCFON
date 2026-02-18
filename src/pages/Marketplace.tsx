
import React, { useState } from 'react';
import { Icons } from '../constants';
import { Product } from '../types';

const products: Product[] = [
    { id: '1', name: 'Pantalla iPhone 13 Pro Max (OLED)', category: 'Displays', price: 3200, image: 'https://picsum.photos/400/400?item=1' },
    { id: '2', name: 'Kit Destornilladores Precision Elite', category: 'Herramientas', price: 1200, image: 'https://picsum.photos/400/400?item=2' },
    { id: '3', name: 'Estación de Calor DOCFON Air-Pro', category: 'Equipamiento', price: 5400, image: 'https://picsum.photos/400/400?item=3' },
    { id: '4', name: 'Batería Original Samsung S22', category: 'Refacciones', price: 450, image: 'https://picsum.photos/400/400?item=4' },
    { id: '5', name: 'Microscopio Trinocular 7X-45X', category: 'Equipamiento', price: 8900, image: 'https://picsum.photos/400/400?item=5' },
    { id: '6', name: 'Pack 50 Mica Cerámica Privacidad', category: 'Accesorios', price: 2500, image: 'https://picsum.photos/400/400?item=6', isBulk: true },
];

const Marketplace: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const categories = ['Todos', 'Refacciones', 'Displays', 'Herramientas', 'Equipamiento', 'Accesorios'];

    return (
        <div className="pt-32 pb-20">
            <section className="max-w-7xl mx-auto px-6 mb-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-black italic">Marketplace <span className="text-blue-500">Técnico</span></h1>
                        <p className="text-xl text-gray-400 max-w-xl">El stock más confiable de México. Refacciones grado A+ y herramientas certificadas.</p>
                    </div>
                    <div className="flex items-center space-x-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-black' : 'text-gray-500 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Promo Banner */}
                <div className="w-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-white space-y-2 mb-6 md:mb-0">
                        <h2 className="text-3xl font-black italic">¿Eres Franquiciado o Mayorista?</h2>
                        <p className="font-medium opacity-90">Accede a precios de red y suministros automáticos con TEIKON.</p>
                    </div>
                    <button className="px-8 py-4 bg-black text-white font-black rounded-xl hover:scale-105 transition-transform uppercase tracking-widest text-sm">
                        SOLICITAR PRECIO MAYOREO
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.filter(p => activeCategory === 'Todos' || p.category === activeCategory).map(product => (
                        <div key={product.id} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all flex flex-col">
                            <div className="aspect-square relative overflow-hidden bg-gray-900">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                {product.isBulk && (
                                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                        MAYOREO
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{product.category}</span>
                                <h3 className="text-lg font-bold mb-4 line-clamp-2">{product.name}</h3>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-black italic">${product.price.toLocaleString()}</span>
                                        <span className="text-[10px] text-gray-500">I.V.A Incluido</span>
                                    </div>
                                    <button className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                                        <Icons.Cart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trust factors */}
            <section className="bg-black border-t border-white/5 py-20">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-6">
                            <Icons.Check />
                        </div>
                        <h4 className="text-xl font-bold">Garantía Extendida</h4>
                        <p className="text-gray-400 text-sm">Hasta 6 meses de garantía en refacciones instaladas por nuestra red.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-orange-600/10 rounded-full flex items-center justify-center text-orange-500 mx-auto mb-6">
                            <Icons.Tool />
                        </div>
                        <h4 className="text-xl font-bold">Probado en Laboratorio</h4>
                        <p className="text-gray-400 text-sm">Cada lote es testeado por nuestro equipo senior antes de salir a la venta.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                            <Icons.Academy />
                        </div>
                        <h4 className="text-xl font-bold">Soporte Técnico</h4>
                        <p className="text-gray-400 text-sm">¿Dudas con la instalación? Nuestros másters te apoyan vía WhatsApp.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Marketplace;
