import fs from "fs/promises";

async function createTask(body, userData) {
    try {
        console.log("Inside taskService");
        console.log(body, userData);
        //Read the File
        let fileData = await fs.readFile("data.json");
        fileData = JSON.parse(fileData);
        //Find the user from given email in Token
        let findUser = fileData.find((ele) => ele.email == userData.email);
        console.log(findUser);
        //if user is not found, invalid / Bad Request
        if (!findUser) {
            return {
                message: "User not found, please register",
                status: false,
                statusCode: 404,
            };
        }
        let taskPayload = {
            name: body.name,
            taskId: new Date().getTime(),
            isCompleted: false,
        };
        findUser.tasks.push(taskPayload);
        await fs.writeFile('data.json',JSON.stringify(fileData));
        return {
            message: "Task has been added successfully",
            status: true,
            statusCode: 200,
        };
    } catch (error) {
        console.error(error);
        console.log(
            "Inside taskService : createTask method, error while creating a task"
        );
        return {
            message: "Internal Server Error" + error.message,
            status: false,
            statusCode: 500,
        };
    }
}

//editTask (body,userData, taskId)
//Read File
//Find User
//If no user found throw error user not found
//Find Task (findIndex) findUser.tasks[findIndex] = {taskPayload}
// name - body.name
// isCompleted - body.isCompleted
// taskId - taskId

// findTask.name - body.name
// findTask.isCompleted - body.isCompleted

//Write File to Data.json


// /tasks Fetch All tasks of the User and Return them in data key

//Nodemailer and Twilio 

//MongoDB


export default { createTask };
