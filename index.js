/*
Index:
 Command Parsing (~35-125)
 Constant Values (~125-135)
 Help Utility (~135-170)
 Permission System (~170-250)
 Console Logging (~250-260)
 SmallCommands (~260-end)
*/

//Import der Discord API
const Discord = require("discord.js");

const { Client, RichEmbed } = require("discord.js");

//Import von Modulen
const roll = require("./commands/roll.js");
const help = require("./commands/help.js");
const ball = require("./commands/8ball.js");
const abgehoben = require("./commands/abgehoben.js");
const unfähig = require("./commands/unfähig.js");
const game = require("./commands/game.js");
const rolecolor = require("./commands/rolecolor.js");
const arguments = require("./commands/arguments.js");
const reactions = require("./reaction.js")

//Import von node Funktionen
const moment = require("moment");
const figlet = require("figlet");
const fs =  require("fs");

//Initializing Client
const client = new Discord.Client();

//Load Config
const config = require("./config.json");
//const tmpperm = require("./tmpperm.json");

//Starting Bot

//Nice Ascii-art Startup Screen
console.log ("---------------------------------------------------")
console.log(" _____      _                ____");
console.log("|_   _|__ _| | ___  _ __    |  __| ___  _  _");
console.log("  | | / _` | |/ _ \\| `_ \\   | |_  / _ \\\\ \\/ /");
console.log("  | || (_| | | (_) | | | |  |  _||  __/ >  <");
console.log("  |_| \\__,_|_/\\___/|_| |_|  |_|   \\___||_/\\_|");

client.on("ready", () => {
	
console.log ("---------------------------------------------------")
console.log(`${client.users.size} users`) 
console.log(`${client.channels.size} channels                         by schockocraft`) 
console.log(` ${client.guilds.size} servers`)
console.log(" ");
console.log("     _")
console.log(" _  //   Bot has successfully started ")
console.log(" \\\\//    at " + moment(Date.now()).format("HH:mm:ss, DD.MM.YYYY")) 
console.log("  \\/")
console.log(" ")

//Set Activity
client.user.setActivity("messages from you", { type: 'LISTENING' });
});
//Started Bot

//Join new server

client.on("guildCreate", guild => {
console.log ("---------------------------------------------------")
console.log(`New server joined: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members!`);
console.log(" ");

client.user.setActivity("new playgrounds", { type: 'WATCHING' });
});

//Leave Server
client.on("guildDelete", guild => {

console.log ("---------------------------------------------------")
console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
console.log(" ");

client.user.setActivity("sad music cuz being kicked from " + guild.name, { type: 'LISTENING' });
});


