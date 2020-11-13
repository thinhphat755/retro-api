const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client("173799481794-v2vsrs8kpadgubisec0tlkpl0474ful1.apps.googleusercontent.com");

const usersDB = require('../../services/userServices');
//const { route } = require('../users');

function validUser(user) {
    const validUserName = typeof user.username == 'string' && user.username.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '';
    return validUserName && validPassword;
}

router.post('/login', async (req, res, next) => {
    if (validUser(req.body)) {
        const user = await usersDB.getOneUserByUsername(req.body.username);
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    next(new Error(err.message));
                } else {
                    if (result) {
                        req.session.userID = user.id;
                        req.session.isAuth = true;
                        res.json({
                            code: 0,
                            result: {
                                message: "Login successfully!",
                                user: user,
                            }
                        });
                    } else {
                        res.json({
                            code: -1,
                            result: {
                                message: "Username or password is not correct. Please try again!",
                            }
                        });
                    }
                }
            });
        } else {
            res.json({
                code: -2,
                result: {
                    message: 'Account has not been existed!',
                }
            });
        }
    } else {
        res.json({
            code: -3,
            result: {
                message: 'Invalid input!',
            }
        });
    }
});

router.post('/logout', async (req, res, next) => {
    req.session.userID = null;
    req.session.isAuth = false;
    res.json({
        code: 0,
        result: {
            message: "Log out successfully!"
        }
    })
});

router.post('/googleLogin', (req, res) => {
    const { tokenId } = req.body;

    client.verifyIdToken({ idToken: tokenId, audience: "173799481794-v2vsrs8kpadgubisec0tlkpl0474ful1.apps.googleusercontent.com" })
        .then(async (response) => {
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                const user = await usersDB.getOneUserByUsername(email);
                if (user) {
                    req.session.userID = user.id;
                    req.session.isAuth = true;
                    res.json({
                        code: 0,
                        result: {
                            message: "Login successfully!",
                            user: user,
                        }
                    });
                } else {
                    bcrypt.hash(email, saltRounds, (err, hash) => {
                        // Store hash in your password DB.
                        if (err) {
                            next(new Error(err.message));
                        }
                        const result = usersDB.createOne(email, hash, name);
                        const user = result;
                        req.session.userID = user.id;
                        req.session.isAuth = true;
                        res.json({
                            code: 0,
                            result: {
                                message: "Login successfully!",
                                user: user,
                            }
                        });
                    });
                }
            }
        })
});

router.post('/facebookLogin', async (req, res) => {
    const { email, userid, name } = req.body;
    
    if (email && userid && name) {
        const user = await usersDB.getOneUserByUsername(userid);
        
        if (user) {
            req.session.userID = user.id;
            req.session.isAuth = true;
            res.json({
                code: 0,
                result: {
                    message: "Login successfully!",
                    user: user,
                }
            });
        } else {
            bcrypt.hash(email, saltRounds, (err, hash) => {
                // Store hash in your password DB.
                if (err) {
                    next(new Error(err.message));
                }
                const result = usersDB.createOne(userid, hash, name);
                const user = result;
                req.session.userID = user.id;
                req.session.isAuth = true;
                res.json({
                    code: 0,
                    result: {
                        message: "Login successfully!",
                        user: user,
                    }
                });
            });
        }
    }
});

module.exports = router;