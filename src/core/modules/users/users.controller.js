const UserService = require("./users.service");
const {responseHandler} = require("../../untils/ResponseHandler");

class UsersController{
    static async register(request, response){
        const {name, email, password} = request.body;
        if(!name){
            throw new Error("Name is required");
        }
        if(!email){
            throw new Error("Email is required");
        }
        if(!password){
            throw new Error("Password is required");
        }

        const token = await new UserService().register({
            name,
            email,
            password
        });

        return responseHandler({
            message: "User Registered",
            data: token,
            statusCode: 201
        }, response);
    }

    static async authenticate(request, response){
        const {email, password} = request.body;
        if(!email){
            throw new Error("Email is required");
        }
        if(!password){
            throw new Error("Password is required");
        }
        const token = await new UserService().authenticate(email, password);
        return responseHandler({
            message: "User Authenticated Successfully",
            data: token,
            statusCode: 200
        }, response);
    }

    static me(request, response){
        return responseHandler({
            message: "User found",
            data: request.user,
            statusCode: 200
        }, response)
    }
}

module.exports = UsersController;
