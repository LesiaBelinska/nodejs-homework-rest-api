const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models/user");

const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw createError(401, "Email or password is wrong")
        }
        if (!bcrypt.compare(password, user.password)) {
            throw createError(401, "Email or password is wrong")
        }
        const payload = {
            id: user._id
        };
        const token = jwt.sign(payload,  SECRET_KEY, { expiresIn: "1h" });
        res.json({
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = login;