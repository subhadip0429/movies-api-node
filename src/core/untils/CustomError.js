class CustomError extends Error{
    constructor(message, code = 500) {
        super(message);
        this.statusCode = code;
    }
}

module.exports.CustomError = CustomError;
