import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import contactDecoration from '../assets/contact-decoration.png';

export default function Contact() {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newMessage = {
            id: `MSG-${Date.now().toString().slice(-6)}`,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            date: new Date().toISOString(),
            status: 'New'
        };

        const existingMessages = JSON.parse(localStorage.getItem('laundry_messages') || '[]');
        localStorage.setItem('laundry_messages', JSON.stringify([newMessage, ...existingMessages]));

        setSubmitted(true);
        setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });

        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans relative overflow-x-hidden selection:bg-purple-200">
            <PublicNavbar />

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-200/40 to-yellow-200/40 rounded-full blur-3xl -z-10 opacity-60"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/40 to-pink-200/40 rounded-full blur-3xl -z-10 opacity-60"></div>

            <div className="container mx-auto px-6 py-12 lg:py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Content & Visuals */}
                    <div className="space-y-10 animate-fade-in-up">
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-sm tracking-wide uppercase">
                                24/7 Support
                            </span>
                            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                Let's Start a <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Conversation</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                                Have a question about our laundry services? We're here to help you get the fresh start you deserve.
                            </p>
                        </div>

                        {/* Image Showcase */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-3xl rotate-3 opacity-20 transition-transform group-hover:rotate-6"></div>
                            <img
                                src={contactDecoration}
                                alt="Customer Support"
                                className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover object-top transition-transform group-hover:-translate-y-2"
                            />

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
                                <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                    <MessageSquare size={24} fill="currentColor" className="opacity-20" />
                                    <MessageSquare size={24} className="absolute top-3 left-3" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Response Time</p>
                                    <p className="text-lg font-bold text-gray-900">&lt; 2 Hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 pt-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-xl shadow-md text-purple-600 ring-1 ring-gray-100">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Talk to Us</h3>
                                    <p className="text-gray-600 mt-1">+94 79 001 1223</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-white p-3 rounded-xl shadow-md text-purple-600 ring-1 ring-gray-100">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Email Us</h3>
                                    <p className="text-gray-600 mt-1">support@laundrygo.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Glassmorphic Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-10 -z-10 transform scale-105"></div>

                        <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                            {submitted && (
                                <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                        <Send size={40} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-500 max-w-xs mx-auto">Thank you for reaching out. We'll be in touch with you shortly.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-8 px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition"
                                    >
                                        Send another
                                    </button>
                                </div>
                            )}

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                                <p className="text-gray-500 mt-2">Fill out the form below and we'll get back to you.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="shanilka"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700 ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-gray-400"
                                            placeholder="lakshan"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="kawya@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                                    <div className="relative">
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all appearance-none"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Order Support</option>
                                            <option>Commercial Service</option>
                                            <option>Feedback</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                                    <textarea
                                        rows="4"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all resize-none placeholder:text-gray-400"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group">
                                    <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Additional Info Section */}
                <div className="mt-20 pt-10 border-t border-gray-200">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
                            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
                                <Clock size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Operating Hours</h4>
                                <p className="text-gray-500 text-sm mt-1">Mon-Fri: 8am - 8pm<br />Sat-Sun: 9am - 6pm</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Our Location</h4>
                                <p className="text-gray-500 text-sm mt-1">No 28, Homagama,<br />Colombo</p>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
                            <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Live Chat</h4>
                                <p className="text-gray-500 text-sm mt-1">Available 24/7 on our<br />mobile app</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
