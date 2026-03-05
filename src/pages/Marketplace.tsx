import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Icons } from '../constants';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

import CentroCarga1 from '../assets/marketplace/refacciones/centro_de_carga_1.jpg';
import CentroCarga2 from '../assets/marketplace/refacciones/centro_de_carga_2.jpg';
import CentroCarga3 from '../assets/marketplace/refacciones/centro_de_carga_3.jpg';

import Display1 from '../assets/marketplace/displays/display_1.jpg';
import Display2 from '../assets/marketplace/displays/display_2.jpg';
import Display3 from '../assets/marketplace/displays/display_3.jpg';

import Herramienta1 from '../assets/marketplace/herramientas/pistola_calor_1.jpg';
import Herramienta2 from '../assets/marketplace/herramientas/pistola_calor_2.jpg';

import Equipamiento1 from '../assets/marketplace/equipamiento/Kit_herramienta.jpg';

import Accesorio1 from '../assets/marketplace/accesorios/Funda_iPhone17_1.jpg';
import Accesorio2 from '../assets/marketplace/accesorios/Funda_iPhone17_2.jpg';
import Accesorio3 from '../assets/marketplace/accesorios/Funda_iPhone17_3.jpg';

const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Centro de Carga',
        category: 'Refacciones',
        price: 250,
        image: CentroCarga1,
        images: [CentroCarga1, CentroCarga2, CentroCarga3],
        badge: 'Más vendido' as const
    },
    {
        id: '2',
        name: 'Display iPhone',
        category: 'Pantallas',
        price: 1200,
        image: Display1,
        images: [Display1, Display2, Display3],
        badge: 'Nuevo' as const
    },
    {
        id: '3',
        name: 'Pistola de Calor',
        category: 'Herramientas',
        price: 850,
        image: Herramienta1,
        images: [Herramienta1, Herramienta2, Herramienta1]
    },
    {
        id: '4',
        name: 'Kit de Herramientas',
        category: 'Equipamiento',
        price: 500,
        image: Equipamiento1,
        images: [Equipamiento1, Equipamiento1, Equipamiento1],
        badge: 'Oferta' as const
    },
    {
        id: '5',
        name: 'Funda iPhone 17',
        category: 'Fundas',
        price: 150,
        image: Accesorio1,
        images: [Accesorio1, Accesorio2, Accesorio3],
        badge: 'Nuevo' as const
    }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const resolveImg = (src: string) => {
    if (!src) return '';
    // Si ya es una URL absoluta o un data URL de Vite (empieza con /)
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    // Si es una ruta relativa del backend (ej: /uploads/foto.jpg)
    return API_URL + src;
};

const ProductCard = ({ product, addToCart }: { product: Product, addToCart: (p: Product) => void }) => {
    const allImages = product.images && product.images.length > 0
        ? product.images
        : [product.image];
    const [mainImage, setMainImage] = useState(resolveImg(allImages[0]));

    return (
        <div className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all flex flex-col">
            <div className="aspect-square relative flex flex-col bg-gray-900 overflow-hidden">
                <div className="flex-1 w-full h-full relative">
                    <img src={mainImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {/* Badge de producto */}
                    {product.badge && (() => {
                        const badgeStyles: Record<string, string> = {
                            'Nuevo': 'bg-green-500',
                            'Oferta': 'bg-red-500',
                            'Más vendido': 'bg-orange-500',
                        };
                        return (
                            <div className={`absolute top-3 left-3 ${badgeStyles[product.badge!] ?? 'bg-gray-600'} text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10 shadow-lg`}>
                                {product.badge}
                            </div>
                        );
                    })()}
                    {product.isBulk && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase z-10">
                            MAYOREO
                        </div>
                    )}
                </div>
                {/* Thumbnails */}
                {allImages.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 flex bg-gradient-to-t from-black/80 to-transparent p-4 gap-3 justify-center z-10 mt-auto">
                        {allImages.map((img, idx) => {
                            const resolved = resolveImg(img);
                            return (
                                <button
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); setMainImage(resolved); }}
                                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shadow-lg ${mainImage === resolved ? 'border-blue-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'}`}
                                >
                                    <img src={resolved} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                </button>
                            );
                        })}
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
                            toast.success(`¡${product.name} agregado!`, {
                                description: `$${parseFloat(product.price.toString()).toLocaleString()} MXN`,
                                duration: 3000,
                                icon: '🛒',
                            });
                        }}
                        className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors"
                        title="Agregar al carrito"
                    >
                        <Icons.Cart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const Marketplace: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const addToCart = useCartStore((state) => state.addToCart);
    const categories = ['Todos', 'Refacciones', 'Pantallas', 'Herramientas', 'Fundas', 'Equipamiento'];
    const isDev = import.meta.env.DEV;

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/products`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(Array.isArray(data) ? data : data.data || []);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            if (isDev) {
                // En desarrollo: usar mock para trabajar sin backend
                setProducts(MOCK_PRODUCTS);
            } else {
                // En producción: mostrar error real, nunca datos fake
                setError("No se pudieron cargar los productos.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
                    <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${activeCategory === cat
                                    ? 'bg-orange-500 text-white border-orange-500 shadow-[0_0_15px_rgba(255,107,0,0.4)]'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:border-white/30'
                                    }`}
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
                    <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-4xl">
                            🔧
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-white">Servicio en Mantenimiento</h3>
                            <p className="text-gray-400 max-w-sm">
                                Estamos actualizando nuestro catálogo. Vuelve en unos minutos o contáctanos por WhatsApp.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={fetchProducts}
                                className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all"
                            >
                                Reintentar
                            </button>
                            <a
                                href="https://wa.me/525541893360?text=Hola%2C+quiero+ver+el+cat%C3%A1logo+de+productos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.filter(p => activeCategory === 'Todos' || p.category === activeCategory).map(product => (
                            <ProductCard key={product.id} product={product} addToCart={addToCart} />
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
