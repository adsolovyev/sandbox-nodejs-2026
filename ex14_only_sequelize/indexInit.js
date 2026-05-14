import sequelize from './db.js';
import {Role} from './models.js';
import {setupDatabase} from './dbInit.js';

async function start() {
    try {
        await sequelize.authenticate();
        await setupDatabase();
        console.log('DB ready');
    } catch (e) {
        console.error(e);
    }
}

start();