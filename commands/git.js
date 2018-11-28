module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");
	 const permcheck = require("../permissions.js")

 //code
 
 const embed = new RichEmbed()
  embed.setFooter("@" + message.author.username)
  embed.setAuthor("schockocraft/Talon-Fex", "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/")
  embed.setColor(0x24292E)
  //message.respond(client.captions[client.guildsMeta[message.guild.id].language].git.main, embed)
 if (args[0] == "update" || args[0] == "$update") {
 	 if (permcheck(client, message, "all")) { //temporary local permission request, until permissions.js test for args
 	 
 	 //get latest commit message:

		embed.setDescription('*„' + require('child_process').execSync('git log -1 --format=format:%s', {cwd: '../Talon-Fex/'}) + '“*')
		
	if (args[0] == "update") {
 	 message.delete()
 	 	  message.channel.send(message.c.commands.git.update, embed)
 	 	  }
 	 	 else {
 	 	 	 message.respond(message.c.commands.git.update, embed)
 	 	 	 }
 	 	 }
  }
 else {
  message.respond(message.c.commands.git.main, embed)
  }
 
 } //module.exports