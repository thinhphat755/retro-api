const pool = require('../db/index');

let boardsDB = {};

boardsDB.all = () => {
    return new Promise((resolve ,reject) => {
        pool.query(`SELECT * FROM boards`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

boardsDB.one = (id) => {
    return new Promise((resolve ,reject) => {
        pool.query(`SELECT * FROM boards WHERE id = $1`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

boardsDB.add = (boardName, description) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO boards (name, description) VALUES ($1, $2) RETURNING *`, [boardName, description], 
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    })
}

boardsDB.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM boards WHERE id = $1`, [id], (err, results) => {
            if(err) {
                return reject(err);
            }
            return resolve(results.id);
        });
    });
}

module.exports = boardsDB;