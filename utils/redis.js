import { createClient } from 'redis';

const util = require('util');

// const createClient = redis.createClient;

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(err);
    });
    this.client.get = util.promisify(this.client.get);
    this.client.set = util.promisify(this.client.set);
    this.client.del = util.promisify(this.client.del);
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  async set(key, value, timeToExpiry) {
    await this.client.set(key, value, 'EX', timeToExpiry);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
