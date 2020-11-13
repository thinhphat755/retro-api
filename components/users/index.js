const { Router } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const usersDB = require('../../services/userServices');
const pool = require('../../db');

// router.get('/', async (req, res, next) => {
//     try {
//         const result = await usersDB.getAllUsers();
//         res.json(result);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// })

router.get('/:id', async (req, res, next) => {
    try {
        const result = await usersDB.getOneUserById(req.params.id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/', async (req, res, next) => {
    try {
        const result = await usersDB.getOneUserByUsername(req.body.username);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

function validUser(user) {
    const validUserName = typeof user.username == 'string' && user.username.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '';
    return validUserName && validPassword;
}

router.post('/register', async (req, res, next) => {
    if (validUser(req.body)) {
        const user = await usersDB.getOneUserByUsername(req.body.username);
        if (user) {
            res.json({
                code: -1,
                result: {
                    message: "User already existed. Please choose another one!",
                }
            });
        } else {
            bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    next(new Error(err.message));
                }
                const result = usersDB.createOne(req.body.username, hash, req.body.name);
                res.json({
                    code: 0,
                    result: {
                        message: 'Registered successfully!'
                    }
                });
            });
        }
    } else {
        res.json({
            code: -2,
            result: {
                message: 'Invalid input!'
            }
        });
    }
})

router.put('/', async (req, res, next) => {
    if (req.body.password.trim() != '') {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                next(new Error(err.message));
            }
            const userID = req.headers["userid"];
            const result = await usersDB.editUser(userID, hash, req.body.name);

            res.json({
                code: 0,
                result: {
                    result,
                    message: 'Updated successfully!'
                }
            });
        });

    } else {
        res.json({
            code: -1,
            result: {
                message: 'Invalid input!'
            }
        });
    }
})

module.exports = router;