import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Icons } from '../constants';

const CheckoutSuccess: React.FC = () => {
    const clearCart = useCartStore((state) => state.clearCart);

    // Limpiamos el carrito automáticamente cuando llegan a esta página de éxito
    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-black pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-8">
                <Icons.Check className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic mb-4">¡Pago Exitoso!</h1>
            <p className="text-xl text-gray-400 max-w-lg mb-10">
                Tu orden ha sido procesada correctamente. Hemos enviado los detalles a tu correo electrónico.
            </p>
            <Link
                to="/marketplace"
                className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,107,0,0.3)]"
            >
                Volver al Marketplace
            </Link>
        </div>
    );
};

export default CheckoutSuccess;
