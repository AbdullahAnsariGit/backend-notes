import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'processing':
        return '#007bff';
      case 'shipped':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>My Orders</h1>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order._id} className="card">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #eee'
              }}>
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p style={{ color: '#666' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3>${order.totalAmount.toFixed(2)}</h3>
                  <p style={{ 
                    color: getStatusColor(order.paymentStatus),
                    fontWeight: 'bold'
                  }}>
                    {order.paymentStatus.toUpperCase()}
                  </p>
                  <p style={{ 
                    color: getStatusColor(order.orderStatus),
                    fontWeight: 'bold'
                  }}>
                    {order.orderStatus.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div>
                <h4>Products:</h4>
                {order.products.map(item => (
                  <div key={item._id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #f8f9fa'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{
                          width: '50px',
                          height: '50px',
                          objectFit: 'cover',
                          borderRadius: '5px'
                        }}
                      />
                      <div>
                        <h5>{item.product.name}</h5>
                        <p style={{ color: '#666' }}>Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p style={{ fontWeight: 'bold' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              {order.shippingAddress && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                  <h4>Shipping Address:</h4>
                  <p>
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 