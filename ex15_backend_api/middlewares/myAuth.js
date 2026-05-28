import jsonwebtoken from 'jsonwebtoken';
const jwtSecret = 'SuperSecret';

const whitelist = ['/api/auth'];

export default () => {
    return (req, res, next) => {

        const path = req.path;

        if (whitelist.some(route => {
            return path.startsWith(route);
        })) {
            return next();
        }

        const header = req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                error: 'Missing authorization header',
            });
        }

        const jwt = header.replace('Bearer ', '');

        jsonwebtoken.verify(jwt, jwtSecret, (err, decoded) => {
            if (err) {
                return res.status(403).send({ error: err });
            }
            req.user = decoded.payload;
            next();
        });
    }
}