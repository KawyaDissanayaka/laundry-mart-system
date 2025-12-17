export const mockDrivers = [
    {
        id: 'DRV-001',
        name: 'Kasun Rajapaksa',
        status: 'Available', // Available, Busy, Offline
        currentLocation: { lat: 40.7128, lng: -74.0060 },
        vehicle: 'Van (Ford Transit)',
        phone: '076 111 2222',
        totalDeliveries: 154,
        rating: 4.8
    },
    {
        id: 'DRV-002',
        name: 'Dilini Wickramasinghe',
        status: 'Busy',
        currentLocation: { lat: 40.7300, lng: -73.9950 },
        vehicle: 'Scooter',
        phone: '072 333 4444',
        totalDeliveries: 89,
        rating: 4.9
    },
    {
        id: 'DRV-003',
        name: 'Tharindu Jayawardena',
        status: 'Offline',
        currentLocation: { lat: 40.7500, lng: -73.9800 },
        vehicle: 'Bike',
        phone: '078 555 6666',
        totalDeliveries: 42,
        rating: 4.5
    }
];
