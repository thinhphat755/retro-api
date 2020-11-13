const express = require('express');
const boardsDB = require('../../services/boardServices');
const usersDB = require('../../services/userServices');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        const userID = req.headers["userid"];
        
        let results = await boardsDB.allBoardsByUserId(userID);
        res.json({
            code: 0,
            results
        });
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async(req, res, next) => {
    try{
        let result = await boardsDB.one(req.params.id);
        console.log(result);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async(req, res, next) => {
    try{
        const userID = req.headers["userid"];
        let result = await boardsDB.add(req.body.boardName, req.body.description, userID);
        res.json(result);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', async(req, res, next) => {
    try{
        let result = await boardsDB.edit(req.params.id, req.body.boardName, req.body.description);
        //console.log(result);
        res.json(result);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/share/:id', async(req, res, next) => {
    try{
        let result = await boardsDB.shareBoard(req.params.id);
        //console.log(result);
        res.json({
            code: 0,
            result: result
        });
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/:id', async(req, res, next) => {
    try{
        let result = await boardsDB.delete(req.params.id);
        res.json('Board has been deleted!');
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;
