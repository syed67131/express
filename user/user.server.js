import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


async function getUserData(userId) {
    try {
        console.log('Inside UserService : getUserData method')
        let fileData = await fs.readFile('data.json');
        fileData = JSON.parse(fileData);
        return {
            message: "Users fetched successfully",
            data: fileData,
            status: true,
            statusCode: 200
        }

    } catch (error) {
        console.log('Inside UserService : getUserData method')
        return {
            message: "Internal Server Error",
            status: false
        }
    }
}

async function registerUser(body) {
    try {
        console.log('Inside UserService : registerUser method')
        //Check For Both Passwords
        if (body.password !== body.password2) {
            return {
                message: "Passwords do not match",
                // data :'',
                status: false,
                statusCode: 400
            }
        }
        let fileData = await fs.readFile('data.json');
        fileData = JSON.parse(fileData);
        //We check if the Email is Unique or Not
        let findUser = fileData.find((ele) => ele.email == body.email);
        if (findUser) {
            return {
                message: "User already Exists, please login",
                // data :'',
                status: false,
                statusCode: 409
            }
        }
        delete body.password2;
        // let hashedPassword = await bcrypt.hash(body.password,11);
        body.password = await bcrypt.hash(body.password, 11);
        body.tasks = [];
        fileData.push(body);
        await fs.writeFile('data.json', JSON.stringify(fileData));
        return {
            message: "User has been registered, successfully",
            // data :bod,
            status: true,
            statusCode: 200
        }
    } catch (error) {
        console.log('Inside UserService : registerUser method, error while registering a user');
        return {
            message: "Internal Server Error",
            status: false
        }
    }
}

async function userLogin(body) {
    try {
        console.log('Inside UserService : userLogin method')
        let fileData = await fs.readFile('data.json');
        fileData = JSON.parse(fileData);
        //We check if the Email is Unique or Not
        let findUser = fileData.find((ele) => ele.email == body.email);
        if (!findUser) {
            return {
                message: "User not found, please sign up",
                // data :'',
                status: false,
                statusCode: 404
            }
        }
        let result = await bcrypt.compare(body.password, findUser.password)
        if (!result) {
            return {
                message: "Invalid Credentials",
                // data :'',
                status: false,
                statusCode: 401
            }
        }
        delete findUser.password;
        //JSON WEB TOKENS  jwt.io
        let token = await jwt.sign(
            findUser,
            'CFI_A24',//Secret Key
            { expiresIn: '1h' }
        );
        return {
            message: "User has been logged in, successfully",
            data :token,
            status: true,
            statusCode: 200
        }
    } catch (error) {
        console.log('Inside UserService : userLogin method, error while registering a user');
        return {
            message: "Internal Server Error",
            status: false
        }
    }
}

export default { getUserData, registerUser, userLogin }