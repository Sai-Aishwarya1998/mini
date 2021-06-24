const jwt = require('jsonwebtoken');

//Returns true if the user is verified/logged in and had a jwt token assigned
//Use as middleware ex: booking.js -> /bookings route

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(error){
        res.status(402).send('Invalid token');
    }
}