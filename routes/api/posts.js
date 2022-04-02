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

// @route GET api/posts/
// @desc  Get all posts
// @access Private
router.get('/', auth,
    async (req, res) => {
        try {
            const posts = await Post.find().sort('-date');
            res.json(posts);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Sever Error');
        }
    })


// @route GET api/posts/:postId
// @desc  Get a post by Id
// @access Private
router.get('/:post_id', auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id);
            if (!post) {
                return res.status(404).json({msg: 'Post not found'});
            }
            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Sever Error');
        }
    })


// @route DELETE api/posts/:post_id
// @desc  Delete a post
// @access Private
router.delete("/:post_id", auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id);
            if (!post) {
                return res.status(404).json({msg: 'Post not found'});
            }
            if (post.user.toString() !== req.userId) {
                return res.status(401).json({msg: 'User not authorized'});
            }
            await post.remove();
            res.json({msg: 'Post removed'})
        } catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Post not found'});
            }
            res.status(500).send('Server Error');
        }
    })

// @route PUT api/posts/like/:post_id
// @desc  Like a post
// @access Private
router.put('/like/:post_id', auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id);
            // check if the book has already been liked by the user
            if (post.likes.filter(like => like.user.toString() === req.userId).length > 0) {
                return res.status(400).json({msg: 'Post already liked!'});
            }
            post.likes.unshift({user: req.userId});
            await post.save();
            res.json(post.likes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })


// @route PUT api/posts/like/:post_id
// @desc  Like a post
// @access Private
router.put('/unlike/:post_id', auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id);
            // check if the book has already been liked by the user
            if (post.likes.filter(like => like.user.toString() === req.userId).length === 0) {
                return res.status(400).json({msg: 'Post has not yet been liked'});
            }
            post.likes = post.likes.filter(like => like.user.toString() !== req.userId);
            post.save();
            res.json(post.likes);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

// @route POST api/posts/comment/:post_id
// @desc  Comment on a post
// @access Private
router.post('/comment/:post_id', [auth,
        check('text', 'Text is required').not().isEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()})
            }
            const user = await User.findById(req.userId).select('-password');
            const post = await Post.findById(req.params.post_id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.userId
            }

            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        } catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Post not found'});
            }
            res.status(500).send('Sever Error');
        }
    })


// @route DELETE api/posts/comment/:comment_id
// @desc  Delete a post
// @access Private
router.delete('/comment/:post_id/:comment_id', auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.post_id);
            // find the comment according to comment_id
            const comment = post.comments.find(comment => comment.id === req.params.comment_id);
            if (!comment) {
                return res.status(404).json({msg: 'Comment does not exist'});
            }
            // check user
            if (comment.user.toString() !== req.userId) {
                return res.status(401).json({msg: 'You are not authorized to delete this post'});
            }

            post.comments = post.comments.filter(comment => comment.id !== req.params.comment_id);
            await post.save();
            res.json(post.comments);
        } catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Post not found'});
            }
            res.status(500).send('Sever Error');
        }
    })

module.exports = router;