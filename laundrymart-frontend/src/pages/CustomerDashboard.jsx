import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    User,
    Plus,
    LogOut,
    MapPin,
    Phone,
    Mail,
    Clock,
    CheckCircle,
    DollarSign,
    X,
    FileText,
    Printer,
    Download,
    ChevronRight,
    Package,
    Calendar,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { orderService } from '../services/orderService';

// --- Utility Components ---

const StatusBadge = ({ status }) => {
    const styles = {
        'Cleaning': 'bg-blue-100 text-blue-700 border-blue-200',
        'Washing': 'bg-blue-100 text-blue-700 border-blue-200',
        'Sorting': 'bg-indigo-100 text-indigo-700 border-indigo-200',
        'Drying': 'bg-orange-100 text-orange-700 border-orange-200',
        'Folding': 'bg-purple-100 text-purple-700 border-purple-200',
        'Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
        'Delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Cancelled': 'bg-red-100 text-red-700 border-red-200',
        'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
        'Placed': 'bg-amber-100 text-amber-700 border-amber-200',
        'Ready': 'bg-teal-100 text-teal-700 border-teal-200',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            {status}
        </span>
    );
};

const StatCard = ({ title, value, icon: Icon, colorClass, trend }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800 group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-slate-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                    {value}
                </h3>
                {trend && <p className="text-xs text-emerald-600 mt-1 font-medium">{trend}</p>}
            </div>
            <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
            </div>
        </div>
    </div>
);

// --- Sub-Components ---

const LiveTracker = ({ activeOrders }) => {
    if (activeOrders.length === 0) return null;

    // Show the most recent active order
    const currentOrder = activeOrders[0];
    const steps = ['Placed', 'Sorting', 'Washing', 'Drying', 'Folding', 'Ready', 'Delivered'];

    // Normalize status to step index, handling variations
    const currentStepIndex = steps.findIndex(step => {
        if (currentOrder.status === step) return true;
        if (currentOrder.status === 'Cleaning' && step === 'Washing') return true;
        if (currentOrder.status === 'Picked Up' && step === 'Sorting') return true;
        return false;
    });

    const activeStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500"></div>

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                        Live Status: Order #{currentOrder.id}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Estimated Delivery: <span className="font-semibold text-slate-700">{new Date(currentOrder.deliveryDate).toLocaleDateString()}</span>
                    </p>
                </div>
                {/* Progress Note/Badge */}
                {currentOrder.progress && (
                    <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 max-w-xs text-right hidden md:block">
                        <p className="text-xs font-bold text-blue-800 uppercase mb-0.5">Latest Update</p>
                        <p className="text-sm text-blue-700 font-medium truncate">{currentOrder.progress.note || 'Processing your order'}</p>
                    </div>
                )}
            </div>

            {/* Stepper */}
            <div className="relative flex justify-between items-center w-full px-2 md:px-6">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0 rounded-full"></div>
                <div
                    className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-0 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(activeStepIndex / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index <= activeStepIndex;
                    const isCurrent = index === activeStepIndex;

                    return (
                        <div key={step} className="flex flex-col items-center relative z-10 group cursor-default">
                            <div
                                className={`
                                    w-4 h-4 md:w-8 md:h-8 rounded-full flex items-center justify-center border-4 transition-all duration-500
                                    ${isCompleted ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-200' : 'bg-white border-slate-200'}
                                    ${isCurrent ? 'scale-125 ring-4 ring-blue-100' : ''}
                                `}
                            >
                                {isCompleted && <CheckCircle className="w-2 h-2 md:w-4 md:h-4 text-white" />}
                            </div>
                            <span
                                className={`
                                    absolute -bottom-8 text-[10px] md:text-xs font-bold uppercase tracking-wider
                                    ${isCurrent ? 'text-blue-700 scale-110' : 'text-slate-400'}
                                    transition-all duration-300
                                    ${index === 0 || index === steps.length - 1 ? '' : 'hidden md:block'}
                                `}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile Current Step Label */}
            <div className="mt-8 text-center md:hidden">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{steps[activeStepIndex]}</p>
            </div>
        </div>
    );
};