//Listening to Messages
client.on("message", async message => {

//ignore Bots
if(message.author.bot) return;

//check for prefix, if no prefix give message to Reaction Module
if(message.content.indexOf(config.prefix) !== 0) {
	reactions(client, message)
	return
	}

//split command and arguments
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

const command = args.shift().toLowerCase();


//Constant Values

  //Time Variablen
  const timelong = moment(Date.now()).format("dddd, DD.MM.YYYY HH:mm:ss");
  const timeshort = moment(Date.now()).format("HH:mm:ss");
  //

 const home = client.guilds.get(config.myguild)
	const superuserid = config.suid 
	//the Value suid in the config stores the ID of this bot's one superuser
	const botrole = config.permrole
	const superuser = home.members.get(superuserid)
	const msguser = message.author.id
 const msgauthor = message.author.username
 const msgreplyto = message.author.tag
 const botcolor = "7289da"
 // = blurple
 const maincolor = "FFFFFF"
 const trigger = false
 
//=== Global Functions===

function writeConfig(jsonraw) {
fs.writeFileSync('tmpperm.json',  JSON.stringify(jsonraw, null, 2))
	//fs.writeFileSync('config.json', jsonraw)
	//console.log("Config is secured atm")
	}
	
function fillgaps (curarray) {
	//var tmp;
	var tmp = [1];
	//var dump = tmp.shift()
 tmp[0] = curarray.shift();
 while (curarray.length !== 0) {
	 if (isNaN(curarray[0])) {
   tmp[tmp.length] = curarray.shift()
   }
  else {
  	 var dump = curarray.shift();
  	 }
  }
  var curarray = tmp
  return curarray
 }
	
	
function test2() {
	var myarray = [
 {
	 "uid" : "1", 
	 "cmd" : "",
	 "count" : "",
	 "expiresat" : "2" 
	 }, 
 {
	 "uid" : "3", 
	 "cmd" : "",
	 "count" : "",
	 "expiresat" : "0" 
	 }, 
	 null,
 {
	 "uid" : "9", 
	 "cmd" : "eval",
	 "count" : "",
	 "expiresat" : "6" 
	 }, 
	{
		"uid" : "7", 
	 "cmd" : "",
	 "count" : "-1",
		"expiresat" : "8" 
		}]; 
message.channel.send(myarray)
//myarray.forEach(fillgaps);
myarray = fillgaps(myarray)
return myarray
	}

//=== Help === 

/*
//help
if (helplink(command, args[0])) return;
//code
*/


function helplink(cmd, firstarg)
{
//help
if (firstarg == "help" || firstarg == "?")
{
	console.log("   └─> this Command substituted to help " + cmd)
//help(cmd)
//args.join(" ")
args[0] = cmd
//const extra = ""
	help(client, message, args)
return true
}
else return false;

}

if(command === "help") {
args.join(" ")
	help(client, message, args)
}



//=== Permission System === 

//Temporary permissions

function itpEntry(cfgsync, obj, pos) {
	//var cfgsync = require("./config.json");
	//var isReqCmd = false
	//var is
//is this permission requested?
	if (obj.cmd == command || obj.cmd == "~") {
		//permission applies to this command
		//var isReqCmd = true
	
//is this permission given to the requesting user?
	 if (obj.uid == msguser) {
	 	//permission belongs to user
//is permission of requesting user expired?
   if (isNaN(obj.expiresat)) {
    if (obj.expiresat == "~") {
  	 //user is always permitted to do this
  	   return true
   	  }
    	else {
   	//invalid value
    	 delete cfgsync.tempperm[pos];
	    const plaintext = "⚠ error: you don't have permissions to use this!"
		   const embed = new RichEmbed()   
embed.setColor(0xcc0000)  
     if (obj.cmd !== "~") {
embed.setTitle(command) }
embed.setDescription("Your temporary permission is invalid")
embed.setAuthor("Temporary Permissions")
embed.setFooter("@" + msgauthor)
      message.channel.send(plaintext, embed);
	    console.log("the temporary permission of " + msgauthor + " contains an invalid value and will now be deleted")
	    console.log(" ")
	    return false
     }
    }
   else if (obj.expiresat < message.createdTimestamp) {
  	//permission expired
  	  /*var expiredSinceMs = message.createdTimestamp - obj.expiresat;
  	  var expiredSince = math.floor(expiredSinceMs / 1000);*/
	   delete cfgsync.tempperm[pos];
	   const plaintext = "⚠ error: you don't have permissions to use this!"
		  const embed = new RichEmbed()   
embed.setColor(0xcc0000)  
    if (obj.cmd !== "~") {
embed.setTitle(command) }
embed.setDescription("Your temporary permission expired")
embed.setAuthor("Temporary Permissions")
embed.setFooter("@" + msgauthor)
    message.channel.send(plaintext, embed);
	   console.log("the temporary permission of " + msgauthor + " expired and will now be deleted")
	   console.log(" ")
	   return false
	   }
	  else {
	  	 //permission is given
		return true
		  }
		 }
		else {
			//no permission for this user
			return false
			}
		}
 else {
  //permission may not be applied to this command
  //var isReqCmd = false
 	 console.log("b")
 	 return false
  }
  //anything went wrong
 //message.channel.send(`${obj}`)
 return false
 
 }
 
 
 
function isTempPerm() {
	//var cfgsync = require("./config.json");
	var cfgbkraw = fs.readFileSync('config.json');
	var cfgback = JSON.parse(cfgbkraw);
	var cfgraw = fs.readFileSync('config.json');
	var cfgsync = JSON.parse(cfgraw); 
	var entryCount = 0
	var isFound = false
	while (entryCount < cfgsync.tempperm.length && !isFound) {
		//rufe itpEntry auf
 var isFound = itpEntry(cfgsync, cfgsync.tempperm[entryCount], entryCount)
	 //nächster Eintrag
	entryCount++;
	}
	cfgback.tempperm = fillgaps(cfgsync.tempperm)
	writeConfig(cfgback)
  //gebe ergebnis von itpEntry weiter
	if (isFound) {
	 return true
	 }
	else {
		return false
		}
	
//const result = cfgsync.tempperm.forEach(itpEntry)
//console.log("r: " + result)
//return result



 }
 
 

//static permissions

/*
//perm
if (isnotsu()) return;
//code
*/

function isnotsu() {
if(msguser !== superuserid && !isTempPerm()) {
const plaintext = "⚠ Sorry, you don't have permissions to use this!"
const embed = new RichEmbed()  
//.setTitle('Title') 
.setColor(0xCC0000)  
.setDescription('only ' + superuser + ' and temporary permitted users may use this command')
//.setAuthor("Header")
.setFooter("@" + msgauthor)
//.addField("Field");
message.channel.send(plaintext, embed);

	/*
return message.reply("Sorry, you don't have permissions to use this!")
*/
return true
}
else
return false;
}

/*
//perm
if (isnotroleperm()) return;
//code
*/

function isnotroleperm() {
if(!message.member.roles.some(r=>[botrole].includes(r.name)) && !isTempPerm()) {

	const plaintext = "⚠ Sorry, you don't have permissions to use this!"
const embed = new RichEmbed()  
//.setTitle('Title') 
.setColor(0xCC0000)  
.setDescription('only user of role ' + botrole + ' and temporary permitted users may use this command')
//.setAuthor("Header")
.setFooter("@" + msgauthor)
//.addField("Field");
message.channel.send(plaintext, embed);

return true
}
else
return false;
}

function isnotperm() {
	//var isNotStaticPerm = false
	if(!message.member.roles.some(r=>[botrole].includes(r.name)) && msguser !== superuserid && !isTempPerm()) {
			const plaintext = "⚠ Sorry, you don't have permissions to use this!"
const embed = new RichEmbed()  
//.setTitle('Title') 
.setColor(0xCC0000)  
.setDescription('only user of role ' + botrole + ', temporary permitted users and ' + superuser + ' may use this command')
//.setAuthor("Header")
.setFooter("@" + msgauthor)
//.addField("Field");
message.channel.send(plaintext, embed);
return true
}
else
return false;
}
	
	
	
	
//=== Game Module ===

  	//if (message.guild.channels.find('name', 'Games').children.find('name', 'main_lobby'))
  	
 function gameChannel() {
 	 var gChArgs = [command];
 	 
 	 
 	 
  	}
  	
  	try {
	if (message.channel.parent.name == "Games") {
		if (message.channel.name == "main_lobby") {
			if(command === "game" || command === "games") {
    args.join(" ")
	   game(client, message, args)
	   return
    }
			else if (command === "help") {
				args.join(" ")
				help(client, message, args)
				return
				}
			else {
				gameChannel()
				return
				}
			}
		else {
			//There has already to be an instance of game.js listening this channel, so do nothing
			//gameChannel()
			return
			}
		}
	  }
	 catch (x) {}


//=== Console Information ===
    var nohelp = true
   if(args[0] == "help" || args[0] == "?" ) {
   	 var nohelp = false
   }
   
 if(command !== "conmsg" || nohelp) {
console.log ("---------------------------------------------------")
console.log ("Command " + command + " is started")
console.log("   by " + msgauthor) 
try {
 console.log("   in " + message.channel.guild.name + " > #" + message.channel.name)
 }
catch (x) {
	try { 
  console.log("   in private channel with " + message.channel.recipient.username)
  }
  catch (y) {
   console.log("   in a not recognizable channel")
  }
	}
console.log("   at " + timeshort)
console.log("   with the following arguments:")
const conLogCmdArgs = args.join(" ");
console.log ("   > " + conLogCmdArgs)
console.log (" ")
}





//=== Small Commands === 

   //Alphabetisch sortiert
   
   
     //Ausgelagert
     
if(command === "8ball") {
   args.join(" ")
	  ball(client, message, args)
 }
     
if(command === "abgehoben") {
   args.join(" ")
	  abgehoben(client, message, args)
 }
 
if (command === "checkforargs") {
	  args.join(" ")
	  arguments(client, message, args)
	}

if(command === "unfähig") {
   args.join(" ")
	  unfähig(client, message, args)
 }
 
 if(command === "rolecolor") {
   args.join(" ")
	  rolecolor(client, message, args)
}


     //Veraltet
 
if(command === "getserver") {
	helplink(command, "help")
	//return message.channel.send(message.channel.guild.name);
	
	}
	
	
if(command === "getservercode") {
 helplink(command, "help")
	/*
	const	servercode = message.channel.guild.id;
 message.channel.send(servercode);
 console.log(servercode);
	*/
	}
	
	
if(command === "getsu") {
	helplink(command, "help")
	//return message.channel.send("the Superuser of this bot is " + superuser);
 
 }
 
 
 if(command === "time") {
		//help
if (helplink(command, args[0])) return;
  //code
if(!args[0] || args[0] === "short") {
	return message.channel.send(timeshort)
	}
else if(args[0] === "long") {
	return message.channel.send(timelong)
	}
else {
	const plaintext = "<:warn_3:498277726604754946> Error: invalid arguments"
	const embed = new RichEmbed()  
embed.setColor(0xFFDD00)  
embed.setDescription("use `" + config.prefix + "time  {short/long}` ")
embed.setFooter("@" + msgauthor)
return message.channel.send(plaintext, embed);
 } }
 
 
 if(command === "whoami_getid") {
	helplink(command, "help")
	/*
	//help
	if (helplink(command, args[0])) return;
	//code
	
	return message.channel.send(msguser)

.catch(error => message.reply(`Sorry I couldn't execute this command because of : ${error}`));
*/
}
 
     
     //Utility
     
if(command === "conmsg" || command === "log") {
	//help
if (helplink(command, args[0])) return;
//perm
if (isnotperm()) return;
//code

else
{
 console.log ("---------------------------------------------------")
const conMessage = args.join(" ");
	
	console.log("Message by @" + msgauthor)
	console.log("        from " + message.channel.guild.name)
	console.log("        at " + timelong)  
	console.log(" ")
	console.log("   > " + conMessage)
	
	const plaintext = "<:check_4:498523284804075541> Sucessfully added message to console"
const embed = new RichEmbed()  
//.setTitle('Debug utilities') 
.setColor(0x7289DA)  
.setDescription("```" + conMessage + "```")
//.setAuthor("Header")
.setFooter("by @" + msgauthor + " \nfrom " + message.channel.guild.name + " \nat " + timelong )
message.channel.send(plaintext, embed);
	
	} }
	
	
	
	
	if(command === "game" || command === "games") {
		
		 var isSetupOk = false
   if (message.guild.channels.find('name', 'Games') !== null) {
    	if (message.guild.channels.find('name', 'Games').children.find('name', 'main_lobby') !== null) {
 		    var isSetupOk = true
 		    console.log(isSetupOk)
 		    console.log(" ")
 		}
 	}
		
		var plaintext = "⚠ error: wrong channel"
  var embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0xffcc4d)  
if (isSetupOk) {
 embed.setDescription("Use `" + config.prefix + "game` in " + message.guild.channels.find('name', 'Games').children.find('name', 'main_lobby'))
 }
else {
	embed.setDescription('Ask an user with the role ' + botrole + ', or ' + superuser + ' to execute `' + config.prefix + 'game setup` to setup the Game Module which also creates a channel where you can use the `' + config.prefix + 'game` command.')
	}
embed.setAuthor("Talon Fex Games Module")
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
message.channel.send(plaintext, embed);
		}
	
	
	
	
	if(command === "info") {
		
		}
		
		
	
	
	if(command === "eval") {
//help
  if (helplink(command, args[0])) return;
//perm
  if (isnotsu()) return;
//code
const cmd = args.join(" ")
//const plaintext = "```" + cmd + "```"
//console.log("Trying to eval " + cmd)
//console.log(" ")
if (cmd.indexOf("client.token") !== -1 || cmd.indexOf("config.token") !== -1) {
	 message.channel.send("Nö");
	 return
	  }
 else {
	try {
		const resolve = eval(cmd)
		const plaintext = "<:check_4:498523284804075541> eval was executed successfully"
  const embed = new RichEmbed()   
embed.setColor(0x7289DA)  
if (cmd.length < 256) {
embed.setTitle(cmd) }
else embed.setTitle(cmd.slice(0, cmd.indexOf(" ")) + "...");
embed.setDescription(resolve)
embed.setAuthor("Eval")
embed.setFooter("@" + msgauthor)
  message.channel.send(plaintext, embed);
  console.log("finished")
 	 console.log(" ")
 	 console.log(resolve)
 	 console.log(" ")
		}
	catch(error) {
		const plaintext = "⚠ error on trying to execute eval:"
		const embed = new RichEmbed()   
embed.setColor(0xffcc4d)  
if (cmd.length < 256) {
embed.setTitle(cmd) }
else embed.setTitle(cmd.slice(0, cmd.indexOf(" ")) + "...");
embed.setDescription(error)
embed.setAuthor("Eval")
embed.setFooter("@" + msgauthor)
  message.channel.send(plaintext, embed);
  //message.channel.send("Error: " + error)
		 }
		 //message.channel.send("ok");
		}
	}
	
	
     
     
if(command === "figlet") {
	
	//help
if (helplink(command, args[0])) return;
//code
	
 const input = args.join(" ")	
 	 figlet(input, function(err, output) {
 	console.log(output)
 	console.log(" ")
	console.log("collected errors: " + err)
	console.log(" ")
	
	const plaintext = "```" + output + "```"
	const embed = new RichEmbed()  
embed.setColor(0x99aab5)  
//embed.setDescription()
embed.setAuthor("FIGlet")
embed.setFooter("@" + msgauthor)
message.channel.send(plaintext, embed);

	});
 
 } 
 
 
 
 
 if(command === "figlet+") {
	
	//help
if (helplink(command, args[0])) return;
//code
	
 const input = args.join(" ")	
 	 figlet(input, function(err, output) {
 	console.log(output)
 	console.log(" ")
	console.log("collected errors: " + err)
	console.log(" ")
	
	const plaintext = "```" + output + "```"
	const embed = new RichEmbed()  
embed.setColor(0x99aab5)  
//embed.setDescription()
embed.setAuthor("FIGlet")
embed.setFooter("@" + msgauthor)
message.channel.send(plaintext, embed);

	});
 
 } 
 
 
 
 
 
 if(command === "get") {
 	//help
if (helplink(command, args[0])) return;
//code



	
	}
	
	
	
	
	
if(command === "modifizieren" || command === "mod") {
 message.channel.send("Jaaaa! Modifizieren 🔪")
 }


if(command === "shrug" || command === "kp") {
 message.channel.send("¯\\_(ツ)_/¯")
 message.delete()
 }


if(command === "suggest") {
//perm
if (isnotperm()) return;
//code
const mode = args.shift()
console.log(mode)
console.log(" ")
switch (mode) {
	case "add":
	 const newsuggest = args.join(" ") + " \n"
  	fs.appendFileSync('suggestions.txt', newsuggest)
  	var plaintext = "<:check_1:498283069485350923> successfully added suggestion"
  var embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0xFFFFFF)  
embed.setDescription(newsuggest)
embed.setAuthor("Suggestions")
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
message.channel.send(plaintext, embed);
	break;
	case "get":
	case "list":
  var slist = fs.readFileSync('suggestions.txt');
  var plaintext = "<:check_1:498283069485350923> successfully read suggestions"
  var embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0xFFFFFF)  
embed.setDescription(slist)
embed.setAuthor("Suggestions")
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
message.channel.send(plaintext, embed);
 break;
 default:
  var plaintext = "⚠ error: wrong arguments"
  var embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0xffcc4d)  
