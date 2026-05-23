import sequelize from './db.js';
import { successTransaction, failedTransaction } from "./transactions.js";

async function start() {
    try {
        await sequelize.authenticate();
        await successTransaction();
        // await failedTransaction();

    } catch (e) {
        console.error(e);
    }
}

start();