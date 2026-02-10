
import React from 'react';

const Technology: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center space-y-6 mb-24">
          <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter">Powered by <span className="text-orange-500">DOCFON OS</span></h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto italic">
            No somos solo una red de reparadores. Somos una plataforma tecnológica que optimiza cada segundo de la operación.
          </p>
        </div>

        {/* TEIKON Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
           <div className="order-2 lg:order-1 relative">
             <div className="aspect-video bg-gradient-to-br from-blue-900 to-black rounded-[40px] border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/1200/800?dashboard=1" alt="Teikon POS" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-blue-600/10 flex flex-col justify-center p-12 space-y-4">
                   <div className="h-4 w-1/3 bg-blue-500 rounded-full"></div>
                   <div className="h-4 w-2/3 bg-white/20 rounded-full"></div>
                   <div className="h-4 w-1/2 bg-white/20 rounded-full"></div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 bg-white text-black p-8 rounded-3xl shadow-2xl max-w-xs border-4 border-blue-500">
               <p className="font-black text-2xl italic">TEIKON</p>
               <p className="text-xs font-bold text-gray-500 uppercase">POS & INVENTORY</p>
               <div className="mt-4 flex gap-2">
                 {[1,2,3,4].map(i => <div key={i} className="h-2 w-full bg-blue-100 rounded-full"></div>)}
               </div>
             </div>
           </div>
           <div className="order-1 lg:order-2 space-y-8">
             <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">INFRAESTRUCTURA</span>
             <h2 className="text-4xl md:text-6xl font-black italic leading-tight">Gestión Inteligente de <span className="text-blue-500">Sucursales.</span></h2>
             <p className="text-gray-400 text-lg leading-relaxed">
               TEIKON es el cerebro de DOCFON. Permite a cada dueño ver el rendimiento de sus técnicos, el stock disponible en tiempo real y la rentabilidad por minuto.
             </p>
             <ul className="space-y-4">
               {['Control de inventario serializado', 'Órdenes de servicio automatizadas', 'Reportes financieros en tiempo real', 'Gestión de múltiples sucursales'].map((f, i) => (
                 <li key={i} className="flex items-center space-x-3">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                   <span className="font-bold text-sm text-gray-300">{f}</span>
                 </li>
               ))}
             </ul>
           </div>
        </div>

        {/* VISO Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8">
             <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">AUTOMATIZACIÓN</span>
             <h2 className="text-4xl md:text-6xl font-black italic leading-tight">Ventas y Fidelización vía <span className="text-orange-500">WhatsApp.</span></h2>
             <p className="text-gray-400 text-lg leading-relaxed">
               VISO se encarga de que ningún cliente sea olvidado. Desde el aviso de reparación lista hasta promociones personalizadas basadas en el historial.
             </p>
             <ul className="space-y-4">
               {['Chatbots de atención 24/7', 'Recordatorios automáticos de garantía', 'Marketing segmentado por WhatsApp', 'Ruta de leads para expansión'].map((f, i) => (
                 <li key={i} className="flex items-center space-x-3">
                   <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                   <span className="font-bold text-sm text-gray-300">{f}</span>
                 </li>
               ))}
             </ul>
           </div>
           <div className="relative">
             <div className="aspect-video bg-gradient-to-br from-orange-900 to-black rounded-[40px] border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/1200/800?ai=1" alt="Viso CRM" className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-orange-600/10 flex flex-col justify-end p-12 space-y-4">
                   <div className="w-1/2 h-12 bg-white/10 backdrop-blur rounded-2xl flex items-center px-4">
                      <div className="w-6 h-6 bg-orange-500 rounded-full mr-3"></div>
                      <div className="h-2 w-2/3 bg-white/20 rounded-full"></div>
                   </div>
                   <div className="w-2/3 h-12 bg-orange-500/20 backdrop-blur rounded-2xl flex items-center px-4 self-end">
                      <div className="h-2 w-2/3 bg-orange-400 rounded-full mr-3"></div>
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                   </div>
                </div>
             </div>
             <div className="absolute -top-10 -left-10 bg-black text-white p-8 rounded-3xl shadow-2xl max-w-xs border-4 border-orange-500">
               <p className="font-black text-2xl italic">VISO</p>
               <p className="text-xs font-bold text-gray-500 uppercase">WHATSAPP & CRM</p>
               <div className="mt-4 space-y-2">
                 <div className="h-2 w-full bg-orange-500/20 rounded-full"></div>
                 <div className="h-2 w-3/4 bg-orange-500/20 rounded-full"></div>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="py-32 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-20 space-y-4">
             <h2 className="text-4xl font-black italic">Analytics para la Expansión Nacional</h2>
             <p className="text-gray-400">Medimos lo que importa para escalar el negocio de cada socio.</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Conversion Rate', value: '38%', color: 'text-orange-500' },
                { label: 'Avg Ticket', value: '$1,250', color: 'text-blue-500' },
                { label: 'Customer LTV', value: '$4,800', color: 'text-white' },
                { label: 'Repair Success', value: '99.2%', color: 'text-green-500' }
              ].map((m, i) => (
                <div key={i} className="bg-black p-8 rounded-[30px] border border-white/10 text-center">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{m.label}</p>
                   <p className={`text-4xl font-black ${m.color}`}>{m.value}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
