const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '123456789',
    user: 'root',
    database: 'retro_react_db',
    host: 'localhost',
    port: '3306'
});

let boardsDB = {};

boardsDB.all = () => {
    return new Promise((resolve ,reject) => {
        pool.query(`SELECT * FROM boards`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

boardsDB.one = (id) => {
    return new Promise((resolve ,reject) => {
        pool.query(`SELECT * FROM boards WHERE id = ?`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
}

module.exports = boardsDB;