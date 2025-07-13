import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const stripePromise = loadStripe('pk_test_51RkKTmGhoQwSZsBqSnLsao9HN32DJj2WhZ5BNev3Ow0SAV8sBOuq2D63dsPA7MFQTs0hQarFBRrJXX5k6IFM88Sc00k4couvAW');

const Checkout = () => {
    const { user, isAuthenticated } = useAuth();
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    console.log(cart, "CART");
    console.log(user._id, "user");

    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [loading, setLoading] = useState(false);

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleInputChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = async () => {
        if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
            alert('Please fill in all shipping address fields');
            return;
        }

        setLoading(true);
        try {
            const stripe = await stripePromise;


            const response = await axios.post('/api/payments/create-checkout-session', {
                products: cart.map(item => ({
                    productId: item.product._id,
                    quantity: item.quantity
                })),
                userId: user._id,
                shippingAddress
            });

            const { url } = response.data;

            // Redirect to Stripe Checkout
            window.location.href = url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Error creating checkout session. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <h2>Order Summary</h2>
                    <div className="card">
                        {cart.map(item => (
                            <div key={item.product._id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid #eee'
                            }}>
                                <div>
                                    <h4>{item.product.name}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                        <div style={{
                            borderTop: '2px solid #007bff',
                            paddingTop: '1rem',
                            marginTop: '1rem',
                            textAlign: 'right'
                        }}>
                            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>Shipping Address</h2>
                    <div className="card">
                        <div className="form-group">
                            <label>Street Address</label>
                            <input
                                type="text"
                                name="street"
                                value={shippingAddress.street}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={shippingAddress.city}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>State/Province</label>
                            <input
                                type="text"
                                name="state"
                                value={shippingAddress.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>ZIP/Postal Code</label>
                            <input
                                type="text"
                                name="zipCode"
                                value={shippingAddress.zipCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input
                                type="text"
                                name="country"
                                value={shippingAddress.country}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="btn btn-success"
                        style={{ width: '100%', marginTop: '1rem' }}
                    >
                        {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 