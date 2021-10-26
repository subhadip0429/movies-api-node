const {responseHandler} = require("./ResponseHandler");
const {CustomError} = require("./CustomError");
module.exports.requestHandler = (handler) => {
    return async function (request, response){
        try{
            return await handler(request, response);
        }catch (error) {
            console.log("handler error", error)
            if(error instanceof CustomError){
                return responseHandler({
                    error: error.message,
                    statusCode: error.statusCode,
                }, response);
            }else{
                return responseHandler({
                    error: "Internal Server Error",
                    statusCode: 500,
                }, response);
            }
        }

    }
}


