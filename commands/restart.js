module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");

 //code
 
 const embed = new RichEmbed()
 
async function main () {
 if (message !== null) {
  embed.setFooter("@" + message.author.username)
  var msg = await message.channel.send(client.emote("load") + " " + message.c.commands.restart.pending);
  msg.newtext = client.emote("check_b") + " " + message.c.commands.restart.finished
  }
 else {
 	 var msg = null
 	 }
 console.log("restarting bot...")
 const restart = require('../execrestart.js')
 try {
  restart(client, msg)
  }
 catch (error) {
  var resErr = client.resolve(error)
  embed.setColor(0xffcc4d)
  embed.setAuthor("Restart")
  embed.setDescription(resErr)
 // embed.setDescription(resErr.slice(0, resErr.search(/\n[ ]+at eval [(]eval at module[.]exports.+eval[.]js/)))
  if (msg) msg.edit("⚠" + message.c.commands.restart.error, embed)
  }
 }
 
 main()
 
 } //module.exports