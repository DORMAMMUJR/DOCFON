import React, { useState, useEffect } from 'react';
import { Icons } from '../constants';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

const Marketplace: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const addToCart = useCartStore((state) => state.addToCart);
    const categories = ['Todos', 'Refacciones', 'Displays', 'Herramientas', 'Equipamiento', 'Accesorios'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("No se pudieron cargar los productos. Por favor intenta más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

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
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-4 text-xl font-bold text-gray-400">Cargando productos...</span>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <p className="text-red-500 text-xl font-bold">{error}</p>
                    </div>
                ) : (
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
                                            <span className="text-2xl font-black italic">${parseFloat(product.price.toString()).toLocaleString()}</span>
                                            <span className="text-[10px] text-gray-500">I.V.A Incluido</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                addToCart(product);
                                                console.log(`Producto agregado al carrito: ${product.name}`);
                                                alert(`¡Agregado al carrito!\n${product.name}`);
                                            }}
                                            className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                                            title="Agregar al carrito"
                                        >
                                            <Icons.Cart className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
