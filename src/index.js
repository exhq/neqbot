const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const commandHandler = require('./ilovejava.js')

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map((a)=>{
      return GatewayIntentBits[a]
    }),
  });
  


client.once(Events.MessageCreate, e => {
  commandHandler.executeCommand(e)

})


client.login(token);
