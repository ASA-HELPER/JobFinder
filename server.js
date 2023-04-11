// Imports
const express = require('express');


// rest object
const app = express();

// route
app.get('/',(req,resp)=>{
    resp.send("<h1>Welcome to job finder</h1>");
})

// App listening to port
app.listen(8080,()=>{
    console.log(`Node server running at ${8080}`);
})