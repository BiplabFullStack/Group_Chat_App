const jwt=require('jsonwebtoken');
const generateAccessToken = (id,firstname,email) => {
    return jwt.sign({userId:id,name:firstname,email:email},process.env.secret)
}

module.exports.generateAccessToken = generateAccessToken;