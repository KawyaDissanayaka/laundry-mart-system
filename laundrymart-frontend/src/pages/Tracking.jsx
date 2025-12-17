import React from 'react';
import { MapPin, Navigation, Truck } from 'lucide-react';
import { mockDrivers } from '../data/mockDrivers';
import Badge from '../components/common/Badge';

export default function Tracking() {
    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-center shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Live Delivery Tracking</h1>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span> Available
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-600">
                        <span className="h-3 w-3 rounded-full bg-blue-500"></span> Busy
                    </span>
                </div>
            </div>

            <div className="flex-1 bg-gray-200 rounded-xl relative overflow-hidden border border-gray-300 shadow-inner group">
                {/* Map Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#64748b_2px,transparent_2px)] [background-size:32px_32px]"></div>

                {/* Simulated Map Elements (Roads) */}
                <div className="absolute top-1/2 left-0 w-full h-2 bg-white/50"></div>
                <div className="absolute top-0 left-1/2 w-2 h-full bg-white/50"></div>

                {/* Rider Pins */}
                {mockDrivers.map((driver, idx) => {
                    // Simulate random positions based on lat/lng (mocking logic)
                    const top = (idx * 20 + 20) + '%';
                    const left = (idx * 25 + 15) + '%';

                    return (
                        <div key={driver.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform cursor-pointer" style={{ top, left }}>
                            <div className={`relative flex flex-col items-center`}>
                                <div className={`p-2 rounded-full shadow-lg ${driver.status === 'Busy' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
                                    <Truck className="h-5 w-5" />
                                </div>
                                <div className="absolute top-full mt-1 bg-white px-2 py-1 rounded shadow text-xs font-bold whitespace-nowrap">
                                    {driver.name}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Center Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="p-3 bg-purple-600 text-white rounded-full shadow-xl border-4 border-white">
                        <Navigation className="h-6 w-6" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
                {mockDrivers.slice(0, 3).map(driver => (
                    <div key={driver.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <Truck className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900">{driver.name}</p>
                                <p className="text-xs text-gray-500">{driver.vehicle}</p>
                            </div>
                        </div>
                        <Badge status={driver.status} type="" />
                    </div>
                ))}
            </div>
        </div>
    );
}
