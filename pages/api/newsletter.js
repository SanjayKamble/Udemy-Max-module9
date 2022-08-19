import {MongoClient } from 'mongodb'

async function handler(req, res) {

   
    if (req.method === 'POST') {
        //extraction
        const userEmail = req.body.email;
       
  
        //validation
        if (!userEmail || !userEmail.includes('@')) {
            res.status(422).json({ message: "invalid email address" });
            return;
        }

    
        //connecting to mongodb 
        const client = await MongoClient.connect('mongodb+srv://sanjaykumar:XQ6C2UL56mOFpGQM@cluster0.qpisc.mongodb.net/?retryWrites=true&w=majority');
        console.log("connected successfully to server");

        //connecting to the database
        const db = client.db('newsletterdb');

        //inserting one document
        await db.collection('emails').insertOne({email : userEmail});

        //disconnecting from the client
        client.close();

        console.log(userEmail);
        res.status(201).json({ message: " signed up successfully" })
    }

    

} export default handler;