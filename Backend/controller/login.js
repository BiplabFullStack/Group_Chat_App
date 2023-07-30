const User = require('../model/signUp');
const bcrypt = require('bcrypt')
const { emailInValid, passwordInValid } = require('../validation/validation')

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (emailInValid(username) == true || passwordInValid(password) == true) {
            console.log("Something is missing");
            return res
                .status(400)
                .json({ success: false, err: "Something is missing" })
        }
        const response = await User.findOne({ where: { email: username } })
        console.log(response.password);
        bcrypt.compare(password, response.password, (err, result) => {
            if (result) {
                console.log("Login Successfully");
                return res
                    .status(200)
                    .json({ success: true, msg: "Login Successfully" })
            } else {
                console.log("Wrong Password");
            }
        })
    }
    catch (err) {
        console.log("Invalid username and password");
    }

}

module.exports.login = login;
