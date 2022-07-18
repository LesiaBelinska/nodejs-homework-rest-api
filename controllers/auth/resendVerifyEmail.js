const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404);
    }
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Confirmation of successful registration",
      html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click for confirm email</a>`,
    };
    await sendMail(mail);
    res.json({
      massage: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
