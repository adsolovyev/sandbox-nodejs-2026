import { Book, UserRole } from '../db/models.js';

class BooksController {

    create = (req, res, next) => {

        // Авторизация - добавить логику проверки наличия у пользователя роли admin или manager
        return res.status(406).json({
            error: 'FIXME: User user does not have roles admin or manager (add authorization!)',
        });

        const body = req.body;
        // FIXME: validation ?
        Book.create(body).then((newBook) => {
            res.status(201).send({
                status: 'success',
                data: newBook,
            });
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        })
    }

    getAll = (req, res, next) => {
        // Авторизация -- выделение полномочий! Т.е. можно выдавать список книг только пользователям с хотябы одной ролью!
        UserRole.findAll({ where: { userId: req.user.id } }).then((rolesRef) => {
            if (rolesRef.length > 0) {
                Book.findAll().then((books) => {
                    res.status(200).send({
                        status: 'success',
                        data: books,
                    });
                }).catch((err) => {
                    res.status(500).send({
                        status: "error",
                        message: err.toString()
                    });
                });
            } else {
                return res.status(406).json({
                    error: 'User user does not have any roles',
                });
            }
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        });
    }

    getOne = (req, res, next) => {
        // Авторизация -- выделение полномочий! Т.е. можно выдавать список книг только пользователям с хотябы одной ролью!
        UserRole.findAll({ where: { userId: req.user.id } }).then((rolesRef) => {
            if (rolesRef.length > 0) {
                const id = +req.params.id;
                Book.findByPk(id).then((book) => {
                    res.status(200).send({
                        status: 'success',
                        data: book,
                    });
                }).catch((err) => {
                    res.status(500).send({
                        status: "error",
                        message: err.toString()
                    });
                });
            } else {
                return res.status(406).json({
                    error: 'User user does not have any roles',
                });
            }
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        });
    }

    update = (req, res) => {

        // Авторизация - добавить логику проверки наличия у пользователя роли admin или manager
        return res.status(406).json({
            error: 'FIXME: User user does not have roles admin or manager (add authorization!)',
        });


        const body = req.body;
        const id = +req.params.id;
        Book.update(body, {
            where: {
                id: id
            }
        }).then((updBook) => {
            res.status(201).send({
                status: 'success',
                data: updBook,
            });
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        })
    }

    delete = (req, res, next) => {

        // Авторизация - добавить логику проверки наличия у пользователя роли admin или manager
        return res.status(406).json({
            error: 'FIXME: User user does not have roles admin or manager (add authorization!)',
        });

        const id = +req.params.id;
        Book.destroy({
            where: {
                id: id
            }
        }).then(() => {
            res.status(204).send(null);
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        });
    }
}

const ctrl = new BooksController();
export default ctrl;