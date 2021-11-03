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
        return this.collection.find();
    }

    findOne(filters) {
        return this.collection.findOne(filters);
    }

    insertOne(data){
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
}

module.exports = Database;