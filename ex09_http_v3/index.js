import {createServer} from 'node:http';
import { mainHandler } from './mainHandler.js';
const server = createServer(mainHandler);
server.listen(3000);