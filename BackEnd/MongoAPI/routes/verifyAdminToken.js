const jwt = require('jsonwebtoken');

//Returns true if the user is admin
//Use as middleware ex: booking.js -> /pantry route

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');

    const decoded = jwt.decode(token);
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decoded.admin == true) {
            req.user = verified;
            next();
        }
        else{
            res.send("Admin access only");
        }
    }catch(error){
        res.status(402).send('Invalid token');
    }
}