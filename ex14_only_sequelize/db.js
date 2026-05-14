import { Sequelize } from 'sequelize';

const pgConnection = {
     host: '192.168.1.70',
        dialect: 'postgres',
        port: '5432',
        schema: 'public',
        define: {
            underscored: true
        },
        logging: false
}

const mariadbConnection = {
     host: '192.168.1.70',
        dialect: 'mariadb',
        port: '3306',
        define: {
            underscored: true
        },
        logging: false
};


// common
const db = 'db';

// pg
const dbuser = 'pguser';
const dbpass = 'pgpass123456';
const conn = pgConnection;

// mariadb
// const dbuser = 'dbuser';
// const dbpass = 'dbpass123456';
// const conn = mariadbConnection;

const sequelize = new Sequelize(
    db,
    dbuser,
    dbpass,
    conn
);

export default sequelize;