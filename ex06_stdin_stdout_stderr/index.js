import { stdin, stdout, stderr, exit, argv } from 'node:process';

// stdin.pipe(stdout); // перенаправление потока ввода в поток вывода

let data = '';

stdin.on ('readable', () => {
    const chunk = stdin.read();
    if(chunk !== null) {
        data += chunk;
    }
    // console.log('r');
});

stdin.on ('end', () => {
    console.log('Data', data); 
    
    // throw new Error('!!!'); // node вернет код 1 (сама)

    stdout.write('Program Finished.\n');
    // exit(0); // установка кода ответа в 0

    stderr.write('Program Error.\n');
    // exit(7); // установка кода ответа 7

});
