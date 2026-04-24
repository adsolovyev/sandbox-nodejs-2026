import express from 'express';
const router = express.Router();
import ctrl from '../controllers/books.js';

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', ctrl.create);
router.patch('/:id', ctrl.update);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

export default router;