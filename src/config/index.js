
module.exports.config = function (file, key){
    const cfg = require(`./${file}.js`);
    if(!cfg){
        throw new Error("Config file not found");
    }
    return cfg[key];
}
