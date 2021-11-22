let database; 

class Database {
    
    collectionName;
    collection;

    static setDatabase(db) {
        database = db;
    }

    constructor(collectionName) {
        this.collectionName = collectionName;
        this.collection = database.collection(collectionName);
    }

    find(filters) {
        return this.collection.find(filters);
    }

    findOne(filters) {
        return this.collection.findOne(filters);
    }

    insertOne(data){ //Funcion que recibe data y la inserta en la collection de la base de datos 
        return new Promise ((resolve, reject) =>{
            this.collection.insertOne(data, function (error, response) {
                if(error) {
                    reject(error);
                // return 
                } else {
                    resolve(response);
              // return 
                    }
            })
        })
    };

    findOneAndDelete(filters){
        return this.collection.findOneAndDelete(filters);
    }

    findOneAndUpdate(query, update, options){
        return this.collection.findOneAndUpdate(query, update, options);
    }

    aggregate(filters){
        return this.collection.aggregate(filters);
    }
}

module.exports = Database;