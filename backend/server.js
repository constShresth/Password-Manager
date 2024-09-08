import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors())
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'KeyKeep';
client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const collection = db.collection('passwords');


app.get('/', async(req, res)=>{
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async(req, res)=>{
  const password = req.body;
  const insertPassword = await collection.insertOne(password);
  res.json({success: true, result: insertPassword})
})

app.delete('/', async(req, res)=>{
  const password = req.body;
  const deletePassword = await collection.deleteOne(password);
  res.json({success: true, result: deletePassword})
})


app.listen(port,()=>{
  console.log(`Server listening at port ${port}`)
})