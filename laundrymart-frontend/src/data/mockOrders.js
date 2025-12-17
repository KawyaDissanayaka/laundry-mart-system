export const mockOrders = [
    {
        id: 'ORD-001',
        customerId: 'CUST-001',
        customerName: 'Amaya Gunasekara',
        items: [
            { name: 'Men\'s Shirt', service: 'Wash & Iron', quantity: 5, price: 750.00 },
            { name: 'Trousers', service: 'Dry Clean', quantity: 2, price: 1500.00 }
        ],
        totalAmount: 6750.00,
        status: 'Cleaning', // Placed, Picked Up, Cleaning, Ready, Out for Delivery, Delivered
        pickupDate: '2025-12-14T09:00:00',
        deliveryDate: '2025-12-16T18:00:00',
        driverId: 'DRV-001', // Kasun Rajapaksa
        staffId: 'EMP-001', // Sarah Wilson (Washer)
        address: 'No. 45, Galle Road, Colombo 03',
    },
    {
        id: 'ORD-002',
        customerId: 'CUST-002',
        customerName: 'Ravindu Bandara',
        items: [
            { name: 'Comforter (King)', service: 'Wash & Fold', quantity: 1, price: 4500.00 }
        ],
        totalAmount: 4500.00,
        status: 'Placed',
        pickupDate: '2025-12-13T14:00:00',
        deliveryDate: '2025-12-15T10:00:00',
        driverId: null,
        staffId: null, // Not yet assigned to staff
        address: 'No. 78, Kandy Road, Kadawatha',
    },
    {
        id: 'ORD-003',
        customerId: 'CUST-001',
        customerName: 'Amaya Gunasekara',
        items: [
            { name: 'Bed Sheets', service: 'Wash & Iron', quantity: 4, price: 900.00 }
        ],
        totalAmount: 3600.00,
        status: 'Delivered',
        pickupDate: '2025-12-10T09:00:00',
        deliveryDate: '2025-12-12T17:00:00',
        driverId: 'DRV-002', // Dilini Wickramasinghe
        staffId: 'EMP-002', // Mike Johnson (Quality Control - verified final step)
        address: 'No. 45, Galle Road, Colombo 03',
    }
];

export const ORDER_STATUSES = {
    PLACED: 'Placed',
    PICKED_UP: 'Picked Up',
    CLEANING: 'Cleaning',
    READY: 'Ready',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
};
