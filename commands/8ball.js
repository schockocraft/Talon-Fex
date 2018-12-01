module.exports = (client, message, args) => {

 const { Client, RichEmbed } = require("discord.js");
		
 const yesresp = ["Ja", "Ja", "Scheint so", "Eher schon", "Ich glaube schon", "Bestimmt"]

 const noresp = ["Nein", "Nein", "Scheint nicht so", "Eher nicht", "Nö", "Ich glaube nicht", "Bestimmt nicht"]
 
 switch(Math.floor((Math.random() * 2))) {
 	case 0:
  	var resp = yesresp[Math.floor(Math.random() * yesresp.length)]
 	break;
 	case 1:
 	 var resp = noresp[Math.floor(Math.random() * noresp.length)]
 	break;
 	}

const embed = new RichEmbed()  
embed.setColor(0x292f33)  
embed.setDescription(resp)
embed.setAuthor("8ball", "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/twitter/154/billiards_1f3b1.png")
embed.setFooter("@" + message.author.username)
message.channel.send("*" + message.c.quotes[0] + args.join(" ") + message.c.quotes[1] + "*", embed);

 } 