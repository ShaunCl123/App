export async function GET(req, res) {
  // Make a note we are on
  // the api. This goes to the console.
  console.log("in the api page");

  // get the values
  // that were sent across to us.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');
  const dob = searchParams.get('dob'); // Assuming dob is part of the query parameters

  console.log(email);
  console.log(pass);
  console.log(dob);

  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const hash = bcrypt.hashSync(pass, saltRounds);

  // database call goes here
  // Assuming collection is defined elsewhere in your code
  const findResult = await collection.insertOne({
    "username": email,
    "pass": hash,
    "dob": dob
  });

  // at the end of the process we need to send something back.
  return Response.json({ "data": "valid" });
}