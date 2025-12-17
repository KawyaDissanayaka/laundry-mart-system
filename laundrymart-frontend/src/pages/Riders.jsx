import React, { useState } from 'react';
import { Truck, Phone, Star, DollarSign, Plus, Edit2, Trash2 } from 'lucide-react';
import { mockDrivers } from '../data/mockDrivers';
import Badge from '../components/common/Badge';

export default function Riders() {
    // Enrich mock data with salary if not present
    const initialDrivers = mockDrivers.map(d => ({ ...d, salary: d.salary || 85000 }));

    const [drivers, setDrivers] = useState(initialDrivers);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDriver, setEditingDriver] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        salary: '',
        status: 'Available',
        rating: 5.0,
        totalDeliveries: 0,
        currentLocation: { lat: 0, lng: 0 }
    });

    const handleOpenModal = (driver = null) => {
        if (driver) {
            setEditingDriver(driver);
            setFormData(driver);
        } else {
            setEditingDriver(null);
            setFormData({
                name: '',
                phone: '',
                salary: '',
                status: 'Available',
                rating: 5.0,
                totalDeliveries: 0,
                currentLocation: { lat: 40.7128, lng: -74.0060 }
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingDriver) {
            setDrivers(drivers.map(d => d.id === editingDriver.id ? { ...formData, id: d.id } : d));
        } else {
            const newDriver = {
                ...formData,
                id: `RID-00${drivers.length + 1}`,
                salary: Number(formData.salary)
            };
            setDrivers([...drivers, newDriver]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this rider?')) {
            setDrivers(drivers.filter(d => d.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Rider Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add New Rider
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map((driver) => (
                    <div key={driver.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Truck className="h-6 w-6 text-gray-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{driver.name}</h3>
                                        <p className="text-xs text-gray-500">ID: {driver.id}</p>
                                    </div>
                                </div>
                                <Badge status={driver.status} />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    {driver.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <DollarSign className="h-4 w-4 text-gray-400" />
                                    Salary: LKR {Number(driver.salary).toLocaleString()}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    {driver.rating} Rating
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-medium">{driver.totalDeliveries} Deliveries</span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenModal(driver)} className="text-blue-600 hover:text-blue-700"><Edit2 className="h-4 w-4" /></button>
                                <button onClick={() => handleDelete(driver.id)} className="text-red-600 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {editingDriver ? 'Edit Rider' : 'Add New Rider'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Salary (Monthly)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        className="w-full border rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.salary}
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option>Available</option>
                                    <option>Busy</option>
                                    <option>Offline</option>
                                </select>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    {editingDriver ? 'Save Changes' : 'Add Rider'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
