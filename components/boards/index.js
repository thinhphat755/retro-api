const express = require('express');
const boardsDB = require('../../services/boardServices');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        let results = await boardsDB.all();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async(req, res, next) => {
    try{
        let result = await boardsDB.one(req.params.id);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