embed.setDescription("Use `" + config.prefix + "suggest {get/list}` to get a list of the given suggestions or `" + config.prefix + "suggest add` to add a new one")
embed.setAuthor("Suggestions")
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
message.channel.send(plaintext, embed);
 break;
 }
}




	
	   //Unsortiert

if(command === "ping") {

// Calculates ping between sending a message and editing it, giving a nice round-trip latency.

// The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)

//help
if (helplink(command, args[0])) return;
//code
const m = await message.channel.send("<a:load_1:498280749271744512> Ping?");

const plaintext = "<:check_4:498523284804075541> Pong!"
const embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0x7289DA)  
embed.setDescription(`API Latency is ${Math.round(client.ping)}ms`)
embed.setAuthor(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`)
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
m.edit(plaintext, embed);



//m.edit(`<:check_1:498283069485350923> Pong! \nLatency is ${m.createdTimestamp - message.createdTimestamp}ms. \nAPI Latency is ${Math.round(client.ping)}ms`);

}





	
	


if(command === "say") {
//help
if (helplink(command, args[0])) return;
//perm
if (isnotperm()) return;
//code

else
{

// makes the bot say something and delete the message. As an example, it's open to anyone to use. 

// To get the "message" itself we join the `args` back into a string with spaces: 

const sayMessage = args.join(" ");

// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.

message.delete().catch(O_o=>{}); 

// And we get the bot to say the thing: 

message.channel.send(sayMessage);

}
}


if(command === "roll") {
	args.join(" ")
	roll(client, message, args)
}


if(command === "afk") {
	//help
	if (helplink(command, args[0])) return;
	//code
message.channel.send(msgauthor + " is now afk")
message.delete().catch(O_o=>{});
//detect re

/*
const m = await message.channel.send("Ping?");

m.edit(`bla`)
*/
/*
//await.
edit(`msgauthor + "is now afk\n" + msguser + "rejoined"`)
*/
	}
	
	
	if(command === "re") {
		//help
	if (helplink(command, args[0])) return;
	//code
message.channel.send(msgauthor + " rejoined")
message.delete().catch(O_o=>{});
	}
	
	
	
	
	/*
	const plaintext = "Content:"
const embed = new RichEmbed()  
//.setTitle('Title') 
.setColor(0xFFFFFF)  
.setDescription('Content')
.setAuthor("Header")
.setFooter("@" + msgauthor)
//.addField("Field");
message.channel.send(plaintext, embed);
*/
	

if(command === "embed") {
	
	//help
	if (helplink(command, args[0])) return;
//perm
if (isnotsu()) return;
//code
//const embeddate = new Date('December 29, 2020 04:20:00');
const plaintext = "Plain Text"
const embed = new RichEmbed()  
embed.setTitle('Title: Title') 
embed.setColor(0xFFFFFF)  
embed.setDescription('Description: Content')
embed.setImage("https://cdn.discordapp.com/attachments/498229013093810179/499302412876644364/1539113347778.png")
embed.setAuthor("Author: Header")
embed.setFooter(timeshort + "\n@" + msgauthor + " \nMore Information")
embed.addField("InlineField1", "Value", true)
embed.addField("InlineField2", "Value", true)
embed.addField("Field", "Value", false)
//embed.setTimestamp(embeddate)
message.channel.send(plaintext, embed);


/*
message.channel.send("Plain Text", {
	embed: {
	author: "Title",
	description: "Content",
	footer: msgauthor
}})
*/
	}



/*
if(command === "testemote") {
return message.channel.send("<:dice7:498269382699646996>  <:dice8:498269498554449921>  <:dice9:498269540954800128> ");
}
*/



if(command === "testmsg") {
	
	//help
	if (helplink(command, args[0])) return;
 //perm
 if (isnotsu()) return;
 //code
 
//message.channel.send(" ")

/*
message.channel.send(message.guild.emojis.get('498283069485350923').name)
.catch(error => message.reply("Sorry I couldn't execute this command because of : " + error ));

message.channel.send(message.guild.emojis.get('499302414856486915').name)
.catch(error => message.reply("Sorry I couldn't execute this command because of : " + error ));
*/
/*
message.channel.send(client.guilds.get('498229013093810177').emojis.get('498283069485350923').name)
.catch(error => message.reply("Sorry I couldn't execute this command because of : " + error ));

message.channel.send(client.guilds.get('498229013093810177').emojis.get('499302414856486915').name)
.catch(error => message.reply("Sorry I couldn't execute this command because of : " + error ));
*/

const text = args.join(" ")
 client.guilds.get('490552548294524928').channels.get('497496492807028756').send(text)
}


if(command === "typing") { 
//if(command === "start") {

 //help
	if (helplink(command, args[0])) return;
 //perm
 if (isnotsu()) return;
	//code
	 switch (args[0]) {
	  case "start":
	   message.channel.startTyping()
	  break;
	  case "stop":
	   message.channel.stopTyping()
	  break;
	  default:
	   //message.channel.send("<:info_1:498285998346731530> Benutze " + config.prefix + "typing start  " + config.prefix + "typing stop oder " + config.prefix + "typing {help/?}")
	   
	  break;
	} }
	
if(command === "chinfo") {
	const chName = message.channel.toString()
return message.channel.send(chName)

.catch(error => message.reply(`Sorry I couldn't execute this command because of : ${error}`));

	}

