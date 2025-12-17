import React, { useState } from 'react';
import { User, Bell, Lock, Globe, Save } from 'lucide-react';

const SettingsSection = ({ title, icon: Icon, children }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        </div>
        <div className="p-6">
            {children}
        </div>
    </div>
);

const Toggle = ({ label, description, enabled, onChange }) => (
    <div className="flex items-center justify-between py-4">
        <div>
            <h3 className="text-sm font-medium text-gray-900">{label}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
    </div>
);

export default function Settings() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        marketing: false
    });

    const [general, setGeneral] = useState({
        siteName: 'LaundryGo',
        supportEmail: 'support@laundrygo.com',
        timezone: 'UTC-5'
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your application preferences and configurations.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors shadow-lg shadow-gray-200">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            {/* General Settings */}
            <SettingsSection title="General Information" icon={Globe}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
                        <input
                            type="text"
                            value={general.siteName}
                            onChange={(e) => setGeneral({ ...general, siteName: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                        <input
                            type="email"
                            value={general.supportEmail}
                            onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
            </SettingsSection>

            {/* Notifications */}
            <SettingsSection title="Notifications" icon={Bell}>
                <div className="divide-y divide-gray-100">
                    <Toggle
                        label="Email Notifications"
                        description="Receive daily summaries and critical alerts via email."
                        enabled={notifications.email}
                        onChange={(v) => setNotifications({ ...notifications, email: v })}
                    />
                    <Toggle
                        label="Push Notifications"
                        description="Get real-time updates on new orders and driver status."
                        enabled={notifications.push}
                        onChange={(v) => setNotifications({ ...notifications, push: v })}
                    />
                    <Toggle
                        label="SMS Alerts"
                        description="Receive text messages for urgent operational issues."
                        enabled={notifications.sms}
                        onChange={(v) => setNotifications({ ...notifications, sms: v })}
                    />
                </div>
            </SettingsSection>

            {/* Security */}
            <SettingsSection title="Security & Access" icon={Lock}>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl flex items-start justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your admin account.</p>
                        </div>
                        <button className="text-blue-600 text-sm font-bold hover:underline">Enable</button>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-xl flex items-start justify-between">
                        <div>
                            <h3 className="font-medium text-gray-900">Change Password</h3>
                            <p className="text-sm text-gray-500 mt-1">Last changed 3 months ago.</p>
                        </div>
                        <button className="text-gray-600 text-sm font-bold hover:underline">Update</button>
                    </div>
                </div>
            </SettingsSection>

            {/* Profile Info */}
            <SettingsSection title="Admin Profile" icon={User}>
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <User className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Admin User"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                <input
                                    type="text"
                                    defaultValue="Super Admin"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SettingsSection>
        </div>
    );
}
