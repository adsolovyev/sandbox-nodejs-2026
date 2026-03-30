import DataSource from "./dataSource.js";

try {

const ds = new DataSource('db/database.json');


// ds.create({
//     name: 'Name1',
//     title: 'Title1',
//     description: 'Description1'
// })

// ds.delete(11);

const all = ds.getAll();
console.log('ALL: ', all);

// const oneBefore = ds.getOne(1);
// console.log('ONE BEFORE: ', oneBefore);

// ds.update(1, {title: '123'});

// const oneAfter = ds.getOne(1);
// console.log('ONE AFTER: ', oneAfter);


        
} catch (e) {
    console.log('Error detected: ', e);
}
