const { Contact } = require("../../models/contact");

const { createError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
     next(error);
  }
}

module.exports = getContactById;