const User = require("../models/User")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function loginUserController(req, res){

    const {email, password} = req.body 

    if(!email || !password){
        return res.status(400).json({message:"Incorrect email or password."})
    }

    try{
        // find the user first
        const user = await User.findOne({"email":email})
        if(!user){
            return res.status(400).json({message:"Incorrect email or password."}) // do not authenticate 
        }

        // check if the hashed passwod matches
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect email or password."}) // do not authenticate 
        }
        
        // create a token for the client
        const csrfToken = crypto.randomUUID() // custom csrf token
        const tokenData = { id: user._id, username: user.username, email:user.email, csrfToken:csrfToken}
        const token = jwt.sign( tokenData , process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.cookie('authToken', token, { 
            httpOnly: true, 
            secure: true,
            maxAge: 1000 * 3600 * 24 * 7 // 7d
        })

        res.status(200).json({
            tokenData:tokenData,
            message:"Login successful!"
        })

    }catch(err){
        res.status(500).json({message:err}) // unauthorized
    }

}

async function verifyUserController(req, res){
    const authToken = req.cookies.authToken
    const csrfToken = req.headers['x-csrf-token']
    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET)
        if(csrfToken !== decoded.csrfToken)
        {
            return res.status(401).json({ authenticated: false })
        }
        return res.status(200).json({ authenticated: true })
    } catch (err) {
        res.status(500).json({ message: err})
    } 
}

module.exports = {
    loginUserController,
    verifyUserController
}
