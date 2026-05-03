// SELECT b.title "Название книги", b.author "Автор" FROM public.books b order by b.title asc;
// INSERT INTO public.books (title,author,description) VALUES ('Название книги','Автор книги','Описание книги');
// UPDATE public.books SET description='',author='',title='' WHERE id=4;
// DELETE FROM public.books WHERE id=4;

import { Sequelize } from "sequelize";

class DBConnection {
    // FIXME REMOVE HARDCODE 
    sequelize = new Sequelize(
        'db',
        'pguser',
        'pgpass123456',
        {
            host: '192.168.0.11',
            dialect: 'postgres',
            port: '5432',
            schema: 'public'
        }
    );

    constructor() {
        // FIXME ADD GRACEFULL SHUTDOWN (DISCONNECT FROM DB)
        this.sequelize.authenticate().then(()=>{
            console.log('Conenction With Database Established Successfully,');
        }).catch((err) => {
            console.error('Sequilize Connection Error:', err);
        });
    }
}

class DataSourceSQLPostrgres {

    constructor(db) {
        this.db = db;
    }

    getAll(){
        return this.db.sequilize.query(`SELECT id, title, author, description FROM public.books;`);
    }

    getOne(id){
        return this.db.sequilize.query(`SELECT id, title, author, description FROM public.books WHERE id=${id};`);
    }

    create(payload) {
        return new Promise((resolve, reject) => {
            if (!(
                payload.hasOwnProperty('name') 
                && payload.hasOwnProperty('author') 
                && payload.hasOwnProperty('description'))){
                reject('DB:Create - Wrong Payload');
                return;
            }

            this.db.sequilize.query(`INSERT INTO public.books (title,author,description) VALUES ('${payload.title}','${payload.author}','${payload.description}');`).then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    update(id, payload) {
        return new Promise((resolve, reject) => {
            if (!(payload.hasOwnProperty('title') 
                || payload.hasOwnProperty('author') 
                || payload.hasOwnProperty('description'))){
                reject('DB:Update - Wrong Payload');
                return;
            }

            let q = [];
            q.push(`UPDATE public.books SET `);

            let subq = [];

            if(payload.hasOwnProperty('title')) {
                subq.push(`title='${payload.title}'`);
            }
             if(payload.hasOwnProperty('author')) {
                subq.push(`author='${payload.author}'`);
            }
             if(payload.hasOwnProperty('description')) {
                subq.push(`description='${payload.description}'`);
            }
            q.push(subq.join(', ') + ' ');
            q.push(`WHERE id=${id}`);
            q = q.join('');

            // console.log(`SQL QUERY: ${q}`);

            this.db.sequilize.query(q)
            .then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    delete(id) {
        return this.db.sequilize.query(`DELETE FROM public.books WHERE id=${id};`);
    }
}

const db = new DBConnection();

const ds = new DataSourceSQLPostrgres(db);
export default ds;