import React from 'react';
import clsx from 'clsx';
import { ORDER_STATUSES } from '../../data/mockOrders';

export default function Badge({ status }) {
    const styles = {
        [ORDER_STATUSES.PLACED]: 'bg-yellow-100 text-yellow-800',
        [ORDER_STATUSES.PICKED_UP]: 'bg-blue-100 text-blue-800',
        [ORDER_STATUSES.CLEANING]: 'bg-purple-100 text-purple-800',
        [ORDER_STATUSES.READY]: 'bg-indigo-100 text-indigo-800',
        [ORDER_STATUSES.OUT_FOR_DELIVERY]: 'bg-orange-100 text-orange-800',
        [ORDER_STATUSES.DELIVERED]: 'bg-green-100 text-green-800',
        [ORDER_STATUSES.CANCELLED]: 'bg-red-100 text-red-800',

        // Driver statuses
        'Available': 'bg-green-100 text-green-800',
        'Busy': 'bg-blue-100 text-blue-800',
        'Offline': 'bg-gray-100 text-gray-800',
    };

    return (
        <span className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", styles[status] || 'bg-gray-100 text-gray-800')}>
            {status}
        </span>
    );
}
