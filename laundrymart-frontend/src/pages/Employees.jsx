import React, { useState } from 'react';
import { Phone, Mail, DollarSign, Plus, Trash2, Edit2 } from 'lucide-react';

import { mockEmployees as initialEmployees } from '../data/mockEmployees';

export default function Employees() {
    const [employees, setEmployees] = useState(initialEmployees);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Washer',
        phone: '',
        salary: '',
        status: 'Active'
    });

    const handleOpenModal = (employee = null) => {
        if (employee) {
            setEditingEmployee(employee);
            setFormData(employee);
        } else {
            setEditingEmployee(null);
            setFormData({
                name: '',
                email: '',
                role: 'Washer',
                phone: '',
                salary: '',
                status: 'Active'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingEmployee) {
            // Edit existing
            setEmployees(employees.map(emp => emp.id === editingEmployee.id ? { ...formData, id: emp.id } : emp));
        } else {
            // Add new
            const newEmployee = {
                ...formData,
                id: `EMP-00${employees.length + 1}`,
                salary: Number(formData.salary)
            };
            setEmployees([...employees, newEmployee]);
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this employee?')) {
            setEmployees(employees.filter(emp => emp.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add New Employee
                </button>
            </div>

            {/* Employee Table - Modern & Responsive */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Position</th>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Salary</th>
                                <th className="px-6 py-4 text-left font-bold text-slate-700 uppercase text-xs tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right font-bold text-slate-700 uppercase text-xs tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.map((employee, index) => (
                                <tr key={employee.id} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${index % 5 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                                index % 5 === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                                                    index % 5 === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                                                        index % 5 === 3 ? 'bg-gradient-to-br from-teal-500 to-teal-600' :
                                                            'bg-gradient-to-br from-orange-500 to-orange-600'
                                                }`}>
                                                {employee.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-base">{employee.name}</div>
                                                <div className="text-xs text-slate-500 font-medium">{employee.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm">
                                            {employee.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Mail className="h-4 w-4 text-slate-400" />
                                                <span className="font-medium">{employee.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Phone className="h-4 w-4 text-slate-400" />
                                                <span className="font-medium">{employee.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900 text-base">
                                            LKR {Number(employee.salary).toLocaleString()}
                                        </div>
                                        <div className="text-xs text-slate-500">per month</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${employee.status === 'Active'
                                            ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
                                            : 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${employee.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                                                }`} />
                                            {employee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(employee)}
                                                className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                                                title="Edit Employee"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(employee.id)}
                                                className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                                                title="Delete Employee"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-slate-100">
                    {employees.map((employee, index) => (
                        <div key={employee.id} className="p-5 hover:bg-slate-50 transition-colors">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md ${index % 5 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                                        index % 5 === 1 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                                            index % 5 === 2 ? 'bg-gradient-to-br from-pink-500 to-pink-600' :
                                                index % 5 === 3 ? 'bg-gradient-to-br from-teal-500 to-teal-600' :
                                                    'bg-gradient-to-br from-orange-500 to-orange-600'
                                        }`}>
                                        {employee.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900">{employee.name}</div>
                                        <div className="text-xs text-slate-500 font-medium">{employee.id}</div>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${employee.status === 'Active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {employee.status}
                                </span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Position</span>
                                    <span className="text-sm font-semibold text-blue-600">{employee.role}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <span>{employee.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    <span>{employee.phone}</span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                    <span className="text-xs font-bold text-slate-500 uppercase">Salary</span>
                                    <span className="text-base font-bold text-slate-900">
                                        LKR {Number(employee.salary).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenModal(employee)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-100 transition-colors"
                                >
                                    <Edit2 className="h-4 w-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(employee.id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-semibold text-sm hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">
                            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option>Washer</option>
                                        <option>Ironer</option>
                                        <option>Driver</option>
                                        <option>Manager</option>
                                        <option>Quality Control</option>
                                        <option>Operations Manager</option>
                                        <option>Lead Specialist</option>
                                        <option>Customer Relations</option>
                                    </select>
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
                                    {editingEmployee ? 'Save Changes' : 'Add Employee'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
