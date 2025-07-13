import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map(product => product.category))];

  const handleAddToCart = (product) => {
    addToCart(product, 1);
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
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>All Products</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1, minWidth: '200px' }}
            className="form-group"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="form-group"
            style={{ minWidth: '150px' }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="card">
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
              <p style={{ color: '#666', marginBottom: '0.5rem' }}>{product.description}</p>
              <p style={{ color: '#007bff', fontWeight: 'bold', marginBottom: '1rem' }}>
                ${product.price}
              </p>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                Stock: {product.stock} units
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/product/${product._id}`} className="btn btn-secondary" style={{ flex: 1 }}>
                  View Details
                </Link>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary"
                  disabled={product.stock === 0}
                  style={{ flex: 1 }}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products; 