const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

function getStatus() {
  if (redisClient.isAlive() === true && dbClient.isAlive() === true) {
    //console.log({"redis": true, "db": true});
    return {"redis": true, "db": true};
  }
}

function getStats() {
  if (dbClient.isAlive() === true) {
    const newObject = {};
    async function a(newObject) {
      newObject["users"] = `${await dbClient.nbUsers()}`;
      newObject["files"] = `${await dbClient.nbFiles()}`;
      return newObject;
    };
    //console.log(newObject);
    return a(newObject);//newObject;
  }
}


module.exports = getStatus;
module.exports = getStats;
