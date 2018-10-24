	module.exports = (client, message, args) => {

		const { Client, RichEmbed } = require("discord.js");
		const help = require("./help.js");
		 const msgauthor = message.author.username
		
	//Würfel
	
	//Argumente und Variablen Registrieren
	
	const rollarga = args[0]
	const rollargb = args[1]
	const rollargerror = args[2]
	var rolltype = 0
	var dicetype = "wx"
	
	var rollcountcur = 0
	var rollcountmax = 0
	
	var gotDefault = false
	var gotStringConverted = false
	var detectedDiceType = false
	var detectedOnlyOneArg = false
	
	
	//Argumente validieren
	
	if(args[2])
	
	return message.channel.send("<:warn_3:498277726604754946> Error: too many Arguments. Only dice type and roll count are valid arguments. The odd argument is " + rollargerror);
	
	
	
	//Zwei Argumente
	
if(args[0] && args[1])
{
if(rollarga.indexOf("w") == 0 && rollargb.indexOf("w") == 0)

return message.channel.send("<:warn_3:498277726604754946> Error: Argument `dice type` is defined twice");

if(rollarga.indexOf("w") !== 0 && rollargb.indexOf("w") !== 0)

return message.channel.send("<:warn_3:498277726604754946> Error: Argument `roll count` is defined twice");


	//Zwei Argumente verarbeiten

if(rollarga.indexOf("w") == 0)
{
var dicetype = rollarga
var rollcountmax = rollargb
}

else if(rollargb.indexOf("w") == 0)
{
var dicetype = rollargb
var rollcountmax = rollarga
}

else return message.channel.send("<:warn_3:498277726604754946> Very strange error: Schroedingers Argument `Dice type` is defined and not defined");
}
	
	
	//Ein Argument verarbeiten
	
if(args[0] && !args[1])
{

var detectedOnlyOneArg = true

if(rollarga.indexOf("w") == 0)
{
var dicetype = rollarga
var rollcountmax = 1
var detectedDiceType = true
}




//help
else if (rollarga == "help" || rollarga == "?")
{
	help(client, message, ["roll"])
//help("roll")
return
}


//	return message.channel.send("This is a cool dice roll command. Give the number of sides with `w<count>` (e.g. `w6` or `w20`) and the number of dices by simply typing it. The order doesn\'t matter. You can also use the command without any arguments to simply roll one normal hexaedric dice.")

else
{
var rolltype = 6
var rollcountmax = rollarga
} }


//Kein Argument; Standard einsetzen
	
if (!args[0])
{
	var rolltype = 6
	var gotDefault = true
	var rollcountmax = 1
}
	
	
//String dicetype zu Const rolltype umwandeln
	
	if (rolltype == 0 && dicetype == "wx")
	{
	return message.channel.send("<:warn_3:498277726604754946> Error: After validating arguments there is still no dicetype");
	}
	
	if (rolltype == 0 && dicetype == "w0")
	
	return message.channel.send("<:warn_3:498277726604754946> Error: you intented to roll a dice with no sides");
	
	
	
if (rolltype == 0)
	{
	var rolltype = dicetype.substr(1)
	var gotStringReadyToConvert = true
	}
	
/*if (rolltype !== 0)

return message.channel.send("The defined Dice would have " + rolltype + " sides");
	
else*/
if (rolltype == 0)
 return message.channel.send("<:warn_3:498277726604754946> Error: rolltype is not defined \n" + "gotDefault = " + gotDefault + "\n" + "gotStringReadyToConvert = " + gotStringReadyToConvert + "\n" + "detectedOnlyOneArg = " + detectedOnlyOneArg + "\n" + "detectedDiceType = " + detectedDiceType);
 
if (rollcountmax == 0)
 {
  const plaintext = "*...und " + msgauthor + " hörte leise wie der Wind über den leeren Tisch strich,  auf dem nicht ein Würfel zu sehen war...*"
  const embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0x36393E)  
embed.setDescription('<:info_1:498285998346731530> Wenn du ein Ergebnis erhalten möchtest, wäre es vermutlich sinnvoll, das nächste mal auch einen Würfel zu werfen.')
//embed.setAuthor("Header")
embed.setFooter("@" + msgauthor)
//embed.addField("Field");
return message.channel.send(plaintext, embed);
  
// return message.channel.send("<:warn_3:498277726604754946> Error: rollcountmax is not defined \n" + "gotDefault = " + gotDefault + "\n" + "gotStringReadyToConvert = " + gotStringReadyToConvert + "\n" + "detectedOnlyOneArg = " + detectedOnlyOneArg + "\n" + "detectedDiceType = " + detectedDiceType)
 }
	

