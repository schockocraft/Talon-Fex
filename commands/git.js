module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");

 //code
 
 const embed = new RichEmbed()
  embed.setFooter("@" + message.author.username)
  embed.setAuthor("schockocraft/Talon-Fex", "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/")
  embed.setColor(0x24292E)
  //message.respond(client.captions[client.guildsMeta[message.guild.id].language].git.main, embed)
  message.respond(message.c.git.main, embed)
 
 } //module.exports