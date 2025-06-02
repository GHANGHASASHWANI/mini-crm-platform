// backend/config/redisClient.js
const redis = require('redis');
require('dotenv').config();

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD,
});

client.connect()
  .then(() => console.log('✅ Connected to Redis!'))
  .catch((err) => console.error('❌ Redis Connection Error:', err));

module.exports = client;

