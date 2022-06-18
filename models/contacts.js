const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    if (!result) {
        return null;
    }
    return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
        return null;
    }
    const [removeContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removeContact;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact
}

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);

  const updateContact = contacts[index];

    if (index !== -1) {
      if (name) {
        contacts[index].name = name;
      }
      if (email) {
        contacts[index].email = email;
      }
      if (phone) {
        contacts[index].phone = phone;
      }
    }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updateContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}