import React, { useState } from 'react';
import { createOrder } from '../services/api';

const CustomerDashboard = () => {
  const [orderDetails, setOrderDetails] = useState('');
  const [message, setMessage] = useState('');

  const handleOrder = async () => {
    if (!orderDetails.trim()) {
      setMessage('Please enter order details');
      return;
    }

    try {
      await createOrder({ details: orderDetails });
      setMessage('Order placed successfully!');
      setOrderDetails('');
    } catch (err) {
      setMessage('Failed to place order. Try again.');
    }
  };

  return (
    <div className="container text-center mt-2">
      <h1>Customer Dashboard</h1>
      <div className="mt-2">
        <h2>Place a New Order</h2>
        <textarea
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
          placeholder="e.g., 5 shirts, 2 pants, 1 bedsheet..."
          rows="4"
          style={{ width: '100%', maxWidth: '600px', padding: '12px', margin: '10px 0' }}
        />
        <br />
        <button onClick={handleOrder}>Place Order</button>
      </div>
      {message && <p className="mt-2" style={{ color: message.includes('success') ? 'lightgreen' : 'salmon' }}>
        {message}
      </p>}
      {/* Future: List of orders */}
    </div>
  );
};

export default CustomerDashboard;