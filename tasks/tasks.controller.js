import tasksService from "./tasks.service.js";

async function createTask(req,res){
    try {
        console.log('Inside taskController : createTask method')
        const response = await tasksService.createTask(req.body,req.userData);
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
        console.error(error)
        console.log('Inside taskController : createTask method')
        return res.status(500).json({error : 'Internal Server Error',message : error.message})
    }
}

//Edit Task
// Body - req.body
// userData - req.userData - authMiddleware
// taskId - req.params.taskId
//We pass them to TaskController.editTask


export default {createTask};