// server.js



require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // set this in .env

// (Optional) quick sanity check — remove after it prints true once
console.log('ENV MONGO_URI loaded?', Boolean(MONGO_URI));




mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    start();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    // Start server anyway so EJS pages render while you fix DB creds
    start();
  });

function start() {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
