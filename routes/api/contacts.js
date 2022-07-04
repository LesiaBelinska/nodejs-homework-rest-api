const express = require('express');

const ctrl = require("../../controllers/contacts");

const { authenticate, validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();


router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId',isValidId, ctrl.getContactById);

router.post('/', authenticate, validation(schemas.add), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put('/:contactId', isValidId, validation(schemas.add), ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, validation(schemas.updateFavorite), ctrl.updateFavorite);

module.exports = router;

