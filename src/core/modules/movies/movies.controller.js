const MovieService = require("./movies.service");
const {responseHandler} = require("../../untils/ResponseHandler");
const {CustomError} = require("../../untils/CustomError");

class MoviesController{
   static async create(request, response){
        const {name, director, genre, popularity, imdb_score} = request.body;
        const session_user = request.user;
        if(!name) throw new CustomError("Movie name is required", 400);
        if(!director) throw new CustomError("Director name is required", 400);
        if(!genre) throw new CustomError("Genres are required", 400);
        if(!popularity) throw new CustomError("99Popularity rating is required", 400);
        if(!imdb_score) throw new CustomError("IMDB Score is required", 400);

        const movie = await new MovieService().add({
            name,
            director,
            genre,
            popularity,
            imdb_score
        }, session_user);

        return responseHandler({
            message : "Movie added successfully",
            data: movie,
            statusCode: 201
        }, response);
    }

    static async index(request, response){
       let {search_text:searchText, limit, page, sort_by:sortBy, order_by:orderBy, genre}  = request.query;
       let options = {};
       if(searchText)
           options = {...options, ...{searchText}};

        if(limit != null)
            options = {...options, ...{limit : parseInt(limit)}};

        if(page != null)
            options = {...options, ...{page}};

        if(sortBy)
            options = {...options, ...{sortBy}};

        if(orderBy)
            options = {...options, ...{orderBy}};

        if(!genre)
            genre = [];
        else
            genre = genre.split(",");

        const movies = await new MovieService().list(options, genre);

        return responseHandler({
            message : "Movies are fetched successfully",
            data: {
                count: movies.length,
                data: movies,
                page: page,
                limit: limit
            },
            statusCode: 200
        }, response);
    }

    static async show(request, response){
        const {id} = request.params;
        if(!id) throw new CustomError("Invalid movie");
        const movie = await new MovieService().get(id);
        return responseHandler({
            message : "Movies fetched successfully",
            data: movie,
            statusCode: 200
        }, response);
    }

    static async update(request, response){
        const {director, genre, popularity, imdb_score} = request.body;
        const {id} = request.params;
        const session_user = request.user;
        if(!id) throw new CustomError("Invalid movie");
        if(!director) throw new CustomError("Director name is required");
        if(!genre) throw new CustomError("Genres are required");
        if(!popularity) throw new CustomError("99Popularity rating is required");
        if(!imdb_score) throw new CustomError("IMDB Score is required");

        const updatedMovie = await new MovieService().update(id, {
            director,
            genre,
            popularity,
            imdb_score
        }, session_user);

        return responseHandler({
            message : "Movie updated successfully",
            data: updatedMovie,
            statusCode: 200
        }, response);
    }

    static async remove(request, response){
        const {id} = request.params;
        if(!id) throw new CustomError("Invalid movie");
        await new MovieService().remove(id);
        return responseHandler({
            message : "Movie deleted successfully",
            statusCode: 200
        }, response);
    }
}

module.exports = MoviesController;
