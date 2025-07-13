import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setFeaturedProducts(response.data.slice(0, 6)); // Show first 6 products
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
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
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Welcome to Our Ecommerce Store
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Discover amazing products with secure Stripe payments
        </p>
        <Link to="/products" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '12px 30px' }}>
          Shop Now
        </Link>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Products</h2>
      
      <div className="grid">
        {featuredProducts.map(product => (
          <div key={product._id} className="card" style={{ textAlign: 'center' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            />
            <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>${product.price}</p>
            <Link to={`/product/${product._id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link to="/products" className="btn btn-secondary">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Home; 