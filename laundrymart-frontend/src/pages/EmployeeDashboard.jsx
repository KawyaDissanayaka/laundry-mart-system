import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LayoutList, Package, CheckSquare, Clock, LogOut, DollarSign, AlertCircle, BarChart3, Calendar, Phone, MapPin, ShoppingBag, Truck, Edit3, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockDrivers } from '../data/mockDrivers';
import { mockCustomers } from '../data/mockCustomers';
import { orderService } from '../services/orderService';

export default function EmployeeDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    // Load tasks from orderService
    useEffect(() => {
        const loadTasks = () => {
            // Get orders for this staff member
            // If user.id is 'EMP-001', we get orders assigned to them
            // Fallback: If no user ID, show all orders for demo purposes if not strictly filtered
            const allOrders = orderService.getAllOrders();
            const myOrders = allOrders.filter(o => o.staffId === user?.id);

            const formattedTasks = myOrders.map(order => {
                const assignedDriver = mockDrivers.find(d => d.id === order.driverId);
                const assignedCustomer = mockCustomers.find(c => c.id === order.customerId);
                return {
                    id: order.id,
                    service: order.items[0]?.service || 'Multiple',
                    items: order.items.reduce((acc, item) => acc + item.quantity, 0),
                    status: order.status,
                    priority: 'Normal', // Could be derived from order data
                    dueIn: '4 hrs', // Mock logic
                    driver: assignedDriver,
                    customer: assignedCustomer,
                    progress: order.progress || { note: 'No updates yet' }
                };
            });
            setTasks(formattedTasks);
        };

        loadTasks();
        // Optional: Poll for updates every 5 seconds to simulate real-time
        const interval = setInterval(loadTasks, 5000);
        return () => clearInterval(interval);
    }, [user?.id, lastUpdated]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleStatusUpdate = (taskId, newStatus) => {
        orderService.updateOrder(taskId, { status: newStatus });
        setLastUpdated(Date.now()); // Trigger re-render
    };

    const [isProfileOpen, setIsProfileOpen] = React.useState(false);
    const [selectedCustomer, setSelectedCustomer] = React.useState(null);
    const [isCustomerModalOpen, setIsCustomerModalOpen] = React.useState(false);

    // Progress Modal State
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [selectedTaskForProgress, setSelectedTaskForProgress] = useState(null);

    const stats = {
        pending: tasks.filter(t => t.status !== 'Delivered').length,
        processed: tasks.filter(t => t.status === 'Ready' || t.status === 'Delivered').length,
        hours: 42,
        salary: 96000
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Header */}
            <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 h-20 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-violet-600 p-2.5 rounded-xl shadow-lg shadow-violet-200 text-white">
                        <LayoutList className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Staff Portal</h1>
                        <p className="text-xs text-slate-500 font-medium">Operations Dashboard</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div
                        className="hidden md:block text-right cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setIsProfileOpen(true)}
                    >
                        <p className="text-sm font-bold text-slate-800">{user?.name || 'Staff Member'}</p>
                        <p className="text-xs text-emerald-600 font-medium flex items-center justify-end gap-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> On Shift
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        title="End Shift / Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Package className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{tasks.length} Active</span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">{stats.pending}</h3>
                        <p className="text-slate-500 text-sm font-medium">Pending Orders</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
                                <CheckSquare className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">{stats.processed}</h3>
                        <p className="text-slate-500 text-sm font-medium">Processed Today</p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-violet-200 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-violet-50 text-violet-600 rounded-lg group-hover:scale-110 transition-transform">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800 mb-1">{stats.hours}h</h3>
                        <p className="text-slate-500 text-sm font-medium">Weekly Hours</p>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-5 rounded-2xl shadow-lg shadow-slate-200 text-white relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <DollarSign className="w-5 h-5 text-emerald-400" />
                            </div>
                            <span className="text-xs font-bold text-emerald-300 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">Current</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1 relative z-10">LKR {stats.salary / 1000}k</h3>
                        <p className="text-slate-400 text-sm font-medium relative z-10">Accrued Salary</p>

                        {/* Decor */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Task Queue */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-violet-600" />
                                Work Queue
                            </h2>
                            <div className="flex gap-2">
                                <span className="bg-white px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 border border-slate-200 shadow-sm">All Tasks</span>
                                <span className="text-slate-400 px-3 py-1.5 text-xs font-semibold hover:text-slate-600 cursor-pointer">High Priority</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div key={task.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group relative overflow-hidden">
                                    {/* Status Stripe */}
                                    {task.priority === 'High' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>}

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform shadow-sm">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="font-bold text-slate-900 text-lg">{task.service}</h3>
                                                    {task.priority === 'High' ? (
                                                        <span className="bg-red-50 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold border border-red-100 flex items-center gap-1">
                                                            <AlertCircle className="w-3 h-3" /> High
                                                        </span>
                                                    ) : (
                                                        <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-bold border border-slate-200">
                                                            Normal
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
                                                    Order <span className="font-mono text-slate-700 bg-slate-100 px-1 rounded">#{task.id}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    {task.items} Items
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* Status Dropdown with color coding */}
                                            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
                                                <select
                                                    className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none px-3 py-1.5 w-full sm:w-32 cursor-pointer"
                                                    value={task.status}
                                                    onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                                                >
                                                    <option>Pending</option>
                                                    <option>Sorting</option>
                                                    <option>Cleaning</option>
                                                    <option value="Ready">Ready</option>
                                                </select>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    setSelectedTaskForProgress(task);
                                                    setIsProgressModalOpen(true);
                                                }}
                                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 p-2.5 rounded-xl transition-colors tooltip"
                                                title="Add Details"
                                            >
                                                <Edit3 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Bar / Details */}
                                    <div className="mt-5 pt-4 border-t border-slate-50 flex flex-wrap gap-4 justify-between items-center text-sm">
                                        <div className="flex items-center gap-6">
                                            {/* Customer Quick View */}
                                            <button
                                                onClick={() => {
                                                    setSelectedCustomer(task.customer);
                                                    setIsCustomerModalOpen(true);
                                                }}
                                                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors group/btn font-medium"
                                            >
                                                <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500 group-hover/btn:bg-indigo-100 group-hover/btn:text-indigo-600">
                                                    {task.customer?.name?.charAt(0) || 'C'}
                                                </div>
                                                View Customer
                                            </button>

                                            {/* Rider Info */}
                                            {task.driver ? (
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Truck className="w-4 h-4 text-slate-400" />
                                                    <span className="text-blue-600 font-semibold text-xs bg-blue-50 px-2 py-0.5 rounded">
                                                        {task.driver.name}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-400 text-xs italic">No rider assigned</span>
                                            )}
                                        </div>

                                        <span className="text-xs text-slate-500 italic max-w-xs truncate">
                                            Latest: {task.progress.note}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
                            <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-slate-400" />
                                Salary Details
                            </h3>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-violet-200 transition-colors">
                                    <p className="text-slate-500 text-xs font-bold uppercase mb-1">Base Salary</p>
                                    <p className="text-xl font-bold text-slate-900">LKR 96,000<span className="text-sm text-slate-400 font-medium">.00</span></p>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-violet-200 transition-colors">
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase mb-1">Overtime Rate</p>
                                        <p className="text-slate-900 font-bold">LKR 750 <span className="text-xs text-slate-400 font-normal">/hr</span></p>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                        <BarChart3 className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Progress Modal */}
            {isProgressModalOpen && selectedTaskForProgress && (
                <ProgressUpdateModal
                    task={selectedTaskForProgress}
                    onClose={() => setIsProgressModalOpen(false)}
                    onUpdate={(details) => {
                        orderService.updateOrderProgress(selectedTaskForProgress.id, details);
                        setLastUpdated(Date.now());
                        setIsProgressModalOpen(false);
                    }}
                />
            )}


            {/* Customer Details Modal */}
            {isCustomerModalOpen && selectedCustomer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCustomerModalOpen(false)}></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="bg-indigo-600 p-6 text-white relative overflow-hidden">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl font-bold">
                                    {selectedCustomer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{selectedCustomer.name}</h3>
                                    <p className="text-indigo-200 text-sm">Valid Customer</p>
                                </div>
                            </div>
                            {/* bg decor */}
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Phone</p>
                                    <p className="text-slate-900 font-medium">{selectedCustomer.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">Address</p>
                                    <p className="text-slate-900 font-medium">{selectedCustomer.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl">
                                <ShoppingBag className="w-5 h-5 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-slate-500 uppercase">History</p>
                                    <p className="text-slate-900 font-medium">{selectedCustomer.totalOrders} Orders • LKR {(selectedCustomer.totalSpent || 0).toLocaleString()}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsCustomerModalOpen(false)}
                                className="w-full mt-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Profile Modal */}
            {
                isProfileOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)}></div>
                        <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="h-24 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
                            <div className="px-8 pb-8">
                                <div className="relative flex justify-center -mt-12 mb-6">
                                    <div className="p-1 bg-white rounded-2xl shadow-lg">
                                        <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center text-3xl font-bold text-slate-400">
                                            {user?.name?.charAt(0)}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
                                    <p className="text-violet-600 font-medium bg-violet-50 inline-block px-3 py-1 rounded-full text-sm mt-2">{user?.role} - {user?.id}</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                                            <Package className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">Email Address</p>
                                            <p className="text-slate-900 font-medium">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                                            <DollarSign className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">Phone Number</p>
                                            <p className="text-slate-900 font-medium">{user?.phone}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm shrink-0">
                                            <BarChart3 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase">Current Metrics</p>
                                            <p className="text-slate-900 font-medium">98% Efficiency • 0 Absences</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsProfileOpen(false)}
                                    className="w-full mt-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    Close Profile
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

