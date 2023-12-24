const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 8081 ;                  //Save the port number where your server will be listening
const mongoose = require('mongoose')               
const routesUrls = require("./routes/routes.js")
const cors = require('cors');      

mongoose.connect('mongodb+srv://test0db:test123@test0.psdbb.mongodb.net/testUsers?retryWrites=true&w=majority', (error, result) =>{
    if (error) {return console.log(error)}
    else console.log("Database connected")
})


app.use(cors());
app.use(express.json())
app.use('/', routesUrls)

app.listen(port, () => {           
    console.log(`Now listening on port ${port}`); 
});