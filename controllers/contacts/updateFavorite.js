const { Contact } = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateFavorite;