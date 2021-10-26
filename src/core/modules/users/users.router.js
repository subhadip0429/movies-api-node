const {Router} = require("express");
const passport = require("passport");
const {requestHandler} = require("../../untils/RequestHandler");
const UserController = require("./users.controller");
const userRouter = Router();

userRouter.get("/me", passport.authenticate('jwt',{session: false}), requestHandler(UserController.me));
userRouter.post('/authenticate', requestHandler(UserController.authenticate));
userRouter.post('/register', requestHandler(UserController.register));


module.exports = userRouter;
