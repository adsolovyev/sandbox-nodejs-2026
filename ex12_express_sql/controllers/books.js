// import ds from "../datasources/dataSourceJSON.js";
import ds from "../datasources/dataSourceSQLPostgres.js";

class BooksController {

    constructor(dataSource) {
        this.ds = dataSource;
    }

    create = (req, res, next) => {
        const body = req.body;
        this.ds.create(body).then((resp) => {
            res.status(201).send({
                status: 'success',
                data: resp[0],
            });
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        });
    }

    getAll = (req, res, next) => {
        this.ds.getAll().then((resp) => {
            res.status(200).send({
                status: 'success',
                data: resp[0],
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

        this.ds.getOne(id).then((resp) => {
            res.status(200).send({
                status: 'success',
                data: resp[0][0],
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

        this.ds.update(id, body).then(() => {

            this.ds.getOne(id).then((resp) => {
                res.status(201).send({
                    status: 'success',
                    data: resp[0][0],
                });
            }).catch((err) => {
                res.status(500).send({
                    status: "error",
                    message: err.toString()
                });
            });
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        });
    }

    delete = (req, res, next) => {
        const id = +req.params.id;
        this.ds.delete(id).then((resp) => {
            res.status(204).send(null);
        }).catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.toString()
            });
        });
    }
}

const ctrl = new BooksController(ds);
export default ctrl;