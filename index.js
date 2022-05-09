const express = require('express');
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');


// middleware
app.use(cors())
app.use(express.json())



const uri = "mongodb+srv://dbuser1:VHOmsPx89HAprhLf@cluster0.v0r7t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try{
        await client.connect()
        const BooksCollection = client.db('BOOKory').collection('books')






        
        // post a new item
        app.post('/books', async(req , res) =>{
             const newBook = req.body
             console.log('adding new book', newBook);
             const result = await BooksCollection.insertOne(newBook)
             res.send(result)
        })


    }
    finally{

    }
    

}



run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running server')
})


app.listen(port, () => {
    console.log('all ok');
})
