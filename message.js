module.exports = (client, message, editedMessage) => {
	
	const bot = require("./bot.js")
	const reactions = require("./utility/reaction.js")
	const help = require("./commands/help.js");
	const permcheck = require("./permissions.js")
	
	/*
message.member.displayColor
message.member.displayName
message.author.username
message.guild.me.displayColor
 */
 
//command runtime event handler
const EventEmitter = require('events');
 
//class eventHandler extends EventEmitter {}
 
 message.runtimeEvents = new EventEmitter();
 
 
 
 
async function createResponse(text, embed) {
	
	console.log("create response")
 const 	response = await message.channel.send(text, embed)
 console.log("registering response " + response.id + " to " + message.id)
 client.responses.set(message.id, response.id)
 console.log("successful ")
 console.log(" ")
 	}
 
 message.c = client.captions[client.guildsMeta[message.guild.id].language]
 
 message.respond = async (text, embed) => {
 if (client.responses.has(message.id)) {
 	 if (client.responses.get(message.id) !== null) {
 	 	//there is already a response → edit sent response
 	 	console.log("edit response")
 	 	console.log(" ")
 	  message.channel.fetchMessage(client.responses.get(message.id)).then(response => {response.edit(text, embed)})
 	  	}
 	 else {
 	 	 //there is no response → create new response
 	 	 createResponse(text, embed)
 	  	}
  	}
 else {
 	 //there is an locked response → create new response (?)
 	 	createResponse(text, embed)
 	 	}
 }
 
function cmdCall(cmd) {
	if (args[0] == "help" || args[0] == "?" || client.aliases.get(args[0]) == "help" /*|| client.guildsMeta[message.guild.id].aliases.get(args[0]) == "help"*/) {
	 help(client, message, args)
	 }
	else {
		 console.log("checking for perms")
	  console.log(" ")
  if (permcheck(client, message, command)) {
  	 console.log("trying to execute")
	  console.log(" ")
  	cmd(client, message, args)
  	 }
  	else {
  		console.log("terminated execution")
	  console.log(" ")
  		}
		}
	}
	
switch (message.channel.type) {
 case "dm":
  message.domain = message.channel.recipient
 break;
 case "text":
  message.domain = message.guild
  //message.domain = message.channel
 break;
 default:
  message.domain = client.home
  //message.domain = client.home.systemChannel
 break;
 }
 
 //is the author a bot?
if(message.author.bot) {
	//args.join(" ");
	//bot(client, message, command, args)
	return
	}

/*  	
//is there a special prefix for this guild?
if() {
	//Prefix per Guild is not yet avaivable
	}
else {
	*/
	const prefixHere = client.config.prefix
	//}

//is there already a response to the message? 
if(editedMessage !== null) {
	
	
	
	}

//is there this bot's prefix?
if(message.content.indexOf(prefixHere) !== 0) {
	reactions(client, message)
	return
	}
	//found prefix
	console.log("found prefix")
	//console.log(" ")

//split command and arguments
const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

const command = args.shift().toLowerCase();

console.log("command is " + command)
//console.log(" ")

if (client.commands.has(command)) {
	var exec_cmd = client.commands.get(command)
	console.log(command + " is registered as command")
 console.log(" ")
cmdCall(exec_cmd)
	}
else if (client.aliases.has(command)) {
	var exec_cmd = client.commands.get(client.aliases.get(command))
	console.log(command + " is registered as alias")
 console.log(" ")
cmdCall(exec_cmd)
	}
else {
	//found prefix but no command
	client.responses.set(message.id, null)
	return
	}
	

} //module.exports