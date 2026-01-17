import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  
  // If MongoDB URI is not provided, use in-memory storage
  if (!mongoURI) {
    console.log('MongoDB URI not provided. Using in-memory storage for users.');
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Falling back to in-memory storage for users.');
  }
};
