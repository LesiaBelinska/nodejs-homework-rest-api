const {Contact} = require("../../models/contact")

const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = addContact;