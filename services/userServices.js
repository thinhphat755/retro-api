const pool = require('../db/index');
const usersDB = {};

usersDB.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users`, (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
}

usersDB.getOneUserById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

usersDB.getOneUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE username = ($1)`, [username], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

usersDB.createOne = (username, password, name) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *`, [username, password, name],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

usersDB.editUser = (userID, password, name) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE users SET password = ($1), name = ($2) WHERE id = ($3) RETURNING *`, [password, name, userID], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

module.exports = usersDB;