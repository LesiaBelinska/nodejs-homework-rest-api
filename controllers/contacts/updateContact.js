const contacts = require('../../service/contacts');
const { createError } = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateContact;