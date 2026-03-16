import { env } from 'node:process';
import { config } from "dotenv";
config();

console.log('MY_VAR1 = ', env.MY_VAR1);