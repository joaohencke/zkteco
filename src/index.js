const { read } = require("./users");
const { removeUsers } = require("./zklib");

console.time('process');
read().then(removeUsers).then(console.log).catch(console.log).then(() => console.timeEnd('process'));
