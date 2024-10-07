import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
dotenv.config();

const app = express();

app.use(express.json());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const database = client.db('tusharlearn');
const collection = database.collection('assignment');

app.post('/addData', async (req, res) => {
  try {
    const newData = req.body;
    
    if (!newData) {
      return res.status(400).json({ message: 'No data provided' });
    }
    
    const result = await collection.insertOne(newData);
    
    if (result.acknowledged) {
      res.status(201).json({ message: 'Data added successfully', id: result.insertedId });
    } else {
      throw new Error('Data insertion failed');
    }
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
app.get('/getData', async (req, res) => {
  try {
    const data = await collection.find({}).toArray();

    if (data.length > 0) {
      res.status(200).json(data); 
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
