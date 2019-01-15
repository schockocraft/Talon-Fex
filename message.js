module.exports = (client, message, editedMessage) => {
	
	const bot = require("./utility/bot.js")
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
 
 if (Object.keys(client.guildsMeta).includes(message.guild.id)) {
  message.c = client.captions[client.guildsMeta[message.guild.id].language]
  }
 else {
  message.c = client.captions[client.config.defaultLanguage]
  }
 
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
 
function cmdCall(cmd, cid) {
	if (args[0] == "help" || args[0] == "?" || client.aliases.get(args[0]) == "help" /*|| client.guildsMeta[message.guild.id].aliases.get(args[0]) == "help"*/) {
	 help(client, message, args)
	 }
	else {
		 console.log("checking for perms")
	  //console.log(" ")
  if (permcheck(client, message, cid)) {
  	 console.log("trying to execute")
	  //console.log(" ")
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
  message.domain = () => {
   console.log("requesting message.domain")
   return message.channel.recipient
   }
 break;
 case "text":
  message.domain = () => {
   console.log("requesting message.domain")
   return message.guild
   }
  //message.domain = message.channel
 break;
 default:
  message.domain = async() => {
   console.log("requesting message.domain")
   return client.home
   }
  //message.domain = client.home.systemChannel
 break;
 }
	
//is there a special prefix for this guild?
//console.log("prefix of guild's config is: " + client.guildsMeta[message.guild.id].prefix)

if (!Object.keys(client.guildsMeta).includes(message.guild.id)) {
 var prefixHere = client.config.prefix
 }
else if (client.guildsMeta[message.guild.id].prefix == "") {
	 //console.log("set prefix to default")
	 var prefixHere = client.config.prefix
	}
else {
	//console.log("set prefix to config entry")
	var prefixHere = client.guildsMeta[message.guild.id].prefix
	}
	//console.log("resolved prefix: " + prefixHere)

//is there already a response to the message? 
if(editedMessage !== null) {
	
	
	
	}

//is there a prefix or mention?
if(message.content.indexOf(prefixHere) !== 0 && message.content.indexOf(client.user.toString()) !== 0) {
	//no prefix or mention
	reactions(client, message)
	return
	}
else if (message.content.indexOf(client.user.toString()) == 0) {
	//found mention
	reactions(client, message)
	console.log("found mention")
	//console.log(" ")

//split command and arguments
var args = message.content.slice(client.user.toString().length + 1).trim().split(/ +/g);

var command = args.shift().toLowerCase();

console.log("command is " + command)
//console.log(" ")
	}
else {
	//found prefix
	console.log("found prefix")
	//console.log(" ")

//split command and arguments
var args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);

var command = args.shift().toLowerCase();

console.log("command is " + command)
//console.log(" ")
}



 //is the author a bot?
if(message.author.bot) {
	//args.join(" ");
	bot(client, message, command, args)
	return
	}


//auto completion
var matchingCmds = []
client.commands.keyArray().filter(cmdName => cmdName.indexOf(command) == 0).forEach(match => {
	matchingCmds.push(match)
	})
	
switch (matchingCmds.length) {
	case 0:
	 //no matches, look for aliases
	 client.aliases.keyArray().filter(cmdName => cmdName.indexOf(command) == 0).forEach(match => {
	matchingCmds.push(match)
	})
	 switch (matchingCmds.length) {
	  case 0:
	   //no matches
	   message.respond("`&" + command + "` " + message.c.modules.message.noMatch)
	  break;
	  case 1:
	   //one match, continue
	   var exec_cmd = client.commands.get(client.aliases.get(matchingCmds[0]))
	 console.log(matchingCmds[0] + " is registered as alias")
  console.log(" ")
cmdCall(exec_cmd, matchingCmds[0])
	  break;
   default:
	   //multiple matches (request or priority system?)
	   message.respond("`&" + command + "` " + message.c.modules.message.ambiguousIdLeft + " `" + matchingCmds.join("`/`") + "`? " + message.c.modules.message.ambiguousIdRight)
	  break;
	  } //switch
	break;
	case 1:
	 //one match, continue
	 var exec_cmd = client.commands.get(matchingCmds[0])
	 console.log(matchingCmds[0] + " is registered as command")
  console.log(" ")
cmdCall(exec_cmd, matchingCmds[0])
	break;
	default:
	 //multiple matches (request or priority system?)
	 message.respond("`&" + command + "` " + message.c.modules.message.ambiguousIdLeft + " `" + matchingCmds.join("`/`") + "`? " + message.c.modules.message.ambiguousIdRight)
	break;
	} //switch
} //module.exports