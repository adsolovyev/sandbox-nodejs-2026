// SELECT b.title "Название книги", b.author "Автор" FROM public.books b order by b.title asc;
// INSERT INTO public.books (title,author,description) VALUES ('Название книги','Автор книги','Описание книги');
// UPDATE public.books SET description='3Приключения', author='2Николай Носов', title='1Невероятные приключения Незнайки' WHERE id=4;
// DELETE FROM public.books WHERE id=4;

import { Sequelize } from "sequelize";

class DBConnection {
    // FIXME: REMOVE HARDCODE !!!
    sequelize = new Sequelize(
        'db',
        'pguser',
        'pgpass123456',
        {
            host: '192.168.1.49',
            dialect: 'postgres',
            port: '5432',
            schema: 'public'
        }
    );

    constructor() {

        // FIXME: ADD GRACEFULL SHUTDOWN (DISCONNECT FROM DB)!

        this.sequelize.authenticate().then(() => {
            console.log('Connection With Database Established Successfully.');
        }).catch((err) => {
            console.error('Sequelize Connection Error:', err);
        });
    }
}

class DataSourceSQLPostgres {

    constructor(db) {
        this.db = db;
    }

    getAll() {
        return this.db.sequelize.query(`SELECT id, title, author, description FROM public.books;`);
    }

    create(payload) {
        return new Promise((resovle, reject) => {
            if (!(
                payload.hasOwnProperty('title')
                && payload.hasOwnProperty('author')
                && payload.hasOwnProperty('description'))) {
                reject('DB:Create - Whong Payload');
                return;
            }

            this.db.sequelize.query(`INSERT INTO public.books (title,author,description) VALUES ('${payload.title}','${payload.author}','${payload.description}');`)
                .then((response) => {
                    resovle(response);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    update(id, payload) {

        return new Promise((resovle, reject) => {
            if (!(
                payload.hasOwnProperty('title')
                || payload.hasOwnProperty('author')
                || payload.hasOwnProperty('description'))) {
                reject('DB:Update - Whong Payload');
                return;
            }

            let q = [];
            q.push(`UPDATE public.books SET `);

            let subq = [];
            if (payload.hasOwnProperty('title')) {
                subq.push(`title='${payload.title}'`);
            }
            if (payload.hasOwnProperty('author')) {
                subq.push(`author='${payload.author}'`);
            }
            if (payload.hasOwnProperty('description')) {
                subq.push(`description='${payload.description}'`);
            }

            q.push(subq.join(', ') + ' ');
            q.push(`WHERE id=${id};`);
            q = q.join('');

            console.log(`SQL QUERY: ${q}`);

            this.db.sequelize.query(q)
                .then((response) => {
                    resovle(response);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    getOne(id) {
        return this.db.sequelize.query(`SELECT id, title, author, description FROM public.books WHERE id=${id};`);
    }

    delete(id) {
        return this.db.sequelize.query(`DELETE FROM public.books WHERE id=${id};`);
    }

}

const db = new DBConnection();

const ds = new DataSourceSQLPostgres(db);
export default ds;