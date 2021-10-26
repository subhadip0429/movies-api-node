const {Router} = require("express");
const {UserRouter} = require("./core/modules/users");
const {MoviesRoutes} = require("./core/modules/movies");
const router = Router();

router.use('/movies', MoviesRoutes.moviesRouterPublic);
router.use('/users', UserRouter);
router.use('/movies', MoviesRoutes.moviesRouterProtected);

module.exports = router;
