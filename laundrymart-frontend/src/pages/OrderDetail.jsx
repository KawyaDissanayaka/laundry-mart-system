import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { mockOrders } from '../data/mockOrders';
import Badge from '../components/common/Badge';

export default function OrderDetail() {
    const { id } = useParams();
    const order = mockOrders.find(o => o.id === id) || mockOrders[0]; // Fallback to first for demo

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Order Details {order.id}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
                            <Badge status={order.status} />
                        </div>
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                                    <div>
                                        <p className="font-medium text-gray-900">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.service}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">x{item.quantity}</p>
                                        <p className="text-sm text-gray-500">LKR {item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-4 font-bold text-lg">
                                <span>Total Amount</span>
                                <span>LKR {order.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Delivery Timeline</h2>
                        <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-green-500 ring-4 ring-white"></div>
                                <h3 className="text-sm font-bold text-gray-900">Order Placed</h3>
                                <p className="text-xs text-gray-500 mt-1">Oct 24, 2025 - 10:30 AM</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 ring-4 ring-white"></div>
                                <h3 className="text-sm font-bold text-gray-900">Picked Up</h3>
                                <p className="text-xs text-gray-500 mt-1">Oct 24, 2025 - 12:45 PM</p>
                                <div className="mt-2 text-sm bg-gray-50 p-2 rounded text-gray-600">
                                    Picked up by <strong>Kasun Rajapaksa</strong>
                                </div>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gray-200 ring-4 ring-white"></div>
                                <h3 className="text-sm font-bold text-gray-400">In Cleaning</h3>
                                <p className="text-xs text-gray-400 mt-1">Pending</p>
                            </div>
                            <div className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gray-200 ring-4 ring-white"></div>
                                <h3 className="text-sm font-bold text-gray-400">Ready for Delivery</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    {/* Customer Info */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Customer</h2>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                    {order.customerName.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{order.customerName}</p>
                                    <p className="text-xs text-gray-500">ID: {order.customerId}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="h-4 w-4" />
                                <span>customer@example.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Location</h2>
                        <div className="flex items-start gap-2 text-sm text-gray-600 mb-4">
                            <MapPin className="h-4 w-4 mt-1 shrink-0" />
                            <p>{order.address}</p>
                        </div>
                        {/* Map Placeholder */}
                        <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
                            <span className="text-gray-400 text-sm font-medium z-10 flex items-center gap-2">
                                <MapPin className="h-4 w-4" /> Map View Mockup
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
