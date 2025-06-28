const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://admin:1234@cluster0.atfljbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;