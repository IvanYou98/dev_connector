const express = require('express');
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')
const router = express.Router();
const Post = require('../../models/Post')
const User = require('../../models/User')


// @route POST api/posts
// @desc  Create a post
// @access Private
router.post('/', [auth, [
        check('text', 'Text is required').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        try {
            const user = await User.findById(req.userId).select('-password');
            let newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.userId
            });
            newPost = await newPost.save();
            return res.json(newPost);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    })

module.exports = router;