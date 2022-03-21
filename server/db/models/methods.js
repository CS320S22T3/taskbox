// import users.js somehow
const { DataTypes } = require("sequelize"); // Import the built-in data types
const bcrypt = require('bcrypt');

var usersTable = require("./taskbox/server/db/models/users.js")
// ** not sure if any of this works ** 

function get_id_by_email(input_id) {
    usersTable.findOne({
        where: { id: input_id },
        attributes: ['id', ['email', 'password_digest']]
    }).then(user => {

    });
    return user.get('email');
}

function verify_password(input_email, input_password) {
    usersTable.findOne({
        where: { email: input_email },
        attributes: ['id', ['email', 'password_digest']]
    }).then(user => {

    });

    email = user.get('email');
    password = user.get('password');
    salt = await bcrypt.genSaltSync(10, 'a');
    encrypted_input = bcrypt.hashSync(input_password, salt);
    return password === encrypted_input;
}

print(get_id_by_email("employee@development.com"));