import {existsSync, writeFileSync, readFileSync, mkdirSync, read} from "node:fs";
import {dirname} from "node:path"; // 
export default class DataSource {
    storage = [];
    dbFile = null;

    constructor(dbFile) {

        this.dbFile = dbFile;
        const dbDir = dirname(this.dbFile);
        // рекурсивная проверка существования директории
        if(!existsSync(dbDir)){
            mkdirSync(dbDir, {recursive: true});
        }


        if (existsSync(this.dbFile)){
            this.deserialize();
        } else {
            this.serialize();
        }
    }


    serialize(){
        const dbJSON = JSON.stringify(this.storage);
        writeFileSync(this.dbFile, dbJSON);
    }

    deserialize(){
        const dbJSON = readFileSync(this.dbFile);
        this.storage = JSON.parse(dbJSON);
    }

    getAll(){
        return this.storage;
    }

    getOne(id){
        const found = this.storage.find((item) => {
            return item.id === id;
        });
        if (!found) {
            throw new Error('DB:GetOne - Not found!');
        }
        return found;
    }

    create(payload) {
        if (!(payload.hasOwnProperty('name') 
            && payload.hasOwnProperty('title') 
            && payload.hasOwnProperty('description'))){
            throw new Error('DB:Create - Wrong Payload');
        }

        // новой записи в БД нужно присвоить id. Пусть будет простой способ - посчитать все элементы в базе 
        let id = 1 + Math.max(...this.storage.map((item) => item.id));

        // проверка на дубликаты
        const found = this.storage.find((item) => {
            return item.id === id;
        });
        if (found) {
            throw new Error('DB - Inconsistent database!');
        }

        const newItem = {
            id,
            name: payload.name,
            title: payload.title,
            description: payload.description
        };
        // непосредственно пуш новой записи
        this.storage.push(newItem);

        // после добавления в storage хотим так же сохранить эти данные в файл
        this.serialize();
        return(newItem);
    }

    update(id, payload) {
        if (!(payload.hasOwnProperty('name') 
            || payload.hasOwnProperty('title') 
            || payload.hasOwnProperty('description'))){
            throw new Error('DB:Update - Wrong Payload');
        }

        const found = this.storage.find((item) => {
            return item.id === id;
        });
        if (!found) {
            throw new Error('DB: Update - ID not found!');
        }

        const index = this.storage.indexOf(found);

        const validKeys = ['name', 'title', 'description'];
        const keys = Object.keys(payload);
        for (const key of keys) {
            if(validKeys.includes(key)){
                found[key] = payload[key];
            }
        }
        this.storage[index] = found;
        this.serialize;

    }

    delete(id) {
        // поиск взяли из создания 
        const found = this.storage.find((item) => {
            return item.id === id;
        });
        if (!found) {
            throw new Error('DB:Delete - Item not found!');
        }
        // непосредственно удаление 
        const index = this.storage.indexOf(found);
        this.storage.splice(index, 1);
        // точно так же обновили файл
        this.serialize();
    }
}