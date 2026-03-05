import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { Icons } from '../constants';
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const resolveImg = (src: string) => {
    if (!src) return '';
    if (src.startsWith('http') || src.startsWith('data:')) return src;
    return API_URL + src;
};

const Checkout: React.FC = () => {
    const { cart, clearCart } = useCartStore();
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);

    // Formulario de envío
    const [shippingAddress, setShippingAddress] = useState({
        nombre: user?.name || '',
        calle: '',
        ciudad: '',
        estado: '',
        cp: '',
        telefono: ''
    });

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const envio = subtotal > 2000 ? 0 : 150; // Envío gratis en compras mayores a $2000
    const total = subtotal + envio;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (!shippingAddress.nombre || !shippingAddress.calle || !shippingAddress.cp || !shippingAddress.telefono) {
            toast.error('Por favor completa los datos de envío obligatorios.');
            return;
        }

        if (cart.length === 0) {
            toast.error('El carrito está vacío.');
            return;
        }

        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/payments/create-checkout-session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart,
                    shippingAddress,
                    userId: user?.id || null
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al procesar pago');
            }

            // Redirigir al Hosted Checkout de Stripe
            window.location.href = data.url;

        } catch (error: any) {
            toast.error(error.message || 'Error de conexión con la pasarela.');
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="pt-32 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Icons.Cart className="w-12 h-12 text-gray-500" />
                </div>
                <h1 className="text-4xl font-black italic mb-4">Carrito <span className="text-orange-500">Vacío</span></h1>
                <p className="text-gray-400 mb-8 max-w-md">No tienes productos en tu carrito. Visita el Marketplace para agregar las mejores refacciones.</p>
                <a href="/marketplace" className="px-8 py-4 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition-all uppercase tracking-widest text-sm">
                    Ir al Marketplace
                </a>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-black italic mb-12">Finalizar <span className="text-blue-500">Compra</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Columna Izquierda: Datos de Envío */}
                <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-sm">1</span>
                            Datos de Envío
                        </h2>
                        <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Nombre Completo *</label>
                                <input required type="text" name="nombre" value={shippingAddress.nombre} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="Quien recibe" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Calle y Número *</label>
                                <input required type="text" name="calle" value={shippingAddress.calle} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="Domicilio completo" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Código Postal *</label>
                                    <input required type="text" name="cp" value={shippingAddress.cp} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="00000" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Ciudad</label>
                                    <input required type="text" name="ciudad" value={shippingAddress.ciudad} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="Ciudad" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Estado</label>
                                    <input required type="text" name="estado" value={shippingAddress.estado} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="Estado" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Teléfono *</label>
                                    <input required type="tel" name="telefono" value={shippingAddress.telefono} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none" placeholder="A 10 dígitos" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Columna Derecha: Resumen de Orden */}
                <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl sticky top-32">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-sm">2</span>
                            Resumen de Compra
                        </h2>

                        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center bg-black/50 p-3 rounded-xl border border-white/5">
                                    <div className="w-16 h-16 rounded-lg bg-gray-900 overflow-hidden flex-shrink-0">
                                        <img src={resolveImg(item.image)} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.category} x {item.quantity}</p>
                                    </div>
                                    <div className="text-right font-black text-orange-400">
                                        ${(item.price * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-4 space-y-3 mb-8">
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()} MXN</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Envío (Estándar)</span>
                                <span>{envio === 0 ? '¡GRATIS!' : `$${envio.toLocaleString()} MXN`}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-black mt-4 pt-4 border-t border-white/10">
                                <span>Total</span>
                                <span>${total.toLocaleString()} MXN</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={loading}
                            className="w-full py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <span className="animate-pulse">PROCESANDO...</span>
                            ) : (
                                <><span>💳</span> PAGAR DE FORMA SEGURA</>
                            )}
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-2">
                            <span>🔒</span> Pagos encriptados de extremo a extremo
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
