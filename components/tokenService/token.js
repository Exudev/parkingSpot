const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateToken(userId) {
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
}
function generateTokenLink(link, token) {
    const tokenLink = link + "/" + token;
    return tokenLink;
}



module.exports ={
    createToken :generateToken,
    createTokenLink: generateTokenLink,

}