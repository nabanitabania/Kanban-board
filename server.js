const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB connection setup
const uri = "mongodb+srv://nabanitabania78:8PAjKUq9vRGNJNIV@cluster0.fnrr3tw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    db = client.db("kanban-board");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the server if MongoDB connection fails
  }
}
run().catch(console.dir);

// Serve static files from the React app (in production)
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.get('/api', (req, res) => {
  res.send({ message: 'Hello from the server!' });
});

app.get('/api/columns', (req, res) => {
  const columns = ["To Do", "In Progress", "Done"];
  res.json(columns);
});

app.post('/api/columns', (req, res) => {
  const newColumn = req.body.columnTitle;
  if (!newColumn) {
    return res.status(400).json({ message: "Column title is required" });
  }
  const columns = ["To Do", "In Progress", "Done"];
  columns.push(newColumn);
  res.json(columns);
});

app.get('/api/cards', (req, res) => {
  const cards = [
    { id: 1, title: "Title 1", description: "Description 1", column: "To Do" },
    { id: 2, title: "Title 2", description: "Description 2", column: "In Progress" },
    { id: 3, title: "Title 3", description: "Description 3", column: "Done" },
    { id: 4, title: "Title 4", description: "Description 4", column: "To Do" }
  ];
  res.json(cards);
});

// Catch-all handler for serving the React app in production
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
