const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // constants
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;
    // connect to server
    MongoClient.connect(this.url, (err, client) => {
      if (err) {
        console.log(err);
      }
      this.client = client;
      console.log('Connected successfully to server');
      this.db = this.client.db(this.database);
    });
  }

  isAlive() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    const usersCollection = await this.db.collection('users');
    usersCollection.find({}).toArray((err, docs) => docs.length);
  }

  async nbFiles() {
    const filesCollection = await this.db.collection('files');
    filesCollection.find({}).toArray((err, docs) => docs.length);
  }
}

const dbClient = new DBClient();
module.exports = dbClient;