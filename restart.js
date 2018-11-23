module.exports = (oldclient, restartmsg) => {
	
	oldclient.terminal.close()
	
	delete require.cache
	
//Neuen Client Herstellen
	
//Import der Discord API
const Discord = require("discord.js");

//Import von node Modulen
const moment = require("moment");
const fs = require("fs");

//Initializing Client
const client = new Discord.Client();

//Globale Variablen
client.config = require("./config.json");
client.meta = require("./package.json");
client.cmdMeta = require("./commands.json");
client.resolve = require("util").inspect
client.exec = require("child_process").exec;
client.responses = new Discord.Collection();
client.terminal = require('readline').createInterface({input: process.stdin, output: process.stdout, terminal: true})
client.terminal.setPrompt("")
client.guildsMeta = require("./guilds.json")
//To-Do: Add Setup-per-Guild support
client.captions = {}



//Globale Funktionen

/*function reloadWebhooks() {
client.guilds.array().forEach(guild => {guild.fetchWebhooks().then(resp => guild.webhooks = resp)})}
client.reloadWebhooks() = reloadWebhooks()*/
client.reloadWebhooks = () => {
	client.guilds.array().forEach(guild => {
		guild.fetchWebhooks().then(webhooks => guild.webhooks = webhooks)
		})}


//client.writeJson = require("./utility/writeJson.js")

//Bot-eigene Emotes
const emotes = require("./emotes.json")
client.emote = sym => {
	if (isNaN(sym)) {
	 return client.emojis.get(emotes[sym])
	 }
	else {
		return client.emojis.get(sym)
		}
	}
	

	
//Allgemeine Funktionen

//client.hasToString = function(item) {
client.hasToString = item => {
	var result = false
	try {
		const string = item.toString()
		var result = true
		}
	catch (x) {
		var result = false
		}
	return result
	}

//Import vom nächsten Modul

const eventHandler = require("./events.js");



//Import von Command Modulen
client.loadCommands = () => {

client.commands = new Discord.Collection();



client.cmdfiles = fs.readdirSync("./commands/")
/*fs.readdir("./commands/", (fserror, cmdfiles) => {
  if (fserror) console.error(fserror);*/
  
  console.log("loaded following commands:")
  
  client.cmdfiles.forEach(file => {
    let cmdlink = require("./commands/" + file)
    
    if (file == client.cmdfiles[client.cmdfiles.length - 1]) {
	  console.log(" └─>" + file)
	  }
	 else {
	  console.log(" ├─>" + file)
	  }
    client.commands.set(file.slice(0, file.lastIndexOf(".")), cmdlink)
    } ) //cmdfiles.forEach
    
  console.log ("---------------------------------------------------")
  //console.log(" ")
    
  //} ) //fs.readdir
  
  
  
//Import von globalen Aliasen

client.aliases = new Discord.Collection()

console.log("registering command aliases...")

Object.keys(client.cmdMeta).forEach(cmd => {
  client.cmdMeta[cmd].aliases.forEach(alias => {
	   client.aliases.set(alias, cmd)
	  } )
	  
 } ) //Object.keys.forEach
 
console.log ("---------------------------------------------------")
console.log(" ")

} //client.loadCommands

//Sprachen

client.loadLanguages = () => {
	client.languages = fs.readdirSync("./lang/")
	client.languages.forEach(lang => {
		client.captions[lang] = require("./lang/" + lang + "/captions.json")
		})
	} //client.loadLanguages
  
  client.loadCommands()

  client.loadLanguages()
  
//Starting Bot
client.once("ready", () => {
	
client.home = client.guilds.get(client.config.myguild);
client.superuser = client.home.members.get(client.config.suid);

//Alten client Entfernen
	
 oldclient.destroy()
 //oldclient = null
 
 console.log("swapping clients...")
	console.log(" ")

}); //client.once("ready")

client.on("ready", () => {
 console.log(" > client restarted at " + moment(Date.now()).format("HH:mm:ss, DD.MM.YYYY"))
	console.log(" ")
	
}) //client.on("ready")

//Started Bot

client.login(client.config.token);

eventHandler(client);

if (restartmsg !== null) {
 restartmsg.edit(restartmsg.newtext);
 }

} //module.exports