import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Cart</h1>
      
      <div className="card">
        {cart.map(item => (
          <div key={item.product._id} style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr auto auto',
            gap: '1rem',
            alignItems: 'center',
            padding: '1rem 0',
            borderBottom: '1px solid #eee'
          }}>
            <img
              src={item.product.image}
              alt={item.product.name}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
            
            <div>
              <h3>{item.product.name}</h3>
              <p style={{ color: '#666' }}>{item.product.description}</p>
              <p style={{ color: '#007bff', fontWeight: 'bold' }}>
                ${item.product.price}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                className="btn btn-secondary"
                style={{ padding: '5px 10px' }}
              >
                -
              </button>
              <span style={{ minWidth: '30px', textAlign: 'center' }}>
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                className="btn btn-secondary"
                style={{ padding: '5px 10px' }}
                disabled={item.quantity >= item.product.stock}
              >
                +
              </button>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="btn btn-secondary"
                style={{ padding: '5px 10px', fontSize: '0.8rem' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <div style={{
          borderTop: '2px solid #007bff',
          paddingTop: '1rem',
          marginTop: '1rem',
          textAlign: 'right'
        }}>
          <h2>Total: ${getCartTotal().toFixed(2)}</h2>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <Link to="/products" className="btn btn-secondary">
          Continue Shopping
        </Link>
        <Link to="/checkout" className="btn btn-success">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart; 