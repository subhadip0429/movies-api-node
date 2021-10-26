const mongoose = require("mongoose");
const {config} = require("../../config");
const {connection_URI} = require("../../config/db");

mongoose.set('debug', true);

module.exports = async function (){
    return new Promise((resolve, reject) => {
        const CONNECTION_URI = config('db','connection_URI')
        mongoose.connect(connection_URI,{useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
            if(error){
                return reject(error);
            }
            console.log("DB Connected");
            resolve();
        })
    });
}
