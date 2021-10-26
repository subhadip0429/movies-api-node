const {Schema, model, Types} = require("mongoose");

/*


{
    "99popularity": 83.0,
    "director": "Victor Fleming",
    "genre": [
      "Adventure",
      " Family",
      " Fantasy",
      " Musical"
    ],
    "imdb_score": 8.3,
    "name": "The Wizard of Oz"
  }

 */
const MovieSchema = new Schema({
    name: {type: String, required: true, unique: true},
    director : {type: String, required: true},
    genre: [{type: String, lowercase: true, trim: true} ],
    popularity : {type: Number, required: true},
    imdb_score : {type: Number, required: true},
    last_updated_by : {type: Schema.Types.ObjectId, ref :'User'}
},{
    timestamps : true
})

MovieSchema.index({name: "text", director: "text"}, {name: "movie_name_director_index", weights: {name : 2, director: 1}})

module.exports = model('Movie', MovieSchema);



