console.log('this is my first node task...');

const fileSystem = require('fs');

fileSystem.writeFileSync('test.txt', 'this file written by nodejs..');

const x = 'surya';
console.log(x);