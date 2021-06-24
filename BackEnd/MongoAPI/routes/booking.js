const router = require('express').Router();
const verify = require('./verifyToken');
const adminverify = require('./verifyAdminToken');


router.get('/bookings', verify, (req, res) => {
    console.log(req.user)
    res.json({
        user: req.user
    });
});

router.get('/pantry', adminverify, (req,res) => {
    res.json({
        posts: {
            title: 'Pantry',
            description: 'Only admins can access'
        }
    });
});


module.exports = router;