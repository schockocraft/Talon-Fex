module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");

 //code
 
async function main () {
 if (message !== null) {
  const plaintext = "Committing suicide..."
  const embed = new RichEmbed()  
  embed.setImage("https://i.imgflip.com/19f1vf.jpg")
  embed.setColor(0x36393E)  
  embed.setFooter("@" + message.author.username)
  await message.channel.send(plaintext, embed);
  }
  console.log("stopping bot...")
  client.destroy()
  process.exit()
 }
 
 main()
 
 } //module.exports