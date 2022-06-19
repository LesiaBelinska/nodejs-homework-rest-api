const contacts = require('../../models/contacts');
const { createError } = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = addContact;