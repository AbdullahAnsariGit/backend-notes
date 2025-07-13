import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
        <h1 style={{ color: '#dc3545', marginBottom: '1rem' }}>Payment Cancelled</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Your payment was cancelled. No charges were made to your account.
        </p>
        <p style={{ marginBottom: '2rem' }}>
          You can try again or contact our support team if you need assistance.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/cart" className="btn btn-primary">
            Return to Cart
          </Link>
          <Link to="/" className="btn btn-secondary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel; 