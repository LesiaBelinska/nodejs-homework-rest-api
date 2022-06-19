const express = require('express');
const Joi = require('joi');

const contacts = require('../../models/contacts');

const { createError } = require("../../helpers");

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message
    // })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404);
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
    }
    res.json(result);
  } catch (error) {
     next(error);
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message
    // })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
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
})

router.delete('/:contactId', async (req, res, next) => {
 try {
   const { contactId } = req.params;
   const result = await contacts.removeContact(contactId);
   if (!result) {
     throw createError(404)
   }
   res.json({
     message: "Book deleted"
   })
 } catch (error) {
   next(error);
 }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, res.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;



