const jwt = require('jsonwebtoken')
const {withAuth} = require('../middlewares');

const User = require('../models/User')
const { appSecret } = require('../config/keys');

const secret = appSecret;

const user = (app) => {
    // Get user profile
    app.get('/user/profile', withAuth, async function(req, res) {
        const token = req.query.token;
        
        const decoded = jwt.verify(token, appSecret);

        User.findById(decoded.id, function(err, user) {
            return res.status(200).json({
                username: user.username,
                email: user.email,
                password: user.password,
                id: user._id,
            });
        })
    });
    // Register user
    app.post('/user/register', function(req, res) {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password, role: 'default'});
        if (username.match(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g)) {
            res.status(406).send("Please do not include special characters in username")
        } else if (username.length >= 10) {
            res.status(406).send("Username has to be less then 10 characters")
        } else {
            user.save(function(err) {
                if (err) {
                console.log(err);
                res.status(500).send("A user already exists with this username or email");
                } else {
                    res.status(200).send("Registered!");
                }
            });
        }
    });
    // User Login
    app.post('/user/login', function(req, res) {
        const { email, password } = req.body;
        User.findOne({ email }, function(err, user) {
            if (err) {
            console.error(err);
            res.status(500)
                .send('Internal error please try again');
                console.log(err)
            } else if (!user) {
            res.status(401)
                .send('There is no user with that email');
            } else {
                user.isCorrectPassword(password, function(err, same) {
                    if (err) {
                    res.status(500)
                        .send('Internal error please try again');
                        console.log(err)
                    } else if (!same) {
                    res.status(401)
                        .send('Incorrect email or password');
                        console.log(password + same)
                        console.log(err)
                    } else {
                    // Issue token
                    const payload = {
                        id: user._id,
                        username: user.username,
                        role: user.role,
                        email,
                    };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '200d'
                    });
                    res.status(200).send(token);
                }
            });
            }
        });
    });
    // Get User Id
    app.get('/user/get-user-info', async (req, res) => {
        const token = req.query.token;

        if (token) {
            const decoded = jwt.verify(token, appSecret);
            return res.json({
                userId: decoded.id,
                username: decoded.username,
                role: decoded.role
            });
        } else {
            return res.send(null)
        }
    })
    // Check token with middleware
    app.get('/check-token', withAuth, function(req, res) {
        res.sendStatus(200);
    });
};

module.exports = user;