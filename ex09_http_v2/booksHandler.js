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
        const id = +urlArr[urlArr.length-1]; // FIXME:
    }

    switch (method) {
        case 'POST':
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(`{
            "id":1,
            "name":"Преступление и Наказание",
            "author":"Ф.М.Достоевский",
            "description":"lorem"
            }`);
            return;
        case 'GET':
            if (id) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(`{
                "id":1,
                "name":"Преступление и Наказание",
                "author":"Ф.М.Достоевский",
                "description":"lorem"
                }`);
            } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(`[{
            "id":1,
            "name":"Преступление и Наказание",
            "author":"Ф.М.Достоевский",
            "description":"lorem"
            }]`);
            }
            return;
        case 'PATCH':
        case 'PUT':
            // if(!id)
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(`{
            "id":1,
            "name":"Преступление и Наказание!",
            "author":"Ф.М.Достоевский",
            "description":"lorem"
            }`);
            return;
        case 'DELETE':
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