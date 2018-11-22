module.exports = (client, message, args) => {

const { Client, RichEmbed } = require("discord.js");
 
//code
	   
const embed = new RichEmbed()
var rawmention = args.join(" ")
var special = false
	   
switch (args[0]) {
	   /*
	//erstes argument ist @me
	if (args[0] == "@me" || args[0] == "me" || args[0] == "@s") {*/
	case "@me":
	case "me":
	case "@s":
		var mention = message.author.username
		console.log("user is given as the author himself by keyword")
		console.log(" ")
	 //}
	break;
	case "@all":
	case "all":
	case "@a":
	case "@everyone":
	case "@here":
	 var special = true
	 //embed.setFooter("@everyone")
	 var plaintext = message.author.username + " kommt mit der lokalen Unfähigkeit nicht mehr Klar..."
	 if (args[1]) {
	 	 var dump = args.shift()
	  embed.setFooter("Seine letzten Worte waren „" + args.join(" ") + "“")
	  }
	 embed.setImage("http://i.imgur.com/THzUmSo.gif")
	 embed.setColor(0x36393E)
 message.respond(plaintext, embed);
	 return
	break;
	case "@random":
	//case "random":
	case "@r":
	 var special = true
	 
	 
	 
	break;
	default:
	//erstes argument ist vorhanden
	/*else*/ if (args[0]) {
		
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
	 var mention = message.author.username
	 console.log("user is given by default as author")
		console.log(" ")
	 }
	 
	 break;
	 }
	 
	//mentionuser konvertieren
	 
	 
	 var checkmention = false
	if  (rawmention.indexOf("@") == 1 || !isNaN(rawmention)) {
		var checkmention = true
	}
	
	console.log("checkmention = " + checkmention)
	console.log(" ")
	
	if (args[0] && checkmention && !special) {
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
		 return message.respond("<:warn_3:498277726604754946> Error: " + rawmention + " is not a valid user ");
		 //```" + error + "```
		  }
		 }
		 
		 
		 
		 
//=== Antworten ===


	 embed.setFooter("@" + message.author.username)
	 
if (mention == client.user.username || mention == message.guild.me.nickname) {
	var plaintext = "Ich bin nicht unfähig! 😟"  
embed.setColor(0x36393E)
 message.respond(plaintext, embed);
 return
	}
else if (mention == message.guild.members.get(client.config.suid).user.username || mention == message.guild.members.get(client.config.suid).user.nickname) {
	switch (Math.floor((Math.random() * 80) + 1)) {
	 case 1:
	  var plaintext = mention + "? Mh... 🤔 \nJoa..."  
embed.setColor(0x36393E)
   message.respond(plaintext, embed);
   return
  break;
	 case 2:
	  var plaintext = mention + " ist einfach so richtig hart unfähig!!! (Hoffentlich hat er das nicht gehört... 😅)"
embed.setColor(0x36393E)
   message.respond(plaintext, embed);
   return
	 break;
	 case 3:
	 case 4:
	 case 5:
	 case 6:
	 case 7:
	 case 8:
	 case 9:
	 case 10:
	  var plaintext = mention + " ist nicht unfähig... (Darf ich zumindest nicht sagen sonst bekomme ich ärger... <:KappaLul:490880010001842187>) "
embed.setColor(0x36393E)
   message.respond(plaintext, embed);
   return
  break;
  default:
   var plaintext = mention + " ist nicht unfähig! Er ist schließlich mein Superuser!" 
embed.setColor(0x36393E)
   message.respond(plaintext, embed);
   return
  break;
   }
	}
else {
 var plaintext = mention + " ist unfähig!"
embed.setColor(0x36393E)
 message.respond(plaintext, embed);
 return
 }
}