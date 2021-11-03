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

    deleteOne(filters){
        return this.collection.deleteOne(filters,function(error ,response){
            if(error){
                reject(error);
            }else {
                resolve(response);
          // return 
                }
        });
    }

    findOneAndUpdate(filters){
        return this.collection.findOneAndUpdate(filters);
    }
}

module.exports = Database;