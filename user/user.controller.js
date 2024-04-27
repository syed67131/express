import userService from "./user.service.js"; 

async function getUserData(req,res){
    try {
        console.log('Inside userController : getUserData method')
        let response = await userService.getUserData();
        if(response.status){
            res.status(response.statusCode).json({
                message : response.message,
                data : response.data
            })
        }
    } catch (error) {
        console.log('Inside userController : getUserData method')
        return res.status(500).json({error : 'Internal Server Error'})
    }
}

async function registerUser(req,res){
    try {
        console.log('Inside userController : registerUser method')
        let response = await userService.registerUser(req.body);
        if(response.status){
            res.status(response.statusCode).json({
                message : response.message,
                data : response.data
            })
        }else{
            res.status(response.statusCode).json({
                message : response.message
            })
        }
    } catch (error) {
        console.log('Inside userController : registerUser method')
        return res.status(500).json({error : 'Internal Server Error'})
    }
}

async function userLogin(req,res){
    try {
        console.log('Inside userController : userLogin method')
        let response = await userService.userLogin(req.body);
        if(response.status){
            res.status(response.statusCode).json({
                message : response.message,
                data : response.data
            })
        }else{
            res.status(response.statusCode).json({
                message : response.message
            })
        }
    } catch (error) {
        console.log('Inside userController : userLogin method')
        return res.status(500).json({error : 'Internal Server Error'})
    }
}

export default {getUserData,registerUser,userLogin}