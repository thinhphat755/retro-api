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

tagsDB.getAllTagsByBoardId = (boardId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM tags WHERE tag_board_id = $1`, [boardId], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows);
        });
    });
}

tagsDB.deleteTagByTagId = (tagId) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM tags WHERE tag_id = $1`, [tagId], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rowCount);
        });
    });
}

tagsDB.editTagByTagId = (tagId, newContent) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE tags SET tag_content = $1 WHERE tag_id = $2 RETURNING *`, [newContent, tagId], (err, results) => {
            if(err){
                return reject(err);
            }
            return resolve(results.rows[0]);
        });
    });
}

module.exports = tagsDB;