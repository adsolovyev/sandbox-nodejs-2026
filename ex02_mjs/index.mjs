import Square, { size1, size2, print } from "../ex01_cjs/lib.cjs";

const mySquare = new Square(size1);
print('The area of mySquare1 is ', mySquare.area());
//console.log(`The area of mySquare is ${mySquare.area()}`);

const mySquare2 = new Square(size2);
print('The area of mySquare2 is ', mySquare2.area());
//console.log(`The area of mySquare2 is ${mySquare2.area()}`);

