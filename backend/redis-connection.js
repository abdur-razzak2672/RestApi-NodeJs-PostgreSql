const redis = require('redis');
const client = redis.createClient(
  {
    host: 'localhost',
    port: 6379,
  }
);  
(async () => {
    await client.connect();
})();
client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));
module.exports = client;