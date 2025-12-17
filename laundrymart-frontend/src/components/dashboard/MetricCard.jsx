import React from 'react';
import clsx from 'clsx';

export default function MetricCard({ title, value, icon, trend, color, subValue }) {
    const colorStyles = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
                    {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
                </div>
                <div className={clsx("p-3 rounded-lg", colorStyles[color] || colorStyles.blue)}>
                    {icon ? React.createElement(icon, { className: 'h-6 w-6' }) : null}
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={clsx("font-medium", trend >= 0 ? "text-green-600" : "text-red-600")}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                    <span className="text-gray-400 ml-2">from last month</span>
                </div>
            )}
        </div>
    );
}
