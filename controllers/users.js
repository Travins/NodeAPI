const JWT = require('jsonwebtoken')
const User = require('../models/user')
const { JWT_SECRET } = require('../config')

signToken = user => {
    return JWT.sign({
        iss: 'NodeAPI',
        sub: user.id,
        iat: new Date().getTime(),//current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time +1 day
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        const { email, password } = req.value.body
        //check email
        const foundUser = await User.findOne({ email })
        if (foundUser) { 
            return res.status(403).json({ error:'Email is already in use' }) 
        }
        //create a user
        const newUser = new User({ email, password })
        await newUser.save()
        //set token
        const token = signToken(newUser)
        //response token
        res.status(200).json({ token })
    },

    signIn: async (req, res, next) => {
        //Generate token
        const token = signToken(req.user)    
        res.status(200).json({ token })
    },

    secret: async (req, res, next) => {
        console.log('UsersController.secret() called!')
        res.status(200).json({ success: 'secret' })      
    }
}