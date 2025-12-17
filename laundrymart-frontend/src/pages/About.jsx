import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Award, Users, Heart, Target } from 'lucide-react';

export default function About() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-blue-600 py-20 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517677208171-0bc67c9d1946?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="relative z-10 container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">Redefining laundry with care, speed, and technology.</p>
                </div>
            </div>

            {/* Mission Section */}
            <section className="py-20 container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <img
                            src="/about-image.jpg"
                            alt="Laundry Team"
                            className="rounded-2xl shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-2"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Driven by a Mission to Save Your Time</h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Founded in 2024, LaundryExpress started with a simple idea: laundry shouldn't be a chore. We believe that everyone deserves fresh, clean clothes without sacrificing their valuable free time.
                        </p>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            We combine eco-friendly cleaning practices with state-of-the-art technology to ensure your garments are treated with the utmost care, from pickup to delivery.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Users size={24} /></div>
                                <span className="font-semibold text-gray-800">Expert Team</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-3 rounded-full text-green-600"><Heart size={24} /></div>
                                <span className="font-semibold text-gray-800">Eco Friendly</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-3 rounded-full text-purple-600"><Award size={24} /></div>
                                <span className="font-semibold text-gray-800">Top Rated</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-3 rounded-full text-orange-600"><Target size={24} /></div>
                                <span className="font-semibold text-gray-800">Fast Service</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">5k+</h3>
                            <p className="text-gray-600">Happy Customers</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">120k+</h3>
                            <p className="text-gray-600">Clothes Washed</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">50+</h3>
                            <p className="text-gray-600">Expert Staff</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-blue-600 mb-2">99%</h3>
                            <p className="text-gray-600">Satisfaction Rate</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
