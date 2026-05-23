import { Book } from '../db/models.js';

class BooksController {

    create = (req, res, next) => {
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
    }

    getOne = (req, res, next) => {
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
    }

    update = (req, res) => {
        const body = req.body;
        const id = +req.params.id;
        Book.update(body, {where: {
            id: id
        }}).then((updBook) => {
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
        const id = +req.params.id;
        Book.destroy({where: {
            id: id
        }}).then(() => {
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