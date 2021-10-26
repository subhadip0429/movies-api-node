const {ExtractJwt, Strategy} = require("passport-jwt");
const {UserService} = require("../modules/users");
const {config} = require("../../config");
module.exports.JWTStrategy = () => {
    const secret = config('secrets','JWT_SECRET');
    const options = {
        jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), ExtractJwt.fromUrlQueryParameter('_token')]),
        secretOrKey : secret
    }

    return new Strategy(options, async (payload, done) =>{
        try{
            const user = await new UserService().findById(payload.user_id);
            if(user){
                return done(null,user)
            }else{
                return done(null,false)
            }
        }catch (error) {
            done(error);
        }
    });
}
