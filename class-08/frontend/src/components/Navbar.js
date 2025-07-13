import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      background: '#fff',
      padding: '1rem 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Ecommerce Store
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>
            Products
          </Link>
          
          <Link to="/cart" style={{ textDecoration: 'none', color: '#333', position: 'relative' }}>
            Cart
            {getCartCount() > 0 && (
              <span style={{
                background: '#007bff',
                color: 'white',
                borderRadius: '50%',
                padding: '0.2rem 0.5rem',
                fontSize: '0.8rem',
                position: 'absolute',
                top: '-8px',
                right: '-8px'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/orders" style={{ textDecoration: 'none', color: '#333' }}>
                Orders
              </Link>
              <Link to="/profile" style={{ textDecoration: 'none', color: '#333' }}>
                Profile
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" style={{ textDecoration: 'none', color: '#333' }}>
                  Admin
                </Link>
              )}
              <button 
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#333',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>
                Login
              </Link>
              <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 