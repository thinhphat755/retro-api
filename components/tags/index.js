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

router.get('/:boardId', async(req, res, next) => {
    try{
        let result = await tagsDB.getAllTagsByBoardId(req.params.boardId);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/:tagId', async(req, res, next) => {
    try{
        let result = await tagsDB.deleteTagByTagId(req.params.tagId);
        res.json('Tag has been deleted!');
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/:tagId', async(req, res, next) => {
    try{
        let result = await tagsDB.editTagByTagId(req.params.tagId, req.body.newContent);
        res.json(result);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;