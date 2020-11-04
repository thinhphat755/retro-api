const pool = require('../db/index');

let tagsDB = {};

tagsDB.add = (columnId, content, boardId) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO tags (tag_column_id, tag_content, tag_board_id) VALUES ($1, $2, $3) RETURNING *`, 
        [columnId, content, boardId], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    })
}

module.exports = tagsDB;