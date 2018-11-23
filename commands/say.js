module.exports = (client, message, args) => {


		const { Client, RichEmbed } = require("discord.js");



 //code
 
 //console.log(args[0])
 
 if (args[0] == "\$debug") {
  //var dump = 
  args.shift()
  }
 else {
  message.delete()
  }
 
 message.channel.send(args.join(" "))
 } 