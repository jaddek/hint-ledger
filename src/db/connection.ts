import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGO_DSN || '', {
    monitorCommands: true
});

client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch((err: any) => console.log(err));

const db = client.db(process.env.MONGO_DB || '');

export default db;