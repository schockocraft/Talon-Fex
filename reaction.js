module.exports = (client, message) => {

function found() {
	console.log ("---------------------------------------------------")
 	console.log("Reacted on \"" + content + "\"")
 	console.log(" ")
	}
	
function said(word) {
	message.channel.send("Mihihi " + msgauthor + " hat " + word + " gesagt <:KappaLul:490880010001842187> ")
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
		const config = require("./config.json");
		const home = client.guilds.get(config.myguild)
		const superuserid = config.suid 
	//the Value suid in the config stores the ID of this bot's one superuser
	const botrole = config.permrole
	const superuser = message.guild.members.get(superuserid)
	const msguser = message.author.id
 const msgauthor = message.author.username
 
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
 	console.log(bla)
 	console.log(" ")
 	 	}
 
 //console.log(content)
 //console.log(" ")
 
 //code
 
 /*
 if (content.indexOf("bla") !== -1) {
 	message.channel.send(" ")
 	found()
 	}
 	*/
 	
 	/*
 if (content.indexOf("bla") !== -1) {
 	message.react()
 	found()
 	}
 	*/
 
 if (content.indexOf("modifizieren") !== -1) {
 	message.channel.send("Jaaaa! Modifizieren 🔪")
 	found()
 	}
 
if (content == "...") {
 	message.channel.send(msgauthor + " denkt nach... \n\nDas kann dauern...")
 	found()
 client.setTimeout(delnadeko, 400)
  	}
 
if (content.indexOf("guten morgen") !== -1 && isMentioned) {
 	message.channel.send("Guten Morgen " + msgauthor)
 	found()
 	}
 
 //Folgende Nachrichten nur mit ⅓ Wahrscheinlichkeit
 if (Math.floor(Math.random() * 3) == 1) {
 
if (content.indexOf("latte") !== -1) {
 	said("Latte")
 	found()
 	}
 
if (content.indexOf("ständer") !== -1) {
 	said("Ständer")
 	found()
 	}
 
if (content.indexOf("loch") !== -1) {
 	said("Loch")
 	found()
 	}
 	
 	
 	
 	 }
 //ab hier wieder immer
 
/*if (content.indexOf("bla") !== -1) {
 	message.channel.send(" ")
 	found()
 	}*/
 
}