if(command === "getchname") {
	

//code

const chName = message.channel.toString()
return message.channel.send(chName)

.catch(error => message.reply(`Sorry I couldn't execute this command because of : ${error}`));

}


/* Unnuetze Befehle

if(command === "kick") {

// This command must be limited to mods and admins. In this example we just hardcode the role names.

// Please read on Array.some() to understand this bit: 

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?

if(!message.member.roles.some(r=>["Nandusgeweihter", "Moderator"].includes(r.name)) )

return message.reply("Sorry, you don't have permissions to use this!");



// Let's first check if we have a member and if we can kick them!

// message.mentions.members is a collection of people that have been mentioned, as GuildMembers.

// We can also support getting the member by ID, which would be args[0]

let member = message.mentions.members.first() || message.guild.members.get(args[0]);

if(!member)

return message.reply("Please mention a valid member of this server");

if(!member.kickable) 

return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");



// slice(1) removes the first part, which here should be the user mention or ID

// join(' ') takes all the various parts to make it a single string.

let reason = args.slice(1).join(' ');

if(!reason) reason = "No reason provided";



// Now, time for a swift kick in the nuts!

await member.kick(reason)

.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));

message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);


}



if(command === "ban") {

// Most of this command is identical to kick, except that here we'll only let admins do it.

// In the real world mods could ban too, but this is just an example, right? ;)

if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )

return message.reply("Sorry, you don't have permissions to use this!");



let member = message.mentions.members.first();

if(!member)

return message.reply("Please mention a valid member of this server");

if(!member.bannable) 

return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");


let reason = args.slice(1).join(' ');

if(!reason) reason = "No reason provided";



await member.ban(reason)

.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));

message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);

}



if(command === "purge" || command === "clear" || command === "prune") {
	
	//help
	if (helplink(command, args[0])) return;
	//perm
	if (isnotperm()) return;
	//code

// This command removes all messages from all users in the channel, up to 100.



// get the delete count, as an actual number.

const deleteCount = parseInt(args[0], 10);



// Ooooh nice, combined conditions. <3

if(!deleteCount || deleteCount < 2 || deleteCount > 100)

return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");



// So we get our messages, and delete them. Simple enough, right?

const fetched = await message.channel.fetchMessages({limit: deleteCount});

message.channel.bulkDelete(fetched)

.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));

}*/

});

client.login(config.token);