import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Academia from './pages/Academia';
import Marketplace from './pages/Marketplace';
import Franchise from './pages/Franchise';
import Technology from './pages/Technology';
import Contact from './pages/Contact';
import Help from './pages/Help';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Locations from './pages/Locations';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import TradeIn from './pages/TradeIn';
import ProtectedRoute from './components/ProtectedRoute';
import { Icons } from './constants';

const WHATSAPP_NUMBER = '525541893360';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main className="min-h-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/academia" element={<Academia />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/franchise" element={<Franchise />} />
                    <Route path="/technology" element={<Technology />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/checkout/success" element={<CheckoutSuccess />} />
                    <Route path="/vender-telefono" element={<TradeIn />} />

                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute adminOnly>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            <Footer />

            {/* WhatsApp Floating Button */}
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center animate-pulse"
            >
                <Icons.Whatsapp className="w-8 h-8" />
            </a>
        </BrowserRouter>
    );
};

export default App;
