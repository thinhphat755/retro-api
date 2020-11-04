const express = require('express');
const tagsDB = require('../../services/tagServices');

const router = express.Router();

router.post('/', async(req, res, next) => {
    try{
        let result = await tagsDB.add(req.body.columnId, req.body.content, req.body.boardId);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;