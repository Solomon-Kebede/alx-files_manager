const redis = require('redis');                                                                 
const client = redis.createClient;                                                              
//import { createClient } from 'redis';                                                         
                                                                                                
class RedisClient {                                                                             
  constructor() {                                                                               
    this.client = createClient();                                                               
    this.client.on('error', (err) => {                                                          
      console.log(err);                                                                         
    });
    console.log('Hi');
  }

  isAlive() {
    this.client.on('connect', () => {
      return true;
    });
    return false;
  }
}

/*
class RedisClient {
  constructor() {
    console.log("Hello");
  }
}
*/
const redisClient = new RedisClient();
module.exports = redisClient;
