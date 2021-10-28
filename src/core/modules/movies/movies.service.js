const Movie = require("./movie.model");
const {GenresService} = require("./genres");
const {CustomError} = require("../../untils/CustomError");

class MoviesService{
    async add({name, director, genre, popularity, imdb_score}, session_user){
        try {
            if(!genre){
                genre = [];
            }
            await new GenresService().addIfNoExistsBulk(genre);
            return await Movie.create({
                name,
                director,
                genre,
                popularity,
                imdb_score,
                last_updated_by: session_user
            });
        }catch (e) {
            if(e.code === 11000){
                throw new CustomError("Duplicate Movie Name", 400)
            }else{
                throw e;
            }
        }
    }

    get(id){
        return Movie.findById(id).exec();
    }

    list({searchText, limit = 20, page = 1, sortBy = 'popularity', orderBy = 'ASC'}, filterGenresList = []){
        let query = Movie.find();
        const orderByValue = orderBy.toUpperCase() === 'DEC' ? -1 : 1;
        if(searchText){
            query = Movie.find({$text : { $search : searchText}},{ score: { $meta : 'textScore'}})
                .sort({ score: {$meta : 'textScore'}, [sortBy] : orderByValue});
        } else if(filterGenresList.length){
            query.in('genre',filterGenresList)
                .sort({ [sortBy] : orderByValue});
        }else{
            query.sort({ [sortBy] : orderByValue});
        }
        return query
            .skip(((page -1) * limit))
            .limit(limit)
            .exec()
    }

    async update(id, {director, genre, popularity, imdb_score}, session_user){
        const movie = await this.get(id);
        if(!movie){
            throw new CustomError("NO movie found with this ID", 404);
        }
        await new GenresService().addIfNoExistsBulk(genre);
        movie.director = director;
        movie.genre = genre;
        movie.popularity = popularity;
        movie.imdb_score = imdb_score;
        movie.last_updated_by = session_user;
        return movie.save();
    }

    async remove(id){
        return Movie.deleteOne({_id: id}).exec();
    }
}

module.exports = MoviesService;
