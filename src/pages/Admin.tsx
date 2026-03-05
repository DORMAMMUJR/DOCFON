import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../store/useAuthStore';
import { Product } from '../types';

interface TradeIn {
    id: number;
    brand: string;
    model: string;
    condition: string;
    status: string;
    images: string[];
    contact_name: string;
    contact_phone: string;
    created_at: string;
}

const Admin: React.FC = () => {
    const { token, logout, user } = useAuthStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [tradeIns, setTradeIns] = useState<TradeIn[]>([]);
    const [loading, setLoading] = useState(true);

    // Estado para "Nuevo Producto"
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Refacciones',
        price: '',
        image: '',
        description: '',
        is_bulk: false
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

            // Traer productos
            const prodsRes = await fetch(`${API_URL}/api/products?limit=100`);
            if (prodsRes.ok) {
                const json = await prodsRes.json();
                setProducts(Array.isArray(json) ? json : json.data || []);
            }

            // Traer trade-ins
            const tradeRes = await fetch(`${API_URL}/api/trade-ins`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (tradeRes.ok) {
                setTradeIns(await tradeRes.json());
            }
        } catch (error) {
            console.error('Error cargando datos del admin:', error);
            toast.error('Hubo un problema cargando la información.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                toast.success('Producto eliminado');
                setProducts(products.filter(p => p.id !== id));
            } else {
                const data = await response.json();
                toast.error(data.error || 'Error al eliminar');
            }
        } catch (error) {
            toast.error('Error de red');
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newProduct.name || !newProduct.price || !newProduct.category) {
            toast.error('Nombre, precio y categoría son obligatorios.');
            return;
        }

        setIsSubmitting(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const payload = {
                ...newProduct,
                price: parseFloat(newProduct.price)
            };

            const response = await fetch(`${API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                toast.success('¡Producto añadido exitosamente!');
                setShowAddModal(false);
                setNewProduct({ name: '', category: 'Refacciones', price: '', image: '', description: '', is_bulk: false });
                fetchData(); // Recargar lista
            } else {
                const data = await response.json();
                toast.error(data.error || 'Error al guardar el producto');
            }
        } catch (error) {
            toast.error('Error de red al intentar crear el producto');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateTradeInStatus = async (id: number, newStatus: string) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/trade-ins/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                toast.success('Estado actualizado correctamente');
                setTradeIns(tradeIns.map(t => t.id === id ? { ...t, status: newStatus } : t));
            } else {
                toast.error('Error al actualizar estado');
            }
        } catch (error) {
            toast.error('Error de red');
        }
    };

    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-black italic">Panel <span className="text-blue-500">Admin</span></h1>
                    <p className="text-gray-400 mt-2">Bienvenido, {user?.name}</p>
                </div>
                <button
                    onClick={logout}
                    className="px-6 py-2 border border-white/20 rounded-xl hover:bg-white/10 transition-colors text-sm font-bold"
                >
                    Cerrar Sesión
                </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Catálogo de Productos</h2>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                    >
                        + Nuevo Producto
                    </button>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-400">Cargando...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                                    <th className="p-4 font-bold">ID</th>
                                    <th className="p-4 font-bold">Nombre</th>
                                    <th className="p-4 font-bold">Categoría</th>
                                    <th className="p-4 font-bold">Precio</th>
                                    <th className="p-4 font-bold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4 text-gray-400">#{p.id}</td>
                                        <td className="p-4 font-bold">{p.name}</td>
                                        <td className="p-4 text-xs uppercase tracking-widest text-gray-500">{p.category}</td>
                                        <td className="p-4 text-orange-400 font-bold">${p.price}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button className="px-3 py-1 bg-white/10 rounded text-xs hover:bg-white/20">Editar</button>
                                            <button
                                                onClick={() => handleDelete(String(p.id))}
                                                className="px-3 py-1 bg-red-500/10 text-red-500 rounded text-xs hover:bg-red-500/20"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No hay productos.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* SECCIÓN TRADE-INS */}
            <div className="mt-12 bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        📱 Solicitudes "Vende tu Teléfono"
                        {tradeIns.filter(t => t.status === 'pending').length > 0 && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                {tradeIns.filter(t => t.status === 'pending').length} Nuevas
                            </span>
                        )}
                    </h2>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-gray-400">Cargando solicitudes...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-black/50">
                                    <th className="p-4 font-bold">Fecha / ID</th>
                                    <th className="p-4 font-bold">Cliente</th>
                                    <th className="p-4 font-bold">Equipo y Estado</th>
                                    <th className="p-4 font-bold">Imágenes</th>
                                    <th className="p-4 font-bold text-right">Acciones / Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tradeIns.map((t) => (
                                    <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="text-sm font-bold">#{t.id}</div>
                                            <div className="text-xs text-gray-500">{new Date(t.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold">{t.contact_name}</div>
                                            <div className="text-xs text-orange-400">{t.contact_phone}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold">{t.brand} {t.model}</div>
                                            <div className="text-xs text-gray-400 mt-1">{t.condition}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                {t.images.slice(0, 3).map((img, i) => (
                                                    <a key={i} href={import.meta.env.VITE_API_URL + img} target="_blank" rel="noopener noreferrer">
                                                        <img src={import.meta.env.VITE_API_URL + img} alt="Foto" className="w-10 h-10 object-cover rounded border border-white/20 hover:scale-110 transition-transform" />
                                                    </a>
                                                ))}
                                                {t.images.length > 3 && (
                                                    <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-xs text-gray-400 border border-white/5">
                                                        +{t.images.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            {t.status === 'pending' ? (
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => updateTradeInStatus(t.id, 'reviewed')} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors">Contactar</button>
                                                    <button onClick={() => updateTradeInStatus(t.id, 'rejected')} className="px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded text-xs transition-colors">Rechazar</button>
                                                </div>
                                            ) : (
                                                <span className={`px-3 py-1 bg-black rounded-full text-xs font-bold ${t.status === 'reviewed' ? 'text-blue-400 border border-blue-400/20' :
                                                    t.status === 'accepted' ? 'text-green-400 border border-green-400/20' :
                                                        'text-red-400 border border-red-400/20'
                                                    }`}>
                                                    {t.status.toUpperCase()}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {tradeIns.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">No hay solicitudes nuevas.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL: AÑADIR PRODUCTO */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
                        <button
                            onClick={() => setShowAddModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-black italic text-white mb-6">Agregar <span className="text-orange-500">Producto</span></h2>

                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-bold mb-1">Nombre *</label>
                                <input required type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none" placeholder="Ej. Microscopio Binocular" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase text-gray-400 font-bold mb-1">Categoría *</label>
                                    <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none">
                                        <option value="Refacciones">Refacciones</option>
                                        <option value="Displays">Displays</option>
                                        <option value="Herramientas">Herramientas</option>
                                        <option value="Equipamiento">Equipamiento</option>
                                        <option value="Accesorios">Accesorios</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-gray-400 font-bold mb-1">Precio (MXN) *</label>
                                    <input required type="number" min="0" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none" placeholder="0.00" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-bold mb-1">URL de la Imagen</label>
                                <input type="text" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none" placeholder="https://..." />
                                <p className="text-[10px] text-gray-500 mt-1">Ingresa el link directo de la foto de internet.</p>
                            </div>

                            <div>
                                <label className="block text-xs uppercase text-gray-400 font-bold mb-1">Descripción</label>
                                <textarea rows={2} value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full bg-black border border-white/10 rounded-xl px-4 py-2 text-white focus:border-blue-500 outline-none" placeholder="Detalles del producto..."></textarea>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <input type="checkbox" id="isBulk" checked={newProduct.is_bulk} onChange={(e) => setNewProduct({ ...newProduct, is_bulk: e.target.checked })} className="w-4 h-4 rounded" />
                                <label htmlFor="isBulk" className="text-sm font-bold text-gray-300">Es Precio de Mayoreo</label>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-colors">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50">
                                    {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
