module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");
		const get = require('./git.js')

 //code
 
 get(client, message, ["README.md"])
 
 
 } //module.exports