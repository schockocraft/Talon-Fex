module.exports = (client, message) => {

function found() {
	console.log ("---------------------------------------------------")
 	console.log("Reacted on \"" + content + "\"")
 	console.log(" ")
	}
	
function said(word) {
	message.respond("Mihihi " + message.author.username + " hat " + word + " gesagt <:KappaLul:490880010001842187> ")
	found()
 }

function delnadeko() {
	if (message.guild.members.has("116275390695079945")){
		//client.setTimeout
		try {
		 if (message.guild.members.get("116275390695079945").lastMessage.createdTimestamp > message.createdTimestamp ) {
     message.guild.members.get("116275390695079945").lastMessage.delete()
    
		  console.log("Removed Nadeko\'s silly rumors ")
  	  	console.log(" ")
  	  	}
	  	}
	 	catch (error) {
	  	console.log(error)
	  	console.log(" ")
	  	}
  	}
 }
//console.log ("---------------------------------------------------")
//console.log("Checking for reactions on")

		const { Client, RichEmbed } = require("discord.js");
		//const config = require("./config.json");
		//const home = client.guilds.get(config.myguild)
		//const superuserid = config.suid 
	//the Value suid in the config stores the ID of this bot's one superuser
	//const botrole = config.permrole
	//const superuser = message.guild.members.get(superuserid)
	//const msguser = message.author.id
 //const msgauthor = message.author.username
 
 //console.log("found no prefix")
	//console.log(" ")
 
 const content = message.content.toLowerCase()
 
 try{
if (content.indexOf(client.user.toString()) == -1) {
 	const isMentioned = false
 }
else {
 	const isMentioned = true
 	}
 	 }
 	catch (bla) {
 		const isMentioned = false
 	console.log(bla)
 	console.log(" ")
 	 	}
 
 //console.log(content)
 //console.log(" ")
 
 //code
 
 /*
 if (content.indexOf("bla") !== -1) {
 	message.respond(" ")
 	found()
 	return
 	}
 	*/
 	
 	/*
 if (content.indexOf("bla") !== -1) {
 	message.react()
 	found()
 	return
 	}
 	*/
 
 if (content.indexOf("modifizieren") !== -1) {
 message.respond("Jaaaa! Modifizieren 🔪")
 	found()
 	return
 	}
 
if (content == "...") {
 	message.respond(message.author.username + " denkt nach... \n\nDas kann dauern...")
 	found()
 client.setTimeout(delnadeko, 400)
 	return
  	}
 
if (content.indexOf("guten morgen") !== -1 && isMentioned) {
 	message.respond("Guten Morgen " + message.author)
 	found()
 	return
 	}
 
 //Folgende Nachrichten nur mit kleiner Wahrscheinlichkeit
 if (Math.floor(Math.random() * 12) == 1) {
 
if (content.indexOf("latte") !== -1) {
 	said("Latte")
 	return
 	}
 
if (content.indexOf("ständer") !== -1) {
 	said("Ständer")
 	return
 	}
 
if (content.indexOf("loch") !== -1) {
 	said("Loch")
 	return
 	}
 	
 	
 	
 	 }
 //ab hier wieder immer
 
/*if (content.indexOf("bla") !== -1) {
 message.respond(" ")
 	found()
 	return
 	}*/
 	

//register responseless messages
client.responses.set(message.id, null)
}