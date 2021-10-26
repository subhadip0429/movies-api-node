const User = require("./users.model");


class UsersService{

    add(newUser){
        return User.create(newUser);
    }

    findByEmail(email){
        return User.findOne({email}).exec();
    }

    findById(id){
        return User.findById(id).exec();
    }

    async authenticate(email, password){
        const user = await this.findByEmail(email);
        return user.authenticate(password);
    }

    async register(newUser){
        const user = await this.add(newUser);
        return user.generateToken();
    }
}

module.exports = UsersService;
