import { config } from "dotenv";
config();

import { env } from 'node:process';

import Square, { size1, size2, print } from "../lib.js";

const mySquare = new Square(size1);
print('The area of mySquare1 is ', mySquare.area());

const mySquare2 = new Square(size2);
print('The area of mySquare2 is ', mySquare2.area());

console.log("ENV TEST:", env.VAR_TEST01);

