# Ecommerce Store with Stripe Payment Integration

A full-stack ecommerce application built with Node.js, Express, MongoDB, React, and Stripe payment integration.

## Features

### Backend Features
- **User Authentication**: JWT-based authentication with registration and login
- **Product Management**: CRUD operations for products with Stripe integration
- **Order Management**: Complete order lifecycle with status tracking
- **Payment Processing**: Secure payment processing with Stripe Checkout
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API with proper error handling

### Frontend Features
- **Modern UI**: Responsive design with modern styling
- **Product Catalog**: Browse products with search and filtering
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Login/register with profile management
- **Checkout Process**: Secure Stripe payment integration
- **Order History**: View past orders with detailed information
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Stripe** - Payment processing
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Stripe.js** - Stripe client library
- **React Toastify** - Notifications
- **CSS3** - Styling

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Stripe Account** (for payment processing)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-stripe-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Environment Configuration**
   
   Create a `config.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/ecommerce-stripe
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

5. **Stripe Configuration**
   
   - Sign up for a Stripe account at [stripe.com](https://stripe.com)
   - Get your test API keys from the Stripe Dashboard
   - Update the `config.env` file with your Stripe keys
   - Update the publishable key in `frontend/src/components/Checkout.js`

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Mode

1. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (admin)
- `PUT /api/orders/:id/cancel` - Cancel order

### Payments
- `POST /api/payments/create-checkout-session` - Create Stripe checkout session
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/payments/payment-intent/:id` - Get payment intent status

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  stripeCustomerId: String
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  stripeProductId: String,
  stripePriceId: String
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  products: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentStatus: String,
  orderStatus: String,
  stripePaymentIntentId: String,
  stripeSessionId: String
}
```

## Stripe Integration

The application uses Stripe Checkout for secure payment processing:

1. **Product Creation**: When a product is created, it's also created in Stripe
2. **Checkout Session**: Creates a Stripe checkout session for payment
3. **Webhook Handling**: Processes successful payments and updates order status
4. **Customer Management**: Creates Stripe customers for recurring payments

## Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Proper CORS setup for security
- **Environment Variables**: Sensitive data stored in environment variables

## Testing

### Test Cards (Stripe Test Mode)
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Vercel, or AWS
3. Configure MongoDB connection (local or cloud)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `build` folder to platforms like Netlify, Vercel, or AWS S3
3. Update API endpoints to point to your deployed backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.

## Acknowledgments

- Stripe for payment processing
- MongoDB for database
- React team for the amazing framework
- Express.js for the backend framework 