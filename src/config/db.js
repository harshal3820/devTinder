const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        'mongodb+srv://harshal1232413_db_user:MM36yCoF2bYqgUHN@clusternode.apf2kms.mongodb.net/devTinder'
    );
};

module.exports = {
    connectDB,
}

