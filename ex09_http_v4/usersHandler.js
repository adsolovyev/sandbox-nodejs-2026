export const usersHandler = (req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(
        {
            status: "TBD",
            message: "usersHandler under construction!"
        })
    );
};