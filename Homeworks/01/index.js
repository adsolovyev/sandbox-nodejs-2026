import { argv, exit, stdout, stderr } from 'node:process';

function showHelp() {
    stdout.write('Справка: Квадратное уравнение имеет вид: ax^2 + bx + c = 0\nУкажите свои числовые значения параметров a, b, c. \nПример ввода: node index.js 1 -3 -4\n')
}

if (argv.length === 2) {
    showHelp();
    exit(1);
}

if (argv.length !== 5) {
    stderr.write('Ошибка: Введено неверное число аргументов!\n');
    showHelp();
    exit(2);
}

const a = Number(argv[2]);
const b = Number(argv[3]);
const c = Number(argv[4]);

if (Number.isNaN(a) || Number.isNaN(b) || Number.isNaN(c)) {
    stderr.write('Ошибка: по крайней мере один из аргументов не является числом!\n');
    showHelp();
    exit(3);
}

if (a === 0) {
    stderr.write('Ошибка: уравнение не является квадратным!\n')
    showHelp()
    exit(4);
}

const D = b * b - 4 * a * c;

if (D < 0) {
    const x = -b / (2 * a);
    const xi = Math.sqrt(-D) / (2 * a);
    stderr.write(`Для введеных аргументов нет действительных корней... Зато есть комплексно-сопряженные!\n x1 = ${x} + ${xi}i, x2 = ${x} + ${xi}i\nУвы, но согласно ТЗ, это все равно ошибка.\n`);
    exit(5);
}

if (D === 0) {
    const x = -b / (2 * a);
    stdout.write(`Решение: x = ${x}\n`);
    exit(0);
}

if (D > 0) {
    const x1 = (-b + Math.sqrt(D)) / (2 * a);
    const x2 = (-b - Math.sqrt(D)) / (2 * a);
    stdout.write(`Решение: x1 = ${x1}, x2 = ${x2}\n`);
    exit(0);
}