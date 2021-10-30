const UserService = require("./users.service");
const {responseHandler} = require("../../untils/ResponseHandler");
const {CustomError} = require("../../untils/CustomError");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and login
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - name
 *       - email
 *       - password
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   Response Body:
 *     required:
 *       - message
 *       - statusCode
 *       - data
 *       - error
 *     properties:
 *       message:
 *         type: string
 *       statusCode:
 *         type: number
 *       data:
 *         type: object
 *       error:
 *         type: string
 */
class UsersController{

    /**
    * @swagger
    * /users/register:
    *   post:
    *       description: Register a new User
    *       tags: [Users]
     *       produces:
     *        - application/json
     *       parameters:
     *          - in: body
     *            name: User
     *            schema:
     *              type: object
     *              $ref: '#/definitions/User'
     *
    *       responses:
    *           '201':
    *               description: User registered successfully
     *               schema:
     *                  type: object
     *                  properties:
     *                      token:
     *                          type: string
    *
    *
    *
    */

    static async register(request, response){
        const {name, email, password} = request.body;
        if(!name){
            throw new CustomError("Name is required", 400);
        }
        if(!email){
            throw new CustomError("Email is required", 400);
        }
        if(!password){
            throw new CustomError("Password is required", 400);
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

    /**
     * @swagger
     * definitions:
     *   User Credentials:
     *     required:
     *       - email
     *       - password
     *     properties:
     *       email:
     *         type: string
     *       password:
     *         type: string
     */
    /**
     * @swagger
     * /users/authenticate:
     *   post:
     *       description: Authenticate User credentials
     *       tags: [Users]
     *       produces:
     *        - application/json
     *       parameters:
     *          - in: body
     *            name: Credentials
     *            schema:
     *              type: object
     *              $ref: '#/definitions/User Credentials'
     *
     *       responses:
     *           '200':
     *               description: User authenticated successfully
     *               schema:
     *                  type: object
     *                  properties:
     *                      token:
     *                          type: string
     *                      _id:
     *                          type: string
     *
     *
     *
     */
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

    /**
     * @swagger
     * /users/me:
     *   get:
     *       description: Verify auth token
     *       tags: [Users]
     *       produces:
     *        - application/json
     *       parameters:
     *          - in: header
     *            name: Bearer token
     *            type: string
     *            default: Bearer <YOUR_TOKEN>
     *
     *
     *       responses:
     *           '200':
     *               description: User fetched successfully
     *               schema:
     *                  type: object
     *                  $ref: '#/definitions/User'
     *
     *
     *
     */
    static me(request, response){
        return responseHandler({
            message: "User found",
            data: request.user,
            statusCode: 200
        }, response)
    }
}

module.exports = UsersController;
