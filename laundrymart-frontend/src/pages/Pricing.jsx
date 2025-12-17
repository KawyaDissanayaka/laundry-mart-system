import React, { useState } from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Search, Shirt, Scissors, Tag } from 'lucide-react';

export default function Pricing() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    // Mock Pricing Data based on user reference
    const pricingItems = [
        { id: 1, name: "Baby Full Suit (3pcs)", price: 1100, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Kids" },
        { id: 2, name: "Bed Sheet (Double size)", price: 520, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Household" },
        { id: 3, name: "Bed Sheet (King size)", price: 600, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Household" },
        { id: 4, name: "Blaser", price: 750, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Men" },
        { id: 5, name: "Blaser", price: 900, unit: "pcs", type: "Dry Clean", speed: "One Day Service", category: "Men" },
        { id: 6, name: "Blaser", price: 1500, unit: "pcs", type: "Dry Clean", speed: "Fast Service", category: "Men" },
        { id: 7, name: "Blaser & Trouser (2PCS)", price: 1400, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Men" },
        { id: 8, name: "Blouse", price: 450, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Women" },
        { id: 9, name: "Bridal Frock", price: 3800, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Women" },
        { id: 10, name: "Bridal Saree", price: 2590, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Women" },
        { id: 11, name: "Cap", price: 390, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Accessories" },
        { id: 12, name: "Cloak", price: 900, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Accessories" },
        { id: 13, name: "Coffee Table Carpets", price: 2490, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Household" },
        { id: 14, name: "Curtains", price: 650, unit: "kilo", type: "Dry Clean", speed: "Normal Service", category: "Household" },
        { id: 15, name: "Dancing Item", price: 850, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Other" },
        { id: 16, name: "Full Suit (3PCS)", price: 1650, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Men" },
        { id: 17, name: "Jersey", price: 750, unit: "kilo", type: "Dry Clean", speed: "Normal Service", category: "Men" },
        { id: 18, name: "Kurtha", price: 1950, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Women" },
        { id: 19, name: "Lehenga", price: 2800, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Women" },
        { id: 20, name: "National Suit (2PCS)", price: 1500, unit: "pcs", type: "Dry Clean", speed: "Normal Service", category: "Men" },
    ];

    const categories = ['All', 'Men', 'Women', 'Kids', 'Household', 'Accessories'];

    const filteredItems = pricingItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'All' || item.category === activeTab;
        return matchesSearch && matchesTab;
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-teal-500 text-white overflow-hidden">
                <div className="container mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 text-center md:text-left z-10">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h1>
                        <p className="text-xl text-teal-50 mb-8 leading-relaxed">
                            No hidden fees. Just clean clothes and clear prices. Check out our competitive rates for all your laundry needs.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute inset-0 bg-teal-500/20 rounded-2xl transform rotate-3"></div>
                        <img
                            src="/pricing-image.png"
                            alt="Laundry Pricing"
                            className="relative rounded-2xl shadow-2xl border-4 border-white/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="container mx-auto px-6 -mt-8 mb-12 relative z-10">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search for an item..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === cat
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pricing Grid */}
            <div className="container mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                                        <Shirt className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{item.name}</h3>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                    {item.type}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                    Unit: {item.unit}
                                </span>
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${item.speed.includes('Fast') || item.speed.includes('One Day')
                                    ? 'bg-purple-50 text-purple-700'
                                    : 'bg-green-50 text-green-700'
                                    }`}>
                                    {item.speed}
                                </span>
                            </div>

                            <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                                <span className="text-gray-400 text-sm font-medium">Price:</span>
                                <div className="flex items-center items-baseline text-teal-600 font-bold">
                                    <Tag className="w-4 h-4 mr-1" />
                                    <span className="text-xl">LKR {item.price}</span>
                                    <span className="text-xs ml-1 text-gray-400">.00</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredItems.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <Scissors className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No items found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
