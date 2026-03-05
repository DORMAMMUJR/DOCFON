import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { useAuthStore } from '../store/useAuthStore';
import { Icons } from '../constants';

const TradeIn: React.FC = () => {
    const { user } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        condition: 'Como nuevo',
        description: '',
        contact_name: user?.name || '',
        contact_phone: '',
        contact_email: user?.email || '',
    });

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            // Límite de 5 fotos
            if (selectedFiles.length + files.length > 5) {
                toast.error('Puedes subir un máximo de 5 fotos.');
                return;
            }

            setSelectedFiles(prev => [...prev, ...files]);

            // Generar previsualizaciones
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviewUrls(prev => [...prev, ...newPreviews]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => {
            const newUrls = [...prev];
            URL.revokeObjectURL(newUrls[index]); // Liberar memoria
            newUrls.splice(index, 1);
            return newUrls;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.brand || !formData.model || !formData.condition) {
            toast.error('Por favor completa la marca, modelo y estado.');
            return;
        }

        if (selectedFiles.length === 0) {
            toast.error('Por favor sube al menos una foto de tu equipo.');
            return;
        }

        setLoading(true);

        try {
            // Usamos FormData para enviar multipart/form-data
            const submitData = new FormData();
            submitData.append('brand', formData.brand);
            submitData.append('model', formData.model);
            submitData.append('condition', formData.condition);
            submitData.append('description', formData.description);
            submitData.append('contact_name', formData.contact_name);
            submitData.append('contact_phone', formData.contact_phone);
            submitData.append('contact_email', formData.contact_email);

            if (user?.id) {
                submitData.append('user_id', String(user.id));
            }

            selectedFiles.forEach((file) => {
                submitData.append('images', file);
            });

            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/trade-ins`, {
                method: 'POST',
                body: submitData, // fetch asigna el header mutipart/form-data automáticamente
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar la solicitud');
            }

            toast.success('¡Solicitud enviada con éxito! Te contactaremos pronto.');

            // Limpiar formulario
            setFormData({ ...formData, brand: '', model: '', description: '', contact_phone: '' });
            setSelectedFiles([]);
            setPreviewUrls([]);

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black italic mb-4">
                    Vende tu <span className="text-orange-500">Teléfono</span>
                </h1>
                <p className="text-xl text-gray-400">
                    Sube fotos de tu equipo usado y recibe la mejor oferta de compra o crédito para refacciones DOCFON.
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Sección 1: Datos del Equipo */}
                    <div>
                        <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-6 text-orange-400">1. Detalles del Equipo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Marca *</label>
                                <input required type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" placeholder="Ej: Apple, Samsung, Xiaomi" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Modelo Exacto *</label>
                                <input required type="text" name="model" value={formData.model} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" placeholder="Ej: iPhone 13 Pro Max 256GB" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Estado Físico y Funcional *</label>
                                <select required name="condition" value={formData.condition} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none text-white">
                                    <option value="Como nuevo">Como nuevo (Sin detalles)</option>
                                    <option value="Buen estado">Buen estado (Marcas de uso leves)</option>
                                    <option value="Pantalla estrella">Detalles estéticos / Pantalla estrellada</option>
                                    <option value="No enciende">No enciende / Para piezas</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Notas Adicionales (Opcional)</label>
                                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" placeholder="¿Tiene cuenta bloqueada? ¿Batería degradada? Cuéntanos los detalles..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Fotos */}
                    <div>
                        <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-6 text-orange-400">2. Fotografías del Equipo *</h2>

                        <div
                            className="border-2 border-dashed border-white/20 rounded-2xl p-8 hover:border-orange-500/50 transition-colors cursor-pointer text-center bg-black/50"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Icons.Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                            <p className="font-bold text-lg mb-1">Haz clic para subir fotos</p>
                            <p className="text-gray-500 text-sm">Máximo 5 fotos (Frontal, trasera, bordes)</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                multiple
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        {/* Previsualización */}
                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative group rounded-xl overflow-hidden bg-black aspect-square border border-white/10">
                                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sección 3: Datos de Contacto */}
                    <div>
                        <h2 className="text-xl font-bold border-b border-white/10 pb-2 mb-6 text-orange-400">3. Datos de Contacto</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Nombre</label>
                                <input required type="text" name="contact_name" value={formData.contact_name} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Teléfono/WhatsApp *</label>
                                <input required type="tel" name="contact_phone" value={formData.contact_phone} onChange={handleInputChange} className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:border-orange-500 outline-none" placeholder="Para enviarte la cotización" />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="pt-4 text-center">
                        <button
                            type="submit"
                            disabled={loading || selectedFiles.length === 0}
                            className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black rounded-xl hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
                        >
                            {loading ? 'Subiendo datos y fotos...' : 'SOLICITAR COTIZACIÓN'}
                        </button>
                        <p className="text-gray-500 mt-4 text-sm">Te responderemos en menos de 24 horas hábiles.</p>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default TradeIn;
