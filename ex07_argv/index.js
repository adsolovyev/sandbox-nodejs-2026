import { argv, exit, stderr } from 'node:process';

function showHelp(){
    console.log('Example arguments: a=2 b=5');
}

if(argv.length === 2) {
    showHelp();
    exit(0);
}

// console.log('argv', argv);

const param1 = argv[2];

if (['-h', '--help'].includes(param1)) {
    showHelp();
    exit(0);
}

let a = null;
let b = null;

for(const param of argv) {
    if(param.startsWith('a=')) {
        const splittedA = param.split('=');
        a = +splittedA[1];
        if (a && b) {
            break;
        }
    }
    if(param.startsWith('b=')) {
        const splittedB = param.split('=');
        b = +splittedB[1];
        if (a && b) {
            break;
        }
    }
}

// console.log('DEBUG >>> ', a, b);

if (a && b) {
    console.log('a + b = ', a + b);
    exit(0);
} else {
    stderr.write('Error a or b (or both) values');
    exit(2);
}