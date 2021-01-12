const bcrypt = require('bcryptjs')


const users = [
    {
        name: 'Admin User',
        email: 'admin@exemplo.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name: 'John Cena',
        email: 'john@exemplo.com',
        password: bcrypt.hashSync('123456', 10),

    },
    {
        name: 'Giovanna Costa',
        email: 'giovanna@exemplo.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

module.exports = users;