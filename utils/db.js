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
    MongoClient.connect(this.url, {useUnifiedTopology: true},  (err, client) => {
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
    //const usersCollection = await this.client.collection('users');
    /*
    usersCollection.find({}).toArray((err, docs) => {
      if (!err) {
        // console.log(docs);
	console.log(docs.length);
        return (docs.length)
      }
    });*/
    //return usersCollection.find({}).toArray().length;
    return usersCollection.estimatedDocumentCount();
  }

  async nbFiles() {
    let return_value = 0;
    const filesCollection = await this.db.collection('files');
    //const filesCollection = await this.client.collection('files');
    /*filesCollection.find({}).toArray((err, docs) => {
      if (!err) {
        console.log(docs.length);
        return_value = docs.length;
      }
    });
    return return_value;*/
    /*filesCollection.find({}).toArray((err, docs) => {
      return_value = return_value + Object.keys(docs).length;
      return return_value;
    });*/
    //return return_value;
    return filesCollection.estimatedDocumentCount();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
