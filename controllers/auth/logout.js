const { User } = require("../../models/user");

const { createError } = require("../../helpers");

const logout = async (req, res, next) => {
    try {
        const { _id } = req.user;
        await User.findByIdAndUpdate(_id, { token: "" });

        if (!_id) {
            throw createError(401)
        }
        res.status(204).json();
    } catch (error) {
        next(error)
    }
}

module.exports = logout;