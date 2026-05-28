import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';

import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import booksRouter from './routes/books.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';

import myAauthMiddleware from './middlewares/myAuth.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());

//app.use(bodyParser.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(express.static(join(__dirname, 'public')));

app.use(myAauthMiddleware());

app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

export default app;