const OverviewTab = ({ stats, recentOrders, setActiveTab, activeOrders }) => (
    <div className="space-y-8">
        {/* Live Tracker for active orders */}
        <LiveTracker activeOrders={activeOrders} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={ShoppingBag}
                colorClass="bg-blue-500"
                trend="+2 this month"
            />
            <StatCard
                title="Active Orders"
                value={stats.activeOrders}
                icon={Clock}
                colorClass="bg-amber-500"
            />
            <StatCard
                title="Completed"
                value={stats.completedOrders}
                icon={CheckCircle}
                colorClass="bg-emerald-500"
            />
            <StatCard
                title="Total Spent"
                value={`LKR ${stats.totalSpent.toLocaleString()}`}
                icon={DollarSign}
                colorClass="bg-violet-500"
            />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
                    <p className="text-slate-500 text-sm">Your latest laundry updates</p>
                </div>
                <button
                    onClick={() => setActiveTab('orders')}
                    className="text-blue-600 text-sm font-semibold hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                >
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Pickup</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-sm font-medium text-slate-900">{order.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-blue-50 rounded text-blue-600">
                                            <Package className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{order.service}</p>
                                            <p className="text-xs text-slate-500">{order.items} items</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        {order.pickup}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">LKR {order.total.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const OrdersTab = ({ recentOrders }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-800">Order History</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-6 py-4">
                                <span className="font-mono text-sm font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{order.id}</span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.service}</td>
                            <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                            <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">LKR {order.total.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const ProfileTab = ({ user }) => {
    const { updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
    });

    const handleSave = () => {
        updateUserProfile(formData);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
                {/* Cover Banner Mock */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-violet-600"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row justify-between items-end -mt-12 mb-8 gap-4">
                        <div className="flex items-end gap-6">
                            <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-md shrink-0">
                                <div className="w-full h-full bg-slate-100 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-400">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                            </div>
                            <div className="mb-1">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="text-2xl font-bold text-slate-900 border-b-2 border-slate-200 focus:border-blue-500 outline-none bg-transparent w-full"
                                        placeholder="Your Name"
                                    />
                                ) : (
                                    <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                                )}
                                <p className="text-slate-500 font-medium">Premium Member</p>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white shadow-sm flex-1 md:flex-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex-1 md:flex-none"
                                    >
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        setFormData({
                                            name: user?.name || '',
                                            email: user?.email || '',
                                            phone: user?.phone || '',
                                            address: user?.address || '',
                                        });
                                        setIsEditing(true);
                                    }}
                                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors bg-white shadow-sm w-full md:w-auto"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-full">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Contact Info</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div className="w-full">
                                            <p className="text-xs text-slate-500 font-medium">Email</p>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full text-sm text-slate-900 bg-white border border-slate-200 rounded px-2 py-1 mt-1 focus:ring-2 focus:ring-blue-100 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm text-slate-900">{user?.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div className="w-full">
                                            <p className="text-xs text-slate-500 font-medium">Phone</p>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full text-sm text-slate-900 bg-white border border-slate-200 rounded px-2 py-1 mt-1 focus:ring-2 focus:ring-blue-100 outline-none"
                                                />
                                            ) : (
                                                <p className="text-sm text-slate-900">{user?.phone || 'Not set'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-full">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Default Address</h3>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div className="w-full">
                                        {isEditing ? (
                                            <textarea
                                                name="address"
                                                rows="3"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full text-sm text-slate-900 bg-white border border-slate-200 rounded px-2 py-1 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                                                placeholder="Street, City, Province"
                                            ></textarea>
                                        ) : (
                                            <p className="text-sm text-slate-900 font-medium leading-relaxed whitespace-pre-wrap">
                                                {user?.address || 'No address set'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Modals ---

const NewOrderModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        service: 'Wash & Fold',
        date: '',
        time: 'Morning (8-12)',
        items: '',
        instructions: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Schedule Pickup</h3>
                        <p className="text-slate-500 text-sm mt-0.5">Let us handle your laundry</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="p-6 space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Service Type</label>
                            <select
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                className="w-full rounded-xl border-slate-200 border bg-slate-50 hover:bg-white focus:bg-white p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            >
                                <option>Wash & Fold</option>
                                <option>Dry Cleaning</option>
                                <option>Ironing Only</option>
                                <option>Household Items</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                />
                                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Time Slot</label>
                            <div className="relative">
                                <select
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none"
                                >
                                    <option>Morning (8-12)</option>
                                    <option>Afternoon (12-4)</option>
                                    <option>Evening (4-8)</option>
                                </select>
                                <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Estimated Items</label>
                            <input
                                type="number"
                                placeholder="e.g., 10"
                                required
                                min="1"
                                value={formData.items}
                                onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                                className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Special Instructions <span className="text-slate-400 font-normal">(Optional)</span></label>
                            <textarea
                                rows="3"
                                placeholder="Gate code, stain alerts, specific detergent..."
                                value={formData.instructions}
                                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                                className="w-full rounded-xl border-slate-200 border bg-slate-50 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
                        >
                            Get Quote & Schedule
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const QuotationModal = ({ isOpen, onClose, data }) => {
    const quotationRef = useRef();

    if (!isOpen || !data) return null;

    // ... (Keep existing print/download logic)
    const handlePrint = () => {
        const printContent = quotationRef.current.innerHTML;

        // Simple print hack for SPA
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
                    <html>
                        <head>
                            <title>Print Quotation</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body class="p-8">
                            ${printContent}
                            <script>
                                setTimeout(() => {
                                    window.print();
                                    window.close();
                                }, 500);
                            </script>
                        </body>
                    </html>
                `);
        printWindow.document.close();
    };

    const handleDownloadPDF = async () => {
        if (quotationRef.current) {
            const canvas = await html2canvas(quotationRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Quotation-${data.id}.pdf`);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Quotation Generated
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    <div ref={quotationRef} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-sm">

                        {/* Quotation Content Design */}
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <div className="text-2xl font-black text-blue-600 tracking-tight">LaundryHub</div>
                                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mt-1">Order Quotation</p>
                            </div>
                            <div className="text-right">
                                <h2 className="text-base font-bold text-slate-900">#{data.id}</h2>
                                <p className="text-slate-500">{new Date().toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex justify-between mb-8 p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div>
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Customer</span>
                                <span className="block font-semibold text-slate-900">{data.userName || 'Guest User'}</span>
                                <span className="block text-slate-500">{data.userEmail}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs font-bold text-slate-400 uppercase mb-1">Service Type</span>
                                <span className="block font-semibold text-blue-600 px-2 py-0.5 bg-blue-50 rounded-md inline-block">{data.service}</span>
                            </div>
                        </div>

                        <table className="w-full mb-8">
                            <thead>
                                <tr className="border-b-2 border-slate-100">
                                    <th className="text-left py-3 text-xs font-bold text-slate-400 uppercase">Description</th>
                                    <th className="text-center py-3 text-xs font-bold text-slate-400 uppercase">Qty</th>
                                    <th className="text-right py-3 text-xs font-bold text-slate-400 uppercase">Unit Price</th>
                                    <th className="text-right py-3 text-xs font-bold text-slate-400 uppercase">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="text-slate-700">
                                    <td className="py-4 font-medium">Laundry Service</td>
                                    <td className="text-center py-4 text-slate-500">{data.items}</td>
                                    <td className="text-right py-4">LKR {data.unitPrice.toFixed(2)}</td>
                                    <td className="text-right py-4 font-medium text-slate-900">LKR {data.total.toFixed(2)}</td>
                                </tr>
                            </tbody>
                            <tfoot className="border-t border-slate-100">
                                <tr>
                                    <td colSpan="3" className="pt-6 text-right font-bold text-slate-900">Total Amount</td>
                                    <td className="pt-6 text-right font-black text-2xl text-blue-600">LKR {data.total.toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <p className="text-center text-xs text-slate-400 mt-8">
                            Valid for 24 hours. Prices are subject to final weighing/counting upon pickup.
                        </p>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 flex gap-3 bg-white">
                    <button
                        onClick={handlePrint}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        Print
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-200 transition-all"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Layout ---

const LaundryDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isQuotationOpen, setIsQuotationOpen] = useState(false);
    const [quotationData, setQuotationData] = useState(null);
    const [userOrders, setUserOrders] = useState([]);

    // Load Live Data
    useEffect(() => {
        const loadRequests = () => {
            if (user?.id) {
                const orders = orderService.getOrdersByCustomer(user.id)
                    .sort((a, b) => new Date(b.pickupDate) - new Date(a.pickupDate));
                setUserOrders(orders);
            }
        };

        loadRequests();
        const interval = setInterval(loadRequests, 5000); // Poll for real-time updates
        return () => clearInterval(interval);
    }, [user?.id]);


    const stats = {
        totalOrders: userOrders.length,
        activeOrders: userOrders.filter(o => ['Placed', 'Picked Up', 'Cleaning', 'Sorting', 'Washing', 'Drying', 'Folding', 'Ready', 'Out for Delivery'].includes(o.status)).length,
        completedOrders: userOrders.filter(o => o.status === 'Delivered').length,
        totalSpent: user?.totalSpent || userOrders.reduce((sum, order) => sum + order.totalAmount, 0)
    };

    const recentOrders = userOrders.map(order => ({
        id: order.id,
        service: order.items[0]?.service || 'Multiple Services',
        items: order.items.reduce((sum, item) => sum + item.quantity, 0),
        total: order.totalAmount,
        status: order.status,
        date: new Date(order.pickupDate).toLocaleDateString(),
        pickup: new Date(order.pickupDate).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
        progress: order.progress,
        deliveryDate: order.deliveryDate
    }));

    const activeOrders = recentOrders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).slice(0, 1);

    const handleOrderSubmit = (formData) => {
        // Price Calculation Logic
        const basePrice = {
            'Wash & Fold': 450.0,
            'Dry Cleaning': 1500.0,
            'Ironing Only': 600.0,
            'Household Items': 2400.0
        }[formData.service] || 450.0;

        const itemCount = Number(formData.items);
        const total = basePrice * itemCount;

        const newQuotation = {
            id: `QT-${Math.floor(Math.random() * 10000)}`,
            service: formData.service,
            items: itemCount,
            unitPrice: basePrice,
            total: total,
            userName: user?.name,
            userEmail: user?.email,
            date: new Date().toISOString()
        };

        setQuotationData(newQuotation);
        setIsOrderModalOpen(false);
        setIsQuotationOpen(true);
        // In a real app, we would save the order here too if user confirms
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            {/* Top Navigation */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent hidden sm:block">
                                LaundryHub
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="hidden sm:flex flex-col items-end mr-2">
                                <span className="text-sm font-bold text-slate-800">{user?.name || 'Guest'}</span>
                                <span className="text-xs text-slate-500 font-medium">{user?.email}</span>
                            </div>
                            <button
                                onClick={() => { logout(); navigate('/'); }}
                                className="p-2.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Action Row */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
                        <p className="text-slate-500 mt-2 font-medium">Welcome back! manage your orders and profile.</p>
                    </div>
                    <button
                        onClick={() => setIsOrderModalOpen(true)}
                        className="group flex items-center justify-center gap-2.5 bg-slate-900 text-white px-7 py-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:translate-y-[-2px] active:translate-y-[1px]"
                    >
                        <div className="bg-white/20 p-1 rounded-lg group-hover:bg-white/30 transition-colors">
                            <Plus className="w-5 h-5" />
                        </div>
                        <span className="font-bold">New Order</span>
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="flex space-x-2 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 w-fit mb-10 mx-auto md:mx-0 overflow-x-auto max-w-full">
                    {[
                        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                        { id: 'orders', label: 'My Orders', icon: ShoppingBag },
                        { id: 'profile', label: 'Profile', icon: User },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap
                                ${activeTab === tab.id
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                }
                            `}
                        >
                            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'opacity-100' : 'opacity-70'}`} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                    {activeTab === 'overview' && (
                        <OverviewTab stats={stats} recentOrders={recentOrders} setActiveTab={setActiveTab} activeOrders={activeOrders} />
                    )}
                    {activeTab === 'orders' && (
                        <OrdersTab recentOrders={recentOrders} />
                    )}
                    {activeTab === 'profile' && (
                        <ProfileTab user={user} />
                    )}
                </div>
            </div>

            {/* Modals */}
            <NewOrderModal
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                onSubmit={handleOrderSubmit}
            />
            <QuotationModal
                isOpen={isQuotationOpen}
                onClose={() => setIsQuotationOpen(false)}
                data={quotationData}
            />
        </div>
    );
};

export default LaundryDashboard;
