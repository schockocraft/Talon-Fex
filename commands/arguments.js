module.exports = (client, message, args) => {


		const { Client, RichEmbed } = require("discord.js");
		const help = require("./help.js");
		const config = require("../config.json");
		const home = client.guilds.get(config.myguild)
		const superuserid = config.suid 
	//the Value suid in the config stores the ID of this bot's one superuser
	const botrole = config.permrole
	const superuser = message.guild.members.get(superuserid)
	const msguser = message.author.id
 const msgauthor = message.author.username
 
 
 
 //=== Permission System === 

/*
//perm
if (isnotsu()) return;
//code
*/

function isnotsu() {
if(msguser !== superuserid ) {
const plaintext = "<:warn_3:498277726604754946> Sorry, you don't have permissions to use this!"
const embed = new RichEmbed()  
//.setTitle('Title') 
.setColor(0xCC0000)  
.setDescription('only ' + superuser + ' may use this command')
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
if(!message.member.roles.some(r=>[botrole].includes(r.name)) ) {

	const plaintext = "<:warn_3:498277726604754946> Sorry, you don't have permissions to use this!"
const embed = new RichEmbed()  
//.setTitle('Title') 
.setColor(0xCC0000)  
.setDescription('only user of role ' + botrole + ' may use this command')
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
	if(!message.member.roles.some(r=>[botrole].includes(r.name)) && msguser !== superuserid ) {
			const plaintext = "<:warn_3:498277726604754946> Sorry, you don't have permissions to use this!"
const embed = new RichEmbed()  
//.setTitle('Title') 
.setColor(0xCC0000)  
.setDescription('only user of role ' + botrole + ' and ' + superuser + ' may use this command')
//.setAuthor("Header")
.setFooter("@" + msgauthor)
//.addField("Field");
message.channel.send(plaintext, embed);
return true
}
else
return false;
}



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

function argresolve(){}



function argvaltest(){}


//Command

	//help
if (helplink("arguments", args[0])) return;
	//perm
if (isnotperm()) return;
 //code
 
 
 
 
 } 