export const errorHandler = (req, res, error) => {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ ServerError: error.toString() }));
};