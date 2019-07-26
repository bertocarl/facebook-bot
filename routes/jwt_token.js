const expressJwt = require('express-jwt');
const config = process.env.SECRET

"secret" = process.env.SECRET,


module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret });
}
