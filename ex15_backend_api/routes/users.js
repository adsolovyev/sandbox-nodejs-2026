import express from 'express';
const router = express.Router();
import ctrl from '../controllers/user.js';

router.get('/', ctrl.getAll);

export default router;
