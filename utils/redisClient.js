import redis from 'redis';

const redisClient = redis.createClient({
  host: 'localhost', // Zaktualizuj, jeśli używasz innego hosta
  port: 6379, // Zaktualizuj, jeśli używasz innego portu
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisClient;
