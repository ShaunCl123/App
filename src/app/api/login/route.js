// Import necessary libraries
import { cookies } from 'next/headers';
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

export async function GET(req, res) {
  // Make a note we are on the api. This goes to the console.
  console.log("in the api page");

  // get the values that were sent across to us.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  // Validate required parameters
  if (!email || !pass) {
    return Response.json({ "error": "Missing parameters" }, 400);
  }

  console.log(email);
  console.log(pass);

  const url = 'mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const dbName = 'app'; // database name

  try {
    await client.connect();
    console.log('Connected successfully to server');
    
    const db = client.db(dbName);
    const collection = db.collection('login'); // collection name
    const findResult = await collection.find({"username": email}).toArray();
    console.log('Found documents =>', findResult);
    
    let valid = false;
    let hashResult = false;

    if (findResult.length > 0) {
      // Check password hash
      hashResult = bcrypt.compareSync(pass, findResult[0].pass);
      console.log("checking " + findResult[0].pass);
      console.log("Hash Comparison Result " + hashResult);

      if (hashResult) {
        valid = true;
        console.log("login valid");
        
        // Save a little cookie to say we are authenticated
        console.log("Saving username and auth status");
        cookies().set('auth', true);
        cookies().set('username', email);
      }
    }

    return Response.json({ "data": "" + valid + "" });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ "error": "Internal server error" }, 500);
  } finally {
    // Close the database connection
    await client.close();
  }
}