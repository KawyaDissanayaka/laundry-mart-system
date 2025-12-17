import React, { useState } from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function SmartFAQ() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How do I schedule a pickup?",
            answer: "Scheduling is easy! Simply login to your account, click on 'New Order', select your preferred date and time, and we'll handle the rest."
        },
        {
            question: "What items can you clean?",
            answer: "We handle regular laundry (wash & fold), dry cleaning (suits, dresses), household items (comforters, curtains), and ironing. If you have a specific item, feel free to contact us."
        },
        {
            question: "What is the turnaround time?",
            answer: "Our standard turnaround time is 24 hours for Wash & Fold and 48 hours for Dry Cleaning. Rush service offering same-day delivery is available for select areas."
        },
        {
            question: "Is there a minimum order amount?",
            answer: "Yes, our minimum order for free pickup and delivery is LKR 3000. For orders under LKR 3000, a small delivery fee of LKR 600 applies."
        },
        {
            question: "Do I need to separate my laundry?",
            answer: "No, you don't have to! Our expert team will sort your lights and darks for you. However, please separate dry cleaning items into a separate bag."
        },
        {
            question: "What detergents do you use?",
            answer: "We use high-quality, eco-friendly, and hypoallergenic detergents. You can also request unscented detergent or provide your own if you have specific allergies."
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <PublicNavbar />

            {/* Header */}
            <div className="bg-white py-20 text-center border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h1>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-16 max-w-3xl">
                <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                        >
                            <button
                                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                                onClick={() => setOpenIndex(active => active === index ? -1 : index)}
                            >
                                <span className={`font-semibold text-lg ${openIndex === index ? 'text-blue-600' : 'text-gray-800'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-blue-600" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            <div
                                className={`px-6 bg-gray-50 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                <p className="leading-relaxed">{faq.answer}</p>
                            </div>
                        </div>
                    ))}

                    {filteredFaqs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <p>No questions found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
