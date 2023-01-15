
const jwt = require("jsonwebtoken");

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token) {
        const decoded = jwt.verify(token,'raj');
        if(decoded) {                           // this decoded is a object and inside that we have our token and userID
            const userID = decoded.userID;
            req.body.name = decoded.name;       // inserting the user name as well so to make recogonised that which post is of which user
            req.body.userID = userID;           // adding userID inside the object of the note so that it can be used when we work with notes
                                                // this is the very important step to develop the relatioship between two differnt collection
            next();
        }
        else {
            res.json("Please login first");
        }
    }
    else {
        res.json("Please login first");
    }
}

module.exports = {
    authenticate
}