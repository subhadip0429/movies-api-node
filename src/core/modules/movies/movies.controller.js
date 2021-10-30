const MovieService = require("./movies.service");
const {responseHandler} = require("../../untils/ResponseHandler");
const {CustomError} = require("../../untils/CustomError");
const {GenresService} = require("./genres");
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movies Management
 */
/**
 * @swagger
 * definitions:
 *   Movie:
 *     required:
 *       - name
 *       - director
 *       - genre
 *       - popularity
 *       - imdb_score
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       director:
 *         type: string
 *       genre:
 *         type: array
 *         items:
 *            type: string
 *       popularity:
 *         type: number
 *       imdb_score:
 *         type: number
 */
/**
 * @swagger
 * definitions:
 *   Genre:
 *     required:
 *       - name
 *     properties:
 *       name:
 *         type: string
 *       _id:
 *          type: string
 */
class MoviesController{

    /**
     * @swagger
     * /movies:
     *   post:
     *       description: Add a new movie
     *       tags: [Movies]
     *       produces:
     *        - application/json
     *       parameters:
     *          - in: header
     *            name: Bearer token
     *            type: string
     *            default: Bearer <YOUR_TOKEN>
     *          - in: body
     *            name: Movie
     *            schema:
     *              type: object
     *              $ref: '#/definitions/Movie'
     *
     *       responses:
     *           '201':
     *               description: Movie added successfully
     *               schema:
     *                  type: object
     *                  $ref: '#/definitions/Movie'
     *
     *
     *
     */
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

    /**
     * @swagger
     * /movies:
     *   get:
     *       description: Get list of movies
     *       tags: [Movies]
     *       produces:
     *        - application/json
     *       parameters:
     *            - in: query
     *              name: search_text
     *              type: string
     *              description: Search Query
     *            - in: query
     *              name: genre
     *              type: string
     *              description: Coma separated genre list
     *            - in: query
     *              name: sort_by
     *              type: string
     *              description: Supported parameters name popularity director
     *              default: popularity
     *            - in: query
     *              name: order_by
     *              type: string
     *              description: supported
     *              default: ASC
     *              enum: [ASC, DESC]
     *            - in: query
     *              name: limit
     *              type: number
     *              description: Page size
     *              default: 20
     *            - in: query
     *              name: page
     *              type: number
     *              description: Page number
     *              default: 1
     *
     *       responses:
     *           '200':
     *               description: Movie list fetched successfully
     *               schema:
     *                  type: array
     *                  items:
     *                    $ref: '#/definitions/Movie'
     *
     */
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

        if(!movies.length && page > 1){
            page = page -1;
        }
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

    /**
     * @swagger
     * /movies/{movie_id}:
     *   get:
     *       description: Get movie details by ID
     *       tags: [Movies]
     *       produces:
     *        - application/json
     *       parameters:
     *         - in: path
     *           name: movie_id
     *           schema:
     *             type: string
     *           required: true
     *           description: ID of the movie
     *
     *       responses:
     *           '200':
     *               description: Movie details fetched successfully
     *               schema:
     *                  type: object
     *                  $ref: '#/definitions/Movie'
     *
     */
    static async show(request, response){
        const {id} = request.params;
        if(!id) throw new CustomError("Invalid movie");
        const movie = await new MovieService().get(id);
        if(!movie) throw new CustomError("No movie found", 404);
        return responseHandler({
            message : "Movies fetched successfully",
            data: movie,
            statusCode: 200
        }, response);
    }
    /**
     * @swagger
     * /movies/{movie_id}:
     *   patch:
     *       description: Update a movie
     *       tags: [Movies]
     *       produces:
     *        - application/json
     *       parameters:
     *          - in: header
     *            name: Bearer token
     *            type: string
     *            default: Bearer <YOUR_TOKEN>
     *          - in: path
     *            name: movie_id
     *            required: true
     *            description: ID of the movie
     *            schema:
     *               type: string
     *          - in: body
     *            name: Movie
     *            description: Any property of the movie expect name can be updated
     *            schema:
     *              type: object
     *              $ref: '#/definitions/Movie'
     *
     *       responses:
     *           '201':
     *               description: Movie updated successfully
     *               schema:
     *                  type: object
     *                  $ref: '#/definitions/Movie'
     *
     *
     *
     */
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
    /**
     * @swagger
     * /movies/{movie_id}:
     *   delete:
     *       description: delete a movie by ID
     *       tags: [Movies]
     *       parameters:
     *         - in: header
     *           name: Bearer token
     *           type: string
     *           default: Bearer <YOUR_TOKEN>
     *         - in: path
     *           name: movie_id
     *           schema:
     *             type: string
     *           required: true
     *           description: ID of the movie
     *
     *       responses:
     *           '204':
     *               description: Movie deleted successfully
     *
     *
     */
    static async remove(request, response){
        const {id} = request.params;
        if(!id) throw new CustomError("Invalid movie");
        await new MovieService().remove(id);
        return responseHandler({
            message : "Movie deleted successfully",
            statusCode: 204
        }, response);
    }
    /**
     * @swagger
     * /movies/genre:
     *   get:
     *       description: Get lis of saved Genres
     *       tags: [Movies]
     *       produces:
     *        - application/json
     *
     *       responses:
     *           '200':
     *               description: Movie details fetched successfully
     *               schema:
     *                  type: array
     *                  items:
     *                     $ref: '#/definitions/Genre'
     *
     */
    static async listGenre(request, response){
       const genreList = await new GenresService().list();
       return responseHandler({
           message: "Genre list fetched successfully",
           data: genreList,
           statusCode: 200
       }, response);
    }
}

module.exports = MoviesController;
