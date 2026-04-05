import DataSource from "./dataSource.js";
const dataSource = new DataSource('db/database.json');

export const booksHandler = (req, res) => {
    const {method, url} = req;

    console.log('url == ', url);
    const urlSplitted = url.split('?');
    const urlString = urlSplitted[0];
    const queryString = urlSplitted[1]; // FIXME: (это тоже можно как-то использовать)
    const urlArr = urlString.split('/');
    // console.log('urlArr', urlArr, urlArr.length);
    let id = null;
    if (urlArr.length === 4) {
        id = +urlArr[urlArr.length - 1]; // FIXME:
    }

    let re = null;

    switch (method) {
        case 'POST':
            re = JSON.stringify(dataSource.create({name: 'name Hardcode', title: 'title HardCode', description: 'description hardcode'})); // FIXME!!! Hardcode!!! 
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(re);
            return;
        case 'GET':
            if (id) {
                re = JSON.stringify(dataSource.getOne(id));
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(re);
            } else {
                re = JSON.stringify(dataSource.getAll());
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(re);
            }
            return;
        case 'PATCH':
        case 'PUT':
            dataSource.update(id, {title: 'HardCode'}); // FIXME!!! Hardcode!!! 
            re = JSON.stringify(dataSource.getOne(id));
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(re);
            return;
        case 'DELETE':
            dataSource.delete(id);
            res.writeHead(204);
            res.end(null);
            return;
    }
    
    
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(
        {
            status: "error",
            message: "method not implemented!"
        })
    );
};