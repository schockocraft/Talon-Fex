module.exports = (client) => {

const Discord = require("discord.js");

client.commands = new Discord.Collection();
    
client.commands.set('reload', require("../commands/reload.js"))
    
client.aliases = new Discord.Collection()

client.cmdMeta = {
	 "all": {
	 	"permissions": [
	 	{
		 	 "channels": ["all"],
		 	 "roles": ["all"],
		 	 "users": [String(client.config.suid)],
		 	 "permission": "none"
		 	 }
		 	]
	 	},
		"reload": {
		"permissions": []
		}
 }

} //module.exports