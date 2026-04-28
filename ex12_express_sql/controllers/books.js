import ds from "../dataSources/dataSourceJSON.js";

class BooksController {

    constructor(dataSource) {
        this.ds = dataSource;
    }

    create = (req, res, next) => {
        const body = req.body;
        try {
            const re = this.ds.create(body);
            res.status(201).send(re);
        } catch (e) {
            res.status(500).send({
                status: "error",
                message: e.toString()
            });
        }
    }

    getAll = (req, res, next) => {
        try {
            const re = this.ds.getAll();
            res.status(200).send(re);
        } catch (e) {
            res.status(500).send({
                status: "error",
                message: e.toString()
            });
        }
    }

    getOne = (req, res, next) => {
        const id = +req.params.id;
        try {
            res.status(200).send(this.ds.getOne(id));
        } catch (e) {
            res.status(500).send({
                status: "error",
                message: e.toString()
            });
        }

    }

    update = (req, res) => {
        const body = req.body;
        const id = +req.params.id;
        try {
            this.ds.update(id, body);
            res.status(200).send(this.ds.getOne(id));
        } catch (e) {
            res.status(500).send({
                status: "error",
                message: e.toString()
            });
        }
    }

    delete = (req, res, next) => {
        const id = +req.params.id;
        try {
            this.ds.delete(id);
            res.status(204).send(null);
        } catch (e) {
            res.status(500).send({
                status: "error",
                message: e.toString()
            });
        }
    }
}

const ctrl = new BooksController(ds);
export default ctrl;