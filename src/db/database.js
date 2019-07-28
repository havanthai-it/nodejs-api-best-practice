const mongoose = require('mongoose');
const config = require('../config');

class Database {

    constructor() {
        this.DB_URL = `mongodb+srv://${config.db.username}:${config.db.password}` +
            `@${config.db.host}/${config.db.database}?retryWrites=true&w=majority`;
    }

    connect() {
        mongoose.connect(this.DB_URL);

        // Connected event
        mongoose.connection.on('connected', () => {
            console.log('Mongoose default connection is open to ', this.DB_URL);
        })

        // Error event
        mongoose.connection.on('error', (error) => {
            console.log('Mongoose default connection has occured ' + error + ' error');
        });
    
        // Disconnected event
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection is disconnected');
        });
    }

}

module.exports = Database;
