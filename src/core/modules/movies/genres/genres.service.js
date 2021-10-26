const Genre = require("./genres.model");

class GenresService{
    add(name){
        return Genre.create({name});
    }

    async addIfNoExistsBulk(genres){
        if( typeof genres === "string") genres = [genres];
        for (let genre_name of genres){
            const exists = await Genre.exists({name: genre_name});
            if(!exists){
                await this.add(genre_name);
            }
        }
    }

    findByName(name){
        return Genre.findOne({name}).exec();
    }

    list(){
        return Genre.find().exec();
    }
}

module.exports = GenresService;
