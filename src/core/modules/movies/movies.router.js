const {Router} = require("express");
const passport = require("passport");

const {requestHandler} = require("../../untils/RequestHandler");
const MovieController = require("./movies.controller");

const moviesRouterPublic = Router();
const moviesRouterProtected = Router();

moviesRouterPublic.get('/',requestHandler(MovieController.index));
moviesRouterPublic.get('/:id',requestHandler(MovieController.show));

moviesRouterProtected.use(passport.authenticate('jwt', {session : false}));
moviesRouterProtected.post('/', requestHandler(MovieController.create));
moviesRouterProtected.patch('/:id', requestHandler(MovieController.update));
moviesRouterProtected.delete('/:id',requestHandler(MovieController.remove));

module.exports= {
    moviesRouterProtected,
    moviesRouterPublic
}

