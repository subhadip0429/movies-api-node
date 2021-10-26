const {Schema, model} = require("mongoose");
const jwt = require("jsonwebtoken");
const Hash = require("../../untils/Hash");
const {config} = require("../../../config");

const USER_TYPES = {
    ADMIN: 'ADMIN',
    USER : 'USER'
}

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true, lowercase: true, trim: true},
    password: {type: String, required:true},
    role: {type:String, default: USER_TYPES.ADMIN}
},
    {
        timestamps: true
    });

UserSchema.set('toJSON', {
    transform: function (doc, user, options) {
        delete user.password;
        delete user.__v;
        return user;
    }
});


UserSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await Hash.buildHash(this.password);
    }
    next();
});

UserSchema.methods.authenticate = async function (reqPassword){
    const match = await Hash.compare(reqPassword, this.password);
    if(!match){
        throw new Error("Authentication Failed")
    }
    return this.generateToken();
}

UserSchema.methods.generateToken = function (){
    const options = {expiresIn : '1d'};
    const secret = config('secrets','JWT_SECRET');
    const token = jwt.sign({
        user_id: this._id,
        role: this.role
    }, secret, options);

    return {id : this._id, token}
}

module.exports = model('User', UserSchema);
