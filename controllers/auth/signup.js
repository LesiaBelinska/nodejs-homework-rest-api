const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const idGenerate = require("uuidv4");

const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = idGenerate();
    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      to: email,
      subject: "Confirmation of successful registration",
      html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click for confirm email</a>`,
    };
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
    await sendMail(mail);
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
