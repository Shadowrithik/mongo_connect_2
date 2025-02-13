require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const port = process.env.PORT || 3010;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json()); // Parse JSON data

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) =>
    console.error('❌ Error connecting to database:', err.message)
  );

// 🟢 POST API: Add User
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create User
    const newUser = new User({ username, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: '✅ User created successfully', user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: '❌ Error adding user', details: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
