module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");

 //code

async function main () {
 const msg = await message.channel.send(client.emote("load") + " Ping?");

const embed = new RichEmbed()  
embed.setColor(0x7289DA)  
embed.setDescription("API Latency is " + Math.round(client.ping) + "ms")
embed.setAuthor("Latency is " + (msg.createdTimestamp - message.createdTimestamp) + "ms.")
embed.setFooter("@" + message.author.username)
msg.edit(client.emote("check_b") + "Pong!", embed);
 }
 
 main()
 
 } //module.exports