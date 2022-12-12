const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express()
app.use(cors());
require('dotenv').config();
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d02hkdv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
function run() {
    try {
        const dataCollection = client.db('portfolioData').collection('alldata')

        app.get('/alldata', async (req, res) => {
            const query = {}
            const result = await dataCollection.find(query).toArray()
            res.send(result)
        })

        app.get('/alldata/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await dataCollection.findOne(query)
            res.send(result)
        })


    }
    finally {

    }
}
run()


app.get('/', (req, res) => {
    res.send('Portfolio server is running')
})

app.listen(port, () => {
    console.log(`Portfolio server running on ${port}`);
})