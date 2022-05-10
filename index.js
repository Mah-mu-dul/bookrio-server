const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const { response } = require('express');
const ObjectId = require('mongodb').ObjectID


// middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v0r7t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        await client.connect()
        const BooksCollection = client.db('BOOKory').collection('books')


        // show all items
        app.get('/books', async (req, res) => {
            const query = {}
            const cursor = BooksCollection.find(query)
            const books = await cursor.toArray()
            res.send(books)
        })

        // show one item
        app.get('/book/:id', async (req, res) => {
            const id = req.params.id

            const query = { _id: ObjectId(id) }
            console.log(query)
            const result = await BooksCollection.findOne(query)

            res.send(result)

        })

        // post a new item
        app.post('/books', async (req, res) => {
            const newBook = req.body
            console.log('adding new book', newBook);
            const result = await BooksCollection.insertOne(newBook)
            res.send(result)
        })

        //update an item
        app.put('/book/:id', async (req, res) => {
            const id = req.params.id
            const updatedItem = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    quantity: updatedItem.quantity
                    
                }

            }
            const result =  await BooksCollection.updateOne(filter, updatedDoc, options)
            res.send(result)


        })


        // delete a items 

        app.delete('/books/:id', async (req, res) => {
            const id = req.params.id

            const query = { _id: ObjectId(id) }
            console.log(query)
            const result = await BooksCollection.deleteOne(query)
            res.send(result)
        })

    }
    finally {

    }


}



run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running server')
})


app.listen(port, () => {
    console.log('all ok');
})
