import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateOrder() {
    const location = useLocation();
    const [items, setItems] = useState([{ name: '', service: 'Wash & Fold', quantity: 1, price: 0 }]);

    useEffect(() => {
        if (location.state?.serviceName) {
            setItems([{ name: '', service: location.state.serviceName, quantity: 1, price: 0 }]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const addItem = () => {
        setItems([...items, { name: '', service: 'Wash & Fold', quantity: 1, price: 0 }]);
    };

    const handleCreateOrder = () => {
        // Simple validation
        if (!items.some(i => i.name)) {
            alert("Please add at least one item name.");
            return;
        }

        const customerName = "Alice Johnson"; // Mock customer
        const serviceName = items[0].service;

        // Simulate API call
        setTimeout(() => {
            alert(`Order successfully placed for ${customerName}!\nService: ${serviceName}\nYour order has been linked.`);
            // In a real app, navigate to order list or dashboard
            // navigate('/admin/orders'); 
        }, 500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Create New Order</h1>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Customer</label>
                        <select className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                            <option>Alice Johnson</option>
                            <option>Bob Smith</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
                        <input type="datetime-local" className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup/Delivery Address</label>
                        <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" rows="2" placeholder="Enter full address"></textarea>
                    </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 mb-4">Laundry Items</h2>
                <div className="space-y-4 mb-6">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-end bg-gray-50 p-4 rounded-lg">
                            <div className="flex-1">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Item Name</label>
                                <input type="text"
                                    placeholder="e.g. Shirt"
                                    className="w-full border border-gray-200 rounded px-2 py-1"
                                    value={item.name}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[idx].name = e.target.value;
                                        setItems(newItems);
                                    }}
                                />
                            </div>
                            <div className="w-40">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Service</label>
                                <select
                                    className="w-full border border-gray-200 rounded px-2 py-1"
                                    value={item.service}
                                    onChange={(e) => {
                                        const newItems = [...items];
                                        newItems[idx].service = e.target.value;
                                        setItems(newItems);
                                    }}
                                >
                                    <option>Wash & Fold</option>
                                    <option>Dry Cleaning</option>
                                    <option>Wash Dry And Iron</option>
                                    <option>Iron Only</option>
                                </select>
                            </div>
                            <div className="w-20">
                                <label className="block text-xs font-medium text-gray-500 mb-1">Qty</label>
                                <input type="number" defaultValue={1} className="w-full border border-gray-200 rounded px-2 py-1" />
                            </div>
                        </div>
                    ))}
                    <button onClick={addItem} className="text-sm text-blue-600 font-medium hover:text-blue-700">
                        + Add Another Item
                    </button>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        onClick={handleCreateOrder}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
                    >
                        <Save className="h-4 w-4" />
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}
