module.exports = (client, message, args) => {

console.log("module games received call and started...")
console.log(" ")

		const { Client, RichEmbed } = require("discord.js");
		const help = require("./help.js");
		const config = require("../config.json");
		const home = client.guilds.get(config.myguild)
		//503981400630755348
		const gameemotes1 = client.guilds.get(config.ge1)
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
//args.join(" ")
	help(client, message, [games])
return true
}
else return false;

}



//Command

	//help
if (helplink("game", args[0])) return;
 //code
 
 //test for correct setup/sets up everything correctly
var isSetupOk = false
 if (message.guild.channels.find('name', 'Games') !== null) {
  	if (message.guild.channels.find('name', 'Games').children.find('name', 'main_lobby') !== null) {
 		var isSetupOk = true
 		console.log(isSetupOk)
 		console.log(" ")
 		}
 	}
 
 if (args[0] == "setup" && !isSetupOk){
 //setups channels for the lobby system
 	 if (isnotperm()) return;
 	  console.log("Setting up...")
 	  console.log(" ")
 	  
 	  if (message.guild.channels.find('name', 'Games') == null) {
 	  	message.guild.createChannel('Games', 'category')
 	  	}
 	  	
   if (message.guild.channels.find('name', 'main_lobby') == null) {
   
/* message.guild.createChannel('test1', 'text').then(message => {
message.guild.channels.find ('name', 'test1').setParent (message.guild.channels.find('name', 'Games')); });*/
    message.guild.createChannel('main_lobby', 'text').then(message => {
    	message.guild.channels.find('name', 'main_lobby').setParent(message.guild.channels.find('name', 'Games'));});
    }
   else {
    	message.guild.channels.find('name', 'main_lobby').setParent(message.guild.channels.find('name', 'Games'))
    	}
 	  
 	  var plaintext = "<:check_4:498523284804075541> channels were set-upped successfully"
   var embed = new RichEmbed()   
embed.setColor(0x7289DA)  
//embed.setDescription()
embed.setAuthor("Game Lobby System")
embed.setFooter("@" + msgauthor)
  message.channel.send(plaintext, embed);
 	  
 	 return
 	 }
 	  
 	if (args[0] == "setup" && isSetupOk) {
 	  //is already set-upped correctly
 	  console.log("is already set-upped correctly ")
 	  console.log(" ")
 	  var plaintext = "⚠ error:"
   var embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0xffcc4d)  
embed.setDescription("There is already the correct setup")
embed.setAuthor("Game Lobby System")
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
message.channel.send(plaintext, embed);
 	 return
 	 }
 	  
 	if (args[0] !== "setup" && !isSetupOk) {
 	  //Error: wrong setup
 	  console.log("Error: wrong setup ")
 	  console.log(" ")
 	  var plaintext = "⚠ error: wrong channel setup"
   var embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0xffcc4d)  
embed.setDescription("There are not the channels needed to perform this function. Execute `" + config.prefix + "game setup` to get the correct setup.")
embed.setAuthor("Game Lobby System")
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
message.channel.send(plaintext, embed);
 	 return
 	 }
 	  
 	  
 	  
 	  
 	  
 //get called function from arguments 
 switch (args[0]) {
 	 case "list":
 	  //shows list of all avaivable games
 	  
 	 break;
 	 case "lobbys":
 	  //shows list of all opened lobbys
 	  //actually not needed cause channels in category games = lobbys
 	  
 	 break;
 	 case "create":
 	  //opens a lobby for you
 	  
 	 break;
 	 case "accept":
 	  //accept last invite of the mentioned person
 	  
 	 break;
 	 case "join":
 	  //joins a lobby; give the ID or the Name of the lobby, the channel of the lobby, an user or give "random"
 	  
 	 break;
 	 
 	 //The following should work in seemless mode in Lobby
 	 
 	 case "invite":
 	  //invites someone to the lobby you are in
 	  
 	 break;
 	 case "quit":
 	  //quits lobby; if you created the lobby, you can mention someone else in the lobby to give him the permissions to this lobby; else the first user who joined the lobby get the permissions
 	  
 	 break;
 	 case "type":
 	  //set the game of this lobby
 	  
 	 break;
 	 case "mode":
 	  //set if everyone or only invited users can join the lobby; defaults to private
 	  
 	 break;
 	 
 	 default:
 	  //substitute to Help
 	  
 	 break;
  	}
 
 
 } 