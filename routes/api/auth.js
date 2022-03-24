const express = require('express');
const auth = require('../../middleware/auth')
const router = express.Router();

const User = require('../../models/User')
const {check, validationResult} = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");


// @route GET api/users
// @desc  Test route
// @access Public
router.get('/', auth, (
    async (req, res) => {
    try {
        console.log("user id: ", req.userId);
        const user = await User.findById(req.userId).select({password: 0});
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}))

// @route POST api/auth
// @desc  Authenticate user & get token
// @access Public
router.post('/',
    [
        check('email', 'Please include a valid email')
            .isEmail(),
        check('password', 'Password is required')
            .exists()
    ],
    (
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                })
            }

            const {name, email, password} = req.body;

            try {
                // See if user exist
                let user = await User.findOne({email});
                if (!user) {
                    return res.status(400).json({
                        errors: [{msg: "Invalid Credentials"}]
                    })
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return res
                        .status(400)
                        .json({errors: [{msg: 'Invalid Credentials'}]})
                }

                // Return jsonwebtoken
                const payload = {user: {id: user.id}};
                jwt.sign(
                    payload,
                    config.get('jwtToken'),
                    {expiresIn: 360000},
                    (err, token) => {
                        if (err) throw err;
                        res.json({token})
                    })
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server error');
            }
        }))



module.exports = router;