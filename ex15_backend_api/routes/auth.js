import express from 'express';
const router = express.Router();
import ctrl from '../controllers/auth.js';

router.post('/signin', ctrl.signIn);
router.post('/signup', ctrl.signUp);

export default router;
