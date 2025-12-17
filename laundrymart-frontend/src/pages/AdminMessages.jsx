import React, { useState, useEffect } from 'react';
import { Mail, Search, Check, Trash2, User, Clock, AlertCircle } from 'lucide-react';
import { mockMessages } from '../data/mockMessages';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Load messages from Local Storage if available, else use mock data
        const savedMessages = localStorage.getItem('laundry_messages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        } else {
            setMessages(mockMessages);
        }
    }, []);

    const markAsRead = (id) => {
        const updatedMessages = messages.map(msg =>
            msg.id === id ? { ...msg, status: 'Read' } : msg
        );
        setMessages(updatedMessages);
        localStorage.setItem('laundry_messages', JSON.stringify(updatedMessages));
    };

    const deleteMessage = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            const updatedMessages = messages.filter(msg => msg.id !== id);
            setMessages(updatedMessages);
            localStorage.setItem('laundry_messages', JSON.stringify(updatedMessages));
        }
    };

    const filteredMessages = messages.filter(msg => {
        const matchesFilter = filter === 'All' || msg.status === filter;
        const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Messages</h1>

                {/* Search & Filter */}
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Messages</option>
                        <option value="New">New</option>
                        <option value="Read">Read</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {filteredMessages.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                        {filteredMessages.map((msg) => (
                            <div key={msg.id} className={`p-6 hover:bg-slate-50 transition-colors ${msg.status === 'New' ? 'bg-blue-50/30' : ''}`}>
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {msg.status === 'New' && (
                                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-bold">New</span>
                                            )}
                                            <h3 className={`text-lg text-slate-900 ${msg.status === 'New' ? 'font-bold' : 'font-semibold'}`}>
                                                {msg.subject}
                                            </h3>
                                            <span className="text-slate-400 text-xs">• {new Date(msg.date).toLocaleString()}</span>
                                        </div>

                                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                                            {msg.message}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                                            <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg">
                                                <User className="w-3.5 h-3.5" />
                                                {msg.name} ({msg.email})
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                ID: {msg.id}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {msg.status === 'New' && (
                                            <button
                                                onClick={() => markAsRead(msg.id)}
                                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors tooltip"
                                                title="Mark as Read"
                                            >
                                                <Check className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Message"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-500">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No messages found</h3>
                        <p className="text-sm">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
