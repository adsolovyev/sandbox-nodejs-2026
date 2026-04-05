export const defaultHandler = (req, res) => {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(
        {
            status: "error",
            message: "resource not found"
        })
    );
};