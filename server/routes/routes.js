const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/createDatabase.js')

router.get('/', (req, res) => {
    res.send("HelloWorld") // testing that server is up

})

router.post('/sign', async(request, response) => {
    console.log(request.body)
    const hashedPwd = await bcrypt.hash(request.body.password, 10);
   
    const signedUpUser = new User({
      
        username: request.body.username,
        password: hashedPwd 
    
    })

    signedUpUser.save()
    .then (data => {
        console.log(data)
        response.json(data)
       
    })
    .catch (error => {
        response.json(error)
        console.log(error)
        
    })
})

router.post('/login', (request, response) => {
    //console.log(request.body)
    
      User.findOne({username: request.body.username,} , async(err, obj) => {

             if (err) { console.log(err)} 
             if (obj){
                const cmp = await bcrypt.compare(request.body.password, obj.password);
                if (cmp){
                    console.log(`User found ${obj.username}`)
                    let newObj = {username: obj.username}
                    let token = jwt.sign({ newObj }, "secret", { expiresIn: "1800s", });
                    response.json({token: token})
                } else {
                    response.json({error:"Incorrect Password!"})
                }
                
             }
             else {
                console.log("User not found")
                response.json({error : "User not found"})
             }
             
         });
})



module.exports = router;