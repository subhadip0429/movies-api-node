const {Schema, model} = require("mongoose");

const GenreSchema = new Schema({
    name: {type: String, required: true, unique: true, lowercase: true, trim: true}
});

module.exports = model('Genre', GenreSchema);

