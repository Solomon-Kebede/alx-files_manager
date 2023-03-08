const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    // constants
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;
    // this.url = `mongodb://${this.host}:${this.port}/${this.database}`;
    // connect to server
    MongoClient.connect(this.url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.log(err);
      }
      this.client = client;
      // console.log('Connected successfully to server');
      this.db = this.client.db(this.database);
    });
  }

  isAlive() {
    return !!this.client && !!this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    const usersCollection = await this.db.collection('users');
    return usersCollection.estimatedDocumentCount();
  }

  async nbFiles() {
    const filesCollection = await this.db.collection('files');
    return filesCollection.estimatedDocumentCount();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
