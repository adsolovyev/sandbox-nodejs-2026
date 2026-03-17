import {createServer} from 'node:http';

// create a local server to receive data from
const server = createServer((req, res) => {

    console.log('req.headers:', req.headers);

    res.writeHead(200, {
        'Content-Type': 'text/html', // 'application/json'
        'My-Custom-Header-89': 'My Ctustom Header Value'
        }
    );
    res.end("<b>Hello from NodeJS server</b>");
});

//     res.end(JSON.stringify({
//         data: 'Hello World!',
//     }));
// });

server.listen(3000);