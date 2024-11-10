const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function loginUserController(req, res){

    const {email, password} = req.body 

    if(!email || !password){
        return res.status(400).send({"error":"Incorrect email or password."})
    }

    try{
        // find the user first
        const user = await User.findOne({"email":email})
        if(!user){
            return res.status(400).send({"error":"Incorrect email or password."}) // do not authenticate 
        }

        // check if the hashed passwod matches
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).send({"error":"Incorrect email or password."}) // do not authenticate 
        }
        
        // create a token for the client
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.cookie('token', token, { httpOnly: true, secure: true })
        res.status(200).send({"message":"Login successful!"})

    }catch(err){
        res.status(500).send({"error":err}) // unauthorized
    }

}

module.exports = {loginUserController}
