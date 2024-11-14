const User = require('../models/User.js')

async function createUserController(req,res){

    const {username, email , password}  = req.body

    if(!username || !email || !password){
        return res.status(400).json({error:'Username, email and password are required.'});
    }
    try{
        const user = await User.create({username, email, password})
        res.status(201).json(user)
    }catch(err){
        console.log(err)
        res.status(500).json({message:err})
    }

}

async function getUserController(req, res){
    try{
        const users = await User.find({})
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(404).json({message:err})
    }
}

module.exports = {
    createUserController,
    getUserController
}
