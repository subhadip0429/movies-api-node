const jsDoc = require("swagger-jsdoc");
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Movies API",
            description: "Movies API Docs",
            contact:{
                name: "Subhadip Dasgupta"
            },
            servers: ["https://fynd-hiring-movies-app.herokuapp.com/"]
        }
    },
    apis: ["./src/core/modules/**/**/*.js", "./src/core/modules/**/*.js","./src/main.js"]
};

module.exports.swaggerDocument = jsDoc(swaggerOptions);
