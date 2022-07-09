const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  try {
    const { path: tempDir, originalname } = req.file;
    const { _id } = req.user;
    const [extention] = originalname.split(".").reverse();
    const newName = `${_id}.${extention}`;
    const resultDir = path.join(avatarDir, newName);

    jimp
      .read(tempDir)
      .then((image) => image.resize(250, 250).write(resultDir))
      .catch((error) => console.log(error));

    await fs.rename(tempDir, resultDir);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;
