const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: '../config.env' });

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    stock: 50
  },
  {
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and water resistance. Track your workouts and health metrics.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics",
    stock: 30
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and sustainable cotton t-shirt made from 100% organic materials. Available in multiple colors and sizes.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Clothing",
    stock: 100
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Eco-friendly water bottle with double-wall insulation. Keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    category: "Home & Garden",
    stock: 75
  },
  {
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
    category: "Electronics",
    stock: 40
  },
  {
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots and RFID protection. Classic design for everyday use.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    category: "Accessories",
    stock: 60
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 360-degree sound and 20-hour battery life. Perfect for outdoor activities.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    category: "Electronics",
    stock: 35
  },
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat made from eco-friendly materials. Perfect thickness for comfort and stability during practice.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
    category: "Sports",
    stock: 80
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${products.length} products`);

    // Display seeded products
    products.forEach(product => {
      console.log(`- ${product.name}: $${product.price}`);
    });

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedProducts(); 