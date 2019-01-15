module.exports = (client, message, command, args) => {

		const { Client, RichEmbed } = require("discord.js");
		//client.config.suid 
	 //client.config.permrole
  //client.cmdMeta
  
//global > guild > channel/user/role/[combined]
 
var cmdPerms = []
 
 
//custom guild permissions

 if (message.channel.type == "text" && Object.keys(client.guildsMeta).includes(message.guild.id)) {
  if (Object.keys(client.guildsMeta[message.guild.id].permissions).includes(command)) {
  	client.guildsMeta[message.guild.id].permissions[command].forEach(permSet => {
  		cmdPerms.push(permSet)
  		} )
  	}
 	}

//static global permissions
if (Object.keys(client.cmdMeta).includes(command)) {
 client.cmdMeta[command].permissions.forEach(permSet => {
 cmdPerms.push(permSet)
 } )
}
  client.cmdMeta.all.permissions.forEach(permSet => {
 cmdPerms.push(permSet)
 } )

//temporary permissions
 
//...

//check if any permission set matches in channel AND role AND user; all (/none) is default and matches any
if (cmdPerms.some(permSet => {
	
	try {
		if (message.member.hasPermission(permSet.permission)) {
			var hasPerm = true
			}
		else {
			var hasPerm = false
			}
		}
	catch (error) {
		var hasPerm = false
		}
	try {
	 if (permSet.roles.some(role => {message.member.roles.has(role)})) {
			var hasRole = true
			}
		else {
			var hasRole = false
			}
		}
	catch (error) {
		var hasRole = true
		}
	
 if ((permSet.channels.includes(message.channel.id) || permSet.channels[0] == "all") && (hasRole || permSet.roles[0] == "all") && (permSet.users.includes(message.author.id) || permSet.users[0] == "all") && (hasPerm || permSet.permission == "none")) {
 	 //permission matches
 	return true
  	} } ) ) {
 return true
 	}
else {
//permission doesn't match
console.log("user is not permitted to do this")
 	console.log(" ")
const plaintext = "🛡 Sorry, you don't have permissions to use this!"
const embed = new RichEmbed()  
embed.setTitle("Command: " + command)
embed.setColor(0xCC0000)  
embed.setDescription("Ask an Administrator or " + client.superuser.toString())
//embed.setAuthor("Permissions")
embed.setFooter("@" + message.author.username)
message.channel.send(plaintext, embed);
return false
 }
} //module.exports