const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');


router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return    res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    const hashedPassword = await bcrypt.hash(req.body.password,10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        admin: req.body.admin //added
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return    res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(401).send('Email does not exist');

    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(401).send('Incorrect Password');

    const token = jwt.sign({_id: user._id , admin: user.admin}, process.env.TOKEN_SECRET, { expiresIn: '30m'});
    res.header('auth-token', token).send({token:token,admin:user.admin});
});

module.exports = router;