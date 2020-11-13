const pool = require('../db/index');

let boardsDB = {};

boardsDB.allBoardsByUserId = (userId) => {
    return new Promise((resolve ,reject) => {
        pool.query(`SELECT * FROM boards WHERE (user_id = $1 OR is_public = 1)`, [userId], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
};

boardsDB.one = (id) => {
    return new Promise((resolve ,reject) => {
        pool.query(`SELECT * FROM boards WHERE boards.id = $1`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

boardsDB.add = (boardName, description, userID) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO boards (name, description, user_id, is_public) VALUES ($1, $2, $3, 0) RETURNING *`, [boardName, description, userID], 
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    })
}

boardsDB.edit = (id, boardName, description) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE boards SET name = ($1), description = ($2) WHERE id = ($3) RETURNING *`, [boardName, description, id],
        (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

boardsDB.shareBoard = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE boards SET is_public = 1 WHERE id = $1 RETURNING *`, [id], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        })
    });
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