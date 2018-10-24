module.exports = (client, message, args) => {


		const { Client, RichEmbed } = require("discord.js");
		const help = require("./help.js");
		const config = require("../config.json");
		const superuserid = config.suid 
	//the Value suid in the config stores the ID of this bot's one superuser
	const botrole = config.permrole
	const superuser = message.guild.members.get(superuserid)
	const msguser = message.author.id
 const msgauthor = message.author.username
 
 
 
 function helplink(cmd, firstarg)
{
//help
if (firstarg == "help" || firstarg == "?")
{
	console.log("   └─> this Command substituted to help " + cmd)
//help(cmd)
args[0] = cmd
//args.join(" ")
	help(client, message, args)
return true
}
else return false;

}



//Command
 
 
 //help
if (helplink("abgehoben", args[0])) return;
	//code
	   
	   var rawmention = args.join(" ")
	   
	//erstes argument ist @me
	if (args[0] == "@me") {
		var mention = msgauthor
		console.log("user is given as the author himself")
		console.log(" ")
	 }
	 
	//erstes argument ist vorhanden
	else if (args[0]) {
		
		 if (rawmention.indexOf("@") == 0) {
		 	 var mention = rawmention.slice(1)
		 	 console.log("user is given by mention and is not a member of this server")
		 	 console.log(" ")
		  }
		  
		 else if  (rawmention.indexOf("@") == 1) {
		  var mentionuser = message.guild.members.get(rawmention.slice(2, -1)) ;
		  console.log("user is given by mention and is member of this server")
		  console.log(" ")
		  //debug
		  console.log("mentionuser = " + mentionuser)
		  console.log(" ")
		   try {
		  console.log("trying to access username: " + mentionuser.user.username)
		  console.log(" ")
		    }
		   catch (error) {
		  	console.log("Error while trying to access username: " + error)
		  	console.log(" ")
		    }
		  }
		  //var mentionid = rawmention.slice(2, -1);
		  //var mentionuser = message.guild.members.get(mentionid);
		  
		 else if (!isNaN(rawmention)) {
		  var mentionuser = message.guild.members.get(args[0]);
		  console.log("user is given by id")
	   console.log(" ")
		  }
		  
		 else {
		 	 var mention = rawmention
		 	 console.log("user is given by name")
		console.log(" ")
		//return message.channel.send("<:warn_3:498277726604754946> Error: There is no resolvable user");
		  }
		
	 }
	 
	//erstes argument ist nicht vorhanden
	else {
	 var mention = msgauthor
	 console.log("user is given by default as author")
		console.log(" ")
	 }
	 
	 
	//mentionuser konvertieren
	 
	 
	 var checkmention = false
	if  (rawmention.indexOf("@") == 1 || !isNaN(rawmention)) {
		var checkmention = true
	}
	
	console.log("checkmention = " + checkmention)
	console.log(" ")
	
	if (args[0] && checkmention) {
		try {
			console.log("Checkpoint1")
		 //if (isNaN(mentionuser.slice(2, -1))) {
		 	if (isNaN(mentionuser.user.id)) {
		 	 throw rawmention + " is not a valid user";
		 	 	  } 
		 	else { 
		 	 	console.log("Trying to convert user\'s name")
		 	 console.log(" ")
		 var mention = mentionuser.user.username
		 	 console.log("mention = " + mention)
		 	 console.log(" ")
		   }
		  }
	 catch (error) {
	 	 console.log("There is no resolvable user.")
	 	 console.log(" ")
	 	 console.log("Error: " + error)
	 	 console.log(" ")
		 return message.channel.send("<:warn_3:498277726604754946> Error: " + rawmention + " is not a valid user ");
		 //```" + error + "```
		  }
		 }
	 
if (mention == client.user.username || mention == message.guild.me.nickname) {
	var plaintext = "Ich bin nicht abgehoben, " + msgauthor + " ist viel abgehobener!"
 var embed = new RichEmbed()  
embed.setColor(0x36393E)
embed.setFooter("@" + msgauthor)
 return message.channel.send(plaintext, embed);
	}
else if (mention == superuser.user.username || mention == superuser.user.nickname) {
	switch (Math.floor((Math.random() * 20) + 1)) {
	 case 1:
	  var plaintext = mention + " ist echt abgehoben seit er einen Bot hat... "
   var embed = new RichEmbed()  
embed.setColor(0x36393E)
embed.setFooter("@" + msgauthor)
   return message.channel.send(plaintext, embed);
	 break;
	 default:
	  var plaintext = mention + " ist nicht abgehoben, schließlich ist er mein Superuser... "
   var embed = new RichEmbed()  
embed.setColor(0x36393E)
embed.setFooter("@" + msgauthor)
   return message.channel.send(plaintext, embed);
  break;
   }
	}
else {
 var plaintext = mention + " ist abgehoben"
 var embed = new RichEmbed()  
embed.setColor(0x36393E)
embed.setFooter("@" + msgauthor)
 return message.channel.send(plaintext, embed);
 }
}