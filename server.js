const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001; // or any other port you prefer
app.use(cors());
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nabanitabania78:8PAjKUq9vRGNJNIV@cluster0.fnrr3tw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  console.log("Connected successfully to server");
  // Send a ping to confirm a successful connection
  db = client.db("kanban-board");
}
run().catch(console.dir);


app.get('/', async(req, res) => {
  // Handle your API logic here
    const col = db.collection("users");
    const document = await col.findOne();
    res.json(document);
});

app.get('/api/columns', (req, res) => {
    const columns = ["To Do", "In Progress", "Done"];
    res.json(columns);
    }
);

app.post('/api/columns', (req, res) => {
    const newColumn = req.body.columnTitle;
    const columns = ["To Do", "In Progress", "Done"];
    columns.push(newColumn);
    res.json(columns);
});

app.get('/api/cards', (req, res) => {
    const cards = [
        {
            id: 1,
            title: "Title 1",
            description: "Description 1",
            column: "To Do"
        },
        {
            id: 2,
            title: "Title 2",
            description: "Description 2",
            column: "In Progress"
        },
        {
            id: 3,
            title: "Title 3",
            description: "Description 3",
            column: "Done"
        },
        {
            id: 4,
            title: "Title 4",
            description: "Description 4",
            column: "To Do"
        }
    ];
    res.json(cards);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});