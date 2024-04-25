const { permissions } = require('../config.json');
class CommandHandler {
    constructor() {
      this.commands = {};
    }
  
    registerCommand(commandName, handler) {
      this.commands[commandName] = handler;
    }
  
    executeCommand(message) {
        if (!message.content.startsWith("!")) return
        const messageContent = message.content.substring(1)
        const [commandName, ...args] = messageContent.split(' ');
        if (!isAllowedToRun(commandName, message.author.id)) return
        const commandHandler = this.commands[commandName];
        if (commandHandler) {
          commandHandler.execute(args, message);
        } else {
          console.error(`Command "${commandName}" not found.`);
        }
      }
  }
  
  class WriteCommand {
    execute(args, event) {
      event.channel.send(args.join(" "))
    }
  }

  class Evalcommand {
    execute(args, e) {
      e.reply(eval(e.content.substring(e.content.indexOf(' ') + 1)).toString())
    }
  }
  const commandHandler = new CommandHandler();
  commandHandler.registerCommand('write', new WriteCommand());
  commandHandler.registerCommand('e', new Evalcommand());
  commandHandler.registerCommand('eval', new Evalcommand());

  module.exports = commandHandler;

//im still unsure how this exactly works. forward complains to @ravy in discord
function isAllowedToRun(commandName, person) {
    return permissions[commandName].blacklisted !== permissions[commandName].people.includes(person)
}
