// overwrite default configuration
if (process.env.CONFIG !== undefined) {
    return module.exports = require("../config/"+process.env.CONFIG+".js");
}

const config = {
   db: {
        dsn: "mongodb://localhost:27017/projectx",
        collection_name: "assets",
        options: {
            keepAlive: 1, connectTimeoutMS: 30000, ssl:true
        }
    }
};

module.exports = config;

