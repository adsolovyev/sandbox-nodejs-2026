import { User } from '../db/models.js';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const jwtSecret = 'SuperSecret';
const jwtExpiresIn = '5m';

class AuthController {

    signIn = async (req, res, next) => {

        const body = req.body;
        const { username, password } = body;

        const found = await User.findOne({
            where: {
                name: username
            }
        });

        if (!found) {
            return res.status(401).json({ status: 'unauthorized' });
        }

        const payload = found.dataValues;
        const passwordHash = payload.passwordHash;
        delete payload.passwordHash;

        if (await bcrypt.compare(password, passwordHash)) {
            const jwt = jsonwebtoken.sign({ payload }, jwtSecret, { expiresIn: jwtExpiresIn });
            res.status(200).send({
                auth: 'success',
                access_token: jwt,
            });
        } else {
            return res.status(401).json({ status: 'unauthorized' });
        }
    }

    signUp = (req, res, next) => {
        const body = req.body;
        // FIXME: validation ?
        User.create({
            name: body.username,
            passwordHash: bcrypt.hashSync(body.password, 10)
        }).then((newUser) => {
            res.status(201).send({
                status: 'success',
                data: { name: newUser.name },
            });
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        })
    }
}

const ctrl = new AuthController();
export default ctrl;