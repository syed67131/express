import express from 'express'
import userController from './user.controller.js'
import jwt from 'jsonwebtoken';
const router = express.Router()


router.get('/users',async (req,res)=>{
    try {
        let authToken = req.headers['auth-token'];
        console.log(authToken)
        let userData = await jwt.verify(authToken, 'CFI_A24');
        console.log(userData);
        userController.getUserData(req,res);
    } catch (error) {
        res.status(500).json({error : "Something went wrong"})
    }
})  

router.post('/register',(req,res)=>{
    userController.registerUser(req,res);
})

router.post('/login',(req,res)=>{
    userController.userLogin(req,res);
})

export default router;