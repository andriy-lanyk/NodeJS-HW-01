const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, './db/contacts.json');

const readContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(result);
};

function listContacts() {
  return readContacts();
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const [result] = contacts.filter(
    (contact) => contact.id === Number(contactId)
  );
  return result;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const newContacts = contacts.filter(
    (contact) => contact.id !== Number(contactId)
  );
  const [deleteContact] = contacts.filter(
    (contact) => contact.id === Number(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
