import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Clock, ShieldCheck, X, ArrowRight } from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000); // Show popup after 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            <PublicNavbar />

            {/* Hero Section */}
            <header className="relative pt-32 pb-40 lg:pt-48 lg:pb-64 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero-image.png"
                        alt="Laundry Service"
                        className="w-full h-full object-cover opacity-90 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="max-w-3xl">
                        <span className="inline-block py-1 px-3 rounded-full bg-teal-500/20 text-teal-100 border border-teal-400/30 text-sm font-bold mb-6 backdrop-blur-sm">
                            #1 Laundry Service in Town
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
                            Fresh Clothes, <br />
                            <span className="text-teal-400">Zero Stress.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light leading-relaxed max-w-2xl">
                            We pick up, clean, and deliver your laundry in 24 hours. Experience the ultimate convenience today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/services"
                                className="px-10 py-5 bg-teal-500 text-white text-lg font-bold rounded-xl hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1 flex items-center justify-center group"
                            >
                                Schedule Pickup
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/pricing"
                                className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20 animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">We don't just clean clothes; we care for them. Here is why thousands trust us.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {/* Feature 1 */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 fade-in duration-700 delay-150 fill-mode-both">
                            <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Truck className="w-10 h-10 text-teal-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Free Pickup & Delivery</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Don't leave your house. We collect your dirty laundry and return it fresh and folded, absolutely free.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 fill-mode-both">
                            <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                                <Clock className="w-10 h-10 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">24h Turnaround</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Use our Express Service to get your clothes back in as little as 24 hours. Because time is money.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500 fill-mode-both">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                                <ShieldCheck className="w-10 h-10 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Quality Guarantee</h3>
                            <p className="text-slate-500 leading-relaxed">
                                If you're not 100% satisfied with our cleaning, we will re-wash your clothes for free. No questions asked.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section - New Images */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6 space-y-24">
                    {/* Feature Row 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full md:w-1/2 animate-in slide-in-from-left-8 duration-1000 delay-200 fill-mode-both">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl skew-y-1 transform hover:skew-y-0 transition-transform duration-500">
                                <div className="absolute inset-0 bg-teal-500 mix-blend-color opacity-20"></div>
                                <img
                                    src="/feature-smell.png"
                                    alt="Fresh Scent"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 animate-in slide-in-from-right-8 duration-1000 delay-400 fill-mode-both">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Experience the Difference</h2>
                            <p className="text-lg text-slate-500 leading-relaxed mb-8">
                                There is nothing quite like the scent of freshly cleaned laundry. We use premium, eco-friendly detergents that are tough on stains but gentle on your fabrics and senses. Your clothes will look great and smell even better.
                            </p>
                            <Link to="/services" className="text-teal-600 font-bold hover:text-teal-700 flex items-center group">
                                Learn about our detergents <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Feature Row 2 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                        <div className="w-full md:w-1/2 animate-in slide-in-from-right-8 duration-1000 delay-200 fill-mode-both">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl -skew-y-1 transform hover:skew-y-0 transition-transform duration-500">
                                <div className="absolute inset-0 bg-blue-500 mix-blend-color opacity-20"></div>
                                <img
                                    src="/feature-thumbs.png"
                                    alt="Expert Care"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 animate-in slide-in-from-left-8 duration-1000 delay-400 fill-mode-both">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Expert Care, Guaranteed</h2>
                            <p className="text-lg text-slate-500 leading-relaxed mb-8">
                                Our team is trained to handle all types of fabrics with the utmost care. From delicate silks to heavy comforters, we ensure every item is returned to you in perfect condition. We treat your laundry like it's our own.
                            </p>
                            <Link to="/about" className="text-teal-600 font-bold hover:text-teal-700 flex items-center group">
                                Meet our team <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Welcome Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setShowPopup(false)}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <div className="bg-teal-500 h-32 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/hero-image.png')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                            <h3 className="text-3xl font-bold text-white relative z-10 drop-shadow-md">Special Offer! 🎉</h3>
                        </div>

                        <div className="p-8 text-center">
                            <p className="text-xl text-slate-600 mb-2">Get <span className="font-bold text-teal-600">20% OFF</span> your first order!</p>
                            <p className="text-slate-500 mb-8 text-sm">Use code <span className="font-mono bg-gray-100 px-2 py-1 rounded text-slate-800 font-bold">FRESH20</span> at checkout.</p>

                            <Link
                                to="/services"
                                className="block w-full py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-lg hover:shadow-teal-500/30"
                                onClick={() => setShowPopup(false)}
                            >
                                Claim Offer Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
