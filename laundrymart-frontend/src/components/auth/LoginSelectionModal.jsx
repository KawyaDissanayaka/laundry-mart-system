import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bike, Briefcase, Shield, X } from 'lucide-react';

export default function LoginSelectionModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const options = [
        {
            role: 'Customer',
            icon: <User size={32} />,
            description: 'Order & Track Laundry',
            path: '/login',
            state: { role: 'customer' },
            color: 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white',
            borderColor: 'border-blue-100'
        },
        {
            role: 'Rider',
            icon: <Bike size={32} />,
            description: 'Delivery Partner App',
            path: '/login',
            state: { role: 'rider' },
            color: 'bg-green-50 text-green-600 hover:bg-green-600 hover:text-white',
            borderColor: 'border-green-100'
        },
        {
            role: 'Staff',
            icon: <Briefcase size={32} />,
            description: 'Employee Dashboard',
            path: '/login',
            state: { role: 'employee' },
            color: 'bg-purple-50 text-purple-600 hover:bg-purple-600 hover:text-white',
            borderColor: 'border-purple-100'
        },
        {
            role: 'Admin',
            icon: <Shield size={32} />,
            description: 'System Management',
            path: '/admin/login',
            state: {},
            color: 'bg-slate-50 text-slate-600 hover:bg-slate-800 hover:text-white',
            borderColor: 'border-slate-100'
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="text-gray-500 text-sm">Please select your account type to continue</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 grid md:grid-cols-2 gap-4">
                    {options.map((option) => (
                        <Link
                            key={option.role}
                            to={option.path}
                            state={option.state}
                            onClick={onClose}
                            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${option.borderColor} hover:shadow-lg ${option.color} hover:-translate-y-1`}
                        >
                            <div className="p-3 rounded-lg bg-white shadow-sm group-hover:bg-white/20 transition-colors">
                                {option.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{option.role}</h3>
                                <p className="text-sm opacity-80 font-medium">{option.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="p-4 bg-gray-50 text-center text-sm text-gray-500 border-t border-gray-100">
                    Not sure? <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => { }}>Contact Support</span>
                </div>
            </div>
        </div>
    );
}