//Auswürfeln und Ergebnisanzeige
var rollresult = "";
if (rolltype < 7)
//if (rolltype < 10)
{
//Unicode Dice Faces
var useEmotes = false
while (rollcountcur < rollcountmax)
{
	rollcountcur++;
	switch (Math.floor((Math.random() * rolltype) + 1))
	{
		case 1:
		  rollresult += "⚀ ";
		  break;
		case 2:
		  rollresult += "⚁ ";
		  break;
		case 3:
	   rollresult += "⚂ ";
		  break;
		case 4:
		  rollresult += "⚃ ";
		  break;
		case 5:
		  rollresult += "⚄ ";
		  break;
		case 6:
		  rollresult += "⚅ ";
		  break;
		case 7:
		  rollresult += "<:dice7:498269382699646996> ";
		  break;
		case 8:
		  rollresult += "<:dice8:498269498554449921> ";
		  break;
		case 9:
		  rollresult += "<:dice9:498269540954800128> ";
		  break;
	}
} }
else if (rolltype < 10)
{
//Emote Dice Faces
var useEmotes = true
while (rollcountcur < rollcountmax)
{
	rollcountcur++;
	switch (Math.floor((Math.random() * rolltype) + 1))
	{
		case 1:
		  rollresult += "<:dice1:498499602593349640>  ";
//		  rollresult += "1⃣ ";
		  break;
		case 2:
		  rollresult += "<:dice2:498499649783463936>  ";
//		  rollresult += "2⃣ ";
		  break;
		case 3:
		  rollresult += "<:dice3:498499697690935316>  ";
//	   rollresult += "3⃣ ";
		  break;
		case 4:
		  rollresult += "<:dice4:498499821406257152>  ";
//		  rollresult += "4⃣ ";
		  break;
		case 5:
		  rollresult += "<:dice5:498499866310475806>  ";
//		  rollresult += "5⃣ ";
		  break;
		case 6:
		  rollresult += "<:dice6:498499944370667541>  ";
//		  rollresult += "6⃣ ";
		  break;
		case 7:
  	  rollresult += "<:dice7:498269382699646996>  ";
//    rollresult += "7⃣ ";
		  break;
		case 8:
  	  rollresult += "<:dice8:498269498554449921>  ";
//    rollresult += "8⃣ ";
		  break;
		case 9:
  	  rollresult += "<:dice9:498269540954800128>  ";
//    rollresult += "9⃣ ";
		  break;
	}
} }
//1⃣ 2⃣ 3⃣ 4⃣ 5⃣ 6⃣ 7⃣ 8⃣ 9⃣ 🔟
else
{
//[-Eingeklammerte-] Zahlen
var useEmotes = false
var lastroll = rollcountmax - 1
while (rollcountcur < rollcountmax)
{
	rollcountcur++;
//	rollresult += "["
	rollresult += (Math.floor((Math.random() * rolltype) + 1))
//	rollresult += "] "
  if (lastroll !== rollcountcur )
  {
	rollresult += " | ";
	 }
} 
	
//return message.channel.send("Diese Würfel wurden leider noch nicht geliefert...")
}


//Ist Antwort zu lang?


 if(rollcountmax > 128) {
	return message.channel.send("<:warn_3:498277726604754946> Der Tisch ist zu klein, um so viele Würfel darauf zu werfen. Maximal 128 Würfel sind erlaubt ")
}

//Antwort

if (rollcountmax == 1)
{
	/*
return message.channel.send("es wurde mit einem " + rolltype + "-seitigen Würfel gewürfelt. \nDas ergebnis ist: \n\n" + rollresult)
*/

const plaintext = "es wurde mit einem " + rolltype + "-seitigen Würfel gewürfelt."
 const embed = new RichEmbed()  
embed.setColor(0x36393E)  
if(useEmotes)
{
	embed.setDescription(rollresult)
}
else
{
 embed.setAuthor(rollresult)
}
embed.setFooter("@" + msgauthor)

return message.channel.send(plaintext, embed);
}

else
{
	/*
	return message.channel.send("es wurde mit " + rollcountmax + " " + rolltype + "-seitigen Würfeln gewürfelt. \nDas ergebnis ist: \n\n" + rollresult)
	*/
	
	const plaintext = "es wurde mit " + rollcountmax + " " + rolltype + "-seitigen Würfeln gewürfelt."
 const embed = new RichEmbed()  
embed.setColor(0x36393E)  
if(useEmotes)
{
	embed.setDescription(rollresult)
}
else
{
 embed.setAuthor(rollresult)
}
embed.setFooter("@" + msgauthor)

return message.channel.send(plaintext, embed);
	}
	
	}