import { booksHandler } from "./booksHandler.js";
import { usersHandler } from "./usersHandler.js";
import { defaultHandler } from "./defaultHandler.js";
import { errorHandler } from "./errorHandler.js";

export const mainHandler = (req, res) => {
   try {
      const {url} = req;
      if(url.startsWith('/api')) {
            if (url.startsWith('/api/books')) {
               return booksHandler(req, res);
            } 
            if (url.startsWith('/api/users')) {
               return usersHandler(req, res);
            }
      }
      return defaultHandler(req, res);
   } catch(e) {
      return errorHandler(req, res, e);
   }
};