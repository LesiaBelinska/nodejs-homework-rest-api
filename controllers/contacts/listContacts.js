const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit: Number(limit) })
      .populate("owner", "_id email subscription");
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = listContacts;