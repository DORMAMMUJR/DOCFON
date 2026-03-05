import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '../store/useAuthStore';
import { Icons } from '../constants';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname || '/';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Por favor completa todos los campos.');
            return;
        }

        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al iniciar sesión');
            }

            login(data.token, data.user);
            toast.success(`¡Bienvenido ${data.user.name}!`);

            // Redirigir a admin si es admin, o a la ruta que intentaba acceder
            if (data.user.role === 'admin' && from === '/') {
                navigate('/admin', { replace: true });
            } else {
                navigate(from, { replace: true });
            }
        } catch (error: any) {
            toast.error(error.message || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-3xl m-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black italic">Acceso <span className="text-orange-500">Privado</span></h1>
                    <p className="text-gray-400 mt-2">Ingresa tus credenciales técnicas</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="docfon@ejemplo.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'VERIFICANDO...' : 'INGRESAR'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
