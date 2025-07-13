import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
        </div>
        
        <div>
          <h1>{product.name}</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{product.description}</p>
          <p style={{ color: '#007bff', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            ${product.price}
          </p>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Category: {product.category}
          </p>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Stock: {product.stock} units
          </p>
          
          {product.stock > 0 ? (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Quantity:</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-secondary"
                  style={{ padding: '5px 10px' }}
                >
                  -
                </button>
                <span style={{ minWidth: '50px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="btn btn-secondary"
                  style={{ padding: '5px 10px' }}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <p style={{ color: '#dc3545', marginBottom: '1rem' }}>Out of Stock</p>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 