module.exports = (client) => {
	
const receiver = require("./message.js")
//const member = require("./utility/member.js")
const close = require("./debug/close.js")
const terminal = require("./utility/terminal.js")
//const error = require("./debug/error.js")
//const welcomeAnnounce = require("./utility/welcome.js")
//const afkAnnounce = require("./utility/afk.js")
//const guildReg = require("./utility/registerGuild.js")
//const bot = require("./bot.js")
//const bot = require("./bot.js")
	
//process.on('uncaughtException', error => 
	
	
	
	
	
	
		//Listening to new Messages
client.on("message", async message => {
	 receiver(client, message, null)
	})
	
//Listening to edited messages
client.on("messageUpdate", async (oldMessage, newMessage) => {
	 receiver(client, newMessage, oldMessage)
	})
/*
//Listening to joining users
client.on("guildMemberAdd", async member => {
	 welcomeAnnounce(client, member)
	})
	
	//Listening to changing status of members
client.on("presenceUpdate", async (oldMember, newMember) => {
	 afkAnnounce(client, oldMember, newMember)
	})

//Listening to (re)joined guilds
client.on("guildCreate", async guild => {
	 //if guild is new give welcome message and register with default values in guilds.json
	 guildReg(client, guild)
	})
*/ /*
//Listening to 
client.on("", async token => {
	 (client, )
	})

//Listening to 
client.on("", async token => {
	 (client, )
	})

//Listening to 
client.on("", async token => {
	 (client, )
	})

//Listening to 
client.on("", async token => {
	 (client, )
	})
*/
//Listening to errors
client.on("error", async  => {
	 //error(client, errorEvent)
	})

//Listening to service disconnects
client.on("disconnect", async closeEvent => {
	 close(closeEvent)
	})
	
//Listening to Terminal Input
client.terminal.on('line', (line) => {
	//if(line.indexOf("/") !== 0) {
		terminal(client, line)
	//	 }
	})
	
} //module.exports