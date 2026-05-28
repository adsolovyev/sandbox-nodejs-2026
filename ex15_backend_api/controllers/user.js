import { User } from '../db/models.js';

class UsersController {

    getAll = (req, res, next) => {
        User.findAll().then((users) => {
            res.status(200).send({
                status: 'success',
                data: users.map(itm=>{
                    return {
                        id: itm.id,
                        name: itm.name
                    }
                }),
            });
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        });
    }

}

const ctrl = new UsersController();
export default ctrl;