const ProgressUpdateModal = ({ task, onClose, onUpdate }) => {
    const [note, setNote] = useState('');
    const [step, setStep] = useState('Processing');
    const [percent, setPercent] = useState(50);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({
            step,
            note: note || 'Update provided',
            completion: percent,
            timestamp: new Date().toISOString()
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md animate-in scale-95 duration-200 overflow-hidden">
                <div className="bg-slate-50 p-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900">Update Progress</h3>
                    <button onClick={onClose}><X className="w-5 h-5 text-slate-400 hover:text-red-500" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-4">
                        <p className="text-sm font-semibold text-blue-800">Order #{task.id}</p>
                        <p className="text-xs text-blue-600">{task.service} - {task.items} Items</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Completion Percentage</label>
                        <input
                            type="range"
                            min="0" max="100" step="10"
                            value={percent}
                            onChange={(e) => setPercent(e.target.value)}
                            className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-slate-500 mt-1 font-medium">
                            <span>Started (0%)</span>
                            <span className="text-blue-600 font-bold">{percent}%</span>
                            <span>Finished (100%)</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Stage</label>
                        <select
                            value={step}
                            onChange={(e) => setStep(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Sorting</option>
                            <option>Washing - Cycle 1</option>
                            <option>Washing - Cycle 2</option>
                            <option>Drying</option>
                            <option>Folding</option>
                            <option>Quality Check</option>
                            <option>Ironing</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Remarks</label>
                        <textarea
                            rows="2"
                            placeholder="e.g. Added softner, stain removed..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-2">
                        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-200">
                            Update Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
