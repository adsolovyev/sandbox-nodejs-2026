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
    let bodyText = '';

    switch (method) {
        case 'POST':
            bodyText = '';
            req.on('data', (chunk) => {
                console.log('body chunk detected!');
                bodyText+=chunk;
            })

            req.on('end', () => {
                    try {
                        console.log('body end detected!', bodyText);
                        const body = JSON.parse(bodyText);

                        console.log('body', body);

                        re = JSON.stringify(dataSource.create(body));
                        res.writeHead(201, {'Content-Type': 'application/json'});
                        res.end(re);
                    } catch(e) {
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(
                        {
                            status: "error",
                            message: e.toString()
                        }));
                    }
            });
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
            bodyText = '';
            req.on('data', (chunk) => {
                console.log('body chunk detected!');
                bodyText+=chunk;
            })

            req.on('end', () => {
                    try {
                        console.log('body end detected!', bodyText);
                        const body = JSON.parse(bodyText);
                        console.log('body', body);

                        dataSource.update(id, body);
                        re = JSON.stringify(dataSource.getOne(id));
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(re);
                    } catch(e) {
                        res.writeHead(500, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(
                        {
                            status: "error",
                            message: e.toString()
                        }));
                    }
            });
            return;
        case 'DELETE':
            dataSource.delete(id);
            res.writeHead(204);
            res.end(null);
            return;
    }
    
    res.writeHead(501, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(
        {
            status: "error",
            message: "method not implemented!"
        })
    );
};