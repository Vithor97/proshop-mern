const jwt = require('jsonwebtoken')
//gero um token quando o usuario for cadastrada baseado no id do usuario,
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = generateToken;