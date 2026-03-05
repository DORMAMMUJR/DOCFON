import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const DOCFON_WA = '525541893360';

const MARCAS = ['Apple', 'Samsung', 'Xiaomi', 'Motorola', 'Huawei', 'LG', 'Sony', 'Otra'];
const FALLAS = [
    'Pantalla rota o sin imagen',
    'Batería dañada / no carga',
    'Micrófono o bocina falla',
    'Botones / Touch sin respuesta',
    'Cámara dañada',
    'Conector de carga roto',
    'Daño por agua',
    'Software / Bloqueado / Flasheo',
    'Otra falla',
];

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        email: '',
        marca: '',
        modelo: '',
        falla: '',
        descripcion: '',
    });
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const files = Array.from(e.target.files).slice(0, 5 - selectedFiles.length);
        setSelectedFiles(prev => [...prev, ...files]);
        setPreviewUrls(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
    };

    const removeFile = (i: number) => {
        URL.revokeObjectURL(previewUrls[i]);
        setSelectedFiles(prev => prev.filter((_, idx) => idx !== i));
        setPreviewUrls(prev => prev.filter((_, idx) => idx !== i));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const msg = [
            `Hola DOCFON! 👋`,
            ``,
            `📱 *Equipo:* ${formData.marca} ${formData.modelo}`,
            `🔧 *Falla:* ${formData.falla}`,
            formData.descripcion ? `📝 *Detalles:* ${formData.descripcion}` : '',
            ``,
            `👤 *Nombre:* ${formData.nombre}`,
            `📞 *Teléfono:* ${formData.telefono}`,
            formData.email ? `📧 *Email:* ${formData.email}` : '',
            ``,
            `¿Pueden enviarme una cotización? ¡Gracias!`,
        ].filter(Boolean).join('\n');

        window.open(`https://wa.me/${DOCFON_WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="pt-28 pb-16 min-h-screen">
            <section className="max-w-3xl mx-auto px-6">
                <h1 className="text-5xl md:text-6xl font-black italic mb-4">
                    Cotizar <span className="text-orange-500">Reparación</span>
                </h1>
                <p className="text-gray-400 text-xl mb-10">
                    Cuéntanos sobre tu dispositivo y te enviamos una cotización en menos de 30 minutos.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Datos de contacto */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Nombre completo *</label>
                            <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                                placeholder="Tu nombre" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Teléfono / WhatsApp *</label>
                            <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange}
                                placeholder="10 dígitos" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Correo electrónico</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="Opcional" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors" />
                    </div>

                    {/* Datos del dispositivo */}
                    <div className="border-t border-white/10 pt-6">
                        <p className="text-sm font-bold uppercase tracking-widest text-orange-400 mb-5">📱 Datos del dispositivo</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Marca *</label>
                                <select required name="marca" value={formData.marca} onChange={handleChange}
                                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors text-white">
                                    <option value="">Selecciona la marca</option>
                                    {MARCAS.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Modelo *</label>
                                <input required type="text" name="modelo" value={formData.modelo} onChange={handleChange}
                                    placeholder="Ej: iPhone 13 Pro, Galaxy S23" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Tipo de falla *</label>
                        <select required name="falla" value={formData.falla} onChange={handleChange}
                            className="w-full bg-black border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors text-white">
                            <option value="">Selecciona el tipo de falla</option>
                            {FALLAS.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Descripción adicional</label>
                        <textarea rows={4} name="descripcion" value={formData.descripcion} onChange={handleChange}
                            placeholder="Describe el problema con más detalle (opcional)..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-orange-500 transition-colors resize-none" />
                    </div>

                    {/* Subir fotos */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-bold">Fotos del daño (opcional, máx. 5)</label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center cursor-pointer hover:border-orange-500/50 transition-colors bg-black/30"
                        >
                            <p className="text-gray-400 text-sm">📷 Haz clic para subir fotos del daño</p>
                            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFiles} className="hidden" />
                        </div>
                        {previewUrls.length > 0 && (
                            <div className="flex gap-3 mt-4 flex-wrap">
                                {previewUrls.map((url, i) => (
                                    <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 group">
                                        <img src={url} alt="" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeFile(i)}
                                            className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit"
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl transition-all shadow-xl uppercase tracking-widest flex items-center justify-center gap-3">
                        <span>💬</span> ENVIAR POR WHATSAPP
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8">
                    ¿Prefieres hablar directo?{' '}
                    <a href={`https://wa.me/${DOCFON_WA}`} target="_blank" rel="noopener noreferrer"
                        className="text-orange-500 hover:underline font-bold">
                        Escríbenos por WhatsApp
                    </a>
                </p>
            </section>
        </div>
    );
};

export default Contact;
