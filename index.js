const { Command } = require('commander');
const chalk = require('chalk');
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require('./contacts');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
        .then((contacts) => console.table(contacts))
        .catch(console.error);
      break;

    case 'get':
      getContactById(id)
        .then((contact) => {
          if (contact) {
            console.log(chalk.blue('Yes!!! You find contact!'));
            console.log(contact);
          } else {
            console.log(
              chalk.yellowBright('Sorry!!! We don"t have such contact!')
            );
          }
        })
        .catch(console.error);
      break;

    case 'add':
      addContact(name, email, phone)
        .then((contact) => {
          console.log(chalk.green('Yes!!! New contact was added!'));
          console.log(contact);
        })
        .catch(console.error);
      break;

    case 'remove':
      removeContact(id)
        .then((contact) => {
          if (contact) {
            console.log(chalk.cyan('Notice!!! This contact was delete!'));
            console.log(contact);
          } else {
            console.log(
              chalk.yellowBright('Sorry!!! We don"t have such contact!')
            );
          }
        })
        .catch(console.error);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
