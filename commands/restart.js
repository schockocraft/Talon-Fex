module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");

 //code
 
async function main () {
 if (message !== null) {
  var msg = await message.channel.send(client.emote("load") + message.c.restart.pending);
  msg.newtext = client.emote("check_b") + " " + message.c.restart.finished
  }
 else {
 	 var msg = null
 	 }
 console.log("restarting bot...")
 const restart = require('../restart.js')
 restart(client, msg)
 }
 
 main()
 
 } //module.exports