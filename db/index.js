const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'rwizknzfpssofl',
    password: '6702737f3b05e6e7f4fbe0a2b7e510a1784555fa2a2edacf287be2d49e105b96',
    database: 'de2ffqjr7iv2je',
    host: 'ec2-52-44-235-121.compute-1.amazonaws.com',
    port: 5432
});

// const pool = new Pool({
//     user: 'postgres',
//     password: '123456789',
//     database: 'retro-react-db',
//     host: 'localhost',
//     port: 5432
// });

module.exports = pool;