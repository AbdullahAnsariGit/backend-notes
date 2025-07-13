import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Success = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h1 style={{ color: '#28a745', marginBottom: '1rem' }}>Payment Successful!</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Thank you for your purchase. Your order has been confirmed.
        </p>
        {sessionId && (
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            Session ID: {sessionId}
          </p>
        )}
        <p style={{ marginBottom: '2rem' }}>
          You will receive an email confirmation shortly with your order details.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Link to="/orders" className="btn btn-secondary">
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success; 