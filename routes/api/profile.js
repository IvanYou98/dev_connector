const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const mongoose = require("mongoose");


// @route GET api/profile/me
// @desc  Get current users profile
// @access Private
router.get('/me', auth, (
    async (req, res) => {
        try {
            const profile = await Profile.findOne({
                user: await User.findById(req.userId)
            }).populate('user', ['name', 'avatar']);

            if (!profile) {
                return res.status(400).json({msg: 'There is no profile for this user'});
            }
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }))


// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [auth, [
        check('status', 'Status is required').not().isEmpty(),
        check('skills', 'Sills are required').not().isEmpty()
    ]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubUsername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.userId;
        profileFields.status = status;
        profileFields.skills = skills.split(',').map(skill => skill.trim())

        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;

        // Build social object
        profileFields.social = {};
        if (githubUsername) profileFields.social.githubUsername = githubUsername;
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({user: req.userId});
            // if the profile exist, update the profile
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    {user: req.userId},
                    {$set: profileFields},
                    {new: true}
                );
                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save()
            return await res.json(profile);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error')
        }
    })

// @route      GET api/profile
// @desc       Get all profiles
// @access     Public
router.get('/',
    async (req, res) => {
        try {
            const profiles = await Profile.find().populate('user', ['name', 'avatar']);
            res.json(profiles);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error')
        }
    })


// @route       GET api/profile/user/:user_id
// @desc        Get profile by user id
// @access      Public

router.get('/user/:user_id',
    async (req, res) => {
        try {
            const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
            if (!profile) {
                return res.status(400).json({msg: 'There is no profile for this user.'});
            }
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(400).json({msg: 'There is no profile for this user.'});
            }
            res.status(500).send('Server Error');
        }
    })

// @route       DELETE api/profile/
// @desc        Delete profile, user & posts
// @access      Private

router.delete('/', auth,
    async (req, res) => {
        try {
            // @todo - remove users posts
            // Remove profile
            await Profile.findOneAndRemove({user: req.userId});
            // Remove user
            await User.findOneAndRemove({_id: req.userId});
            res.json({msg: 'User deleted.'})
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })


// @route       PUT api/profile/experience
// @desc        Add profile experience
// @access      Private
router.put('/experience', [auth,
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required').not().isEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({user: req.userId});
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

)

module.exports = router;