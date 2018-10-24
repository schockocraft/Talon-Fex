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



//Command

	//help
if (helplink("rolecolor", args[0])) return;
	//perm
if (isnotperm()) return;
 //code
 
//validating arguments
 /*
 Multiple arguments are allowed to support role names with space
 if(args[2])
	
	return message.channel.send("<:warn_3:498277726604754946> Error: too many Arguments. Use help to get more information");
*/

//join all args belonging to role name and get role
const joinedargs = args.join(" ");
  //länge wegzuschneidender teil = args[0].length / args[args.length - 1].length
  //string.slice(position of the char at left of wanted string[, position of the char at right of wanted string])
  //number of argumemts = args.length

if (args[0] === "get") {
	var argsrole = joinedargs.slice(4)
	var fullrole = argsrole
	var getDetected = true
}
else {
console.log("There are " + args.length + " arguments")
console.log(" ")
console.log("There is no get")
console.log(" ")
	const ncindex = args.length - 1
	var newcolor = args[ncindex]
console.log("New Color (newcolor) is " + newcolor)
	const colorlength = newcolor.length + 1
	const fulllength = newcolor.length
	console.log("argument \"color\" is " + fulllength + " chars long (fulllength) and the last " + colorlength + " chars will be sliced out (colorlength)")
	console.log(" ")
	var fullrole = joinedargs.slice(0, joinedargs.length - fulllength)
	var argsrole = joinedargs.slice(0, joinedargs.length - colorlength)
	var getDetected = false
 }
	
	//check if role exist
	

  if (isNaN(argsrole)) {
   	try {
  		 	//get role by name
 const rolebyname = message.guild.roles.find("name", argsrole)
  	
		var selectedrole = rolebyname
console.log (`The role id of ${rolebyname.name} is ${rolebyname.id}`)
 }
catch(error) {
	console.log("Error: " + error);
	console.log(" ")
} }
  else {
  	 try {
  		//get role by ID
 const rolebyid = message.guild.roles.find("id", argsrole)
  	
  	var selectedrole = rolebyid
console.log (`The role name of ${rolebyid.id} is ${rolebyid.name}`)
 }
catch(error) {
	console.log("Error: " + error);
	console.log(" ")
} }

try {
   if (!isNaN(selectedrole.id)) {
  


	//is there a color?
	
	if (!args[1]) {
		console.log("Error: There is no color given");
  	console.log(" ")
		 return message.channel.send('<:warn_3:498277726604754946> Error: There is no color given')
	 }
	else if (newcolor < 0 || newcolor > 0xFFFFFF) {
		console.log("Error: color out of range");
  	console.log(" ")
   return message.channel.send('<:warn_3:498277726604754946> Error: Color must be within the range 0 - 16777215 (0xFFFFFF).');
  } 
 else if (newcolor && isNaN(newcolor)) {
  	console.log("Error: Unable to convert color to a number.");
	 console.log(" ")
   return message.channel.send('<:warn_3:498277726604754946> Error: Unable to convert color to a number.');
    }
    
	

	//is args[0] get?
	
	if (args[0] === "get") {
		const plaintext = "The color of"
const embed = new RichEmbed()  
embed.setTitle(selectedrole.id) 
embed.setColor(selectedrole.color)  
embed.setDescription("is " +  selectedrole.hexColor )
embed.setAuthor(selectedrole.name)
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
 console.log("Successfully returned color");
	console.log(" ")
return message.channel.send(plaintext, embed);
	}
	else
	{
		
	//check if user may edit
	//message.channel.guild.role.editable
	
	//edit color
const oldcolor = selectedrole.hexColor

selectedrole.setColor(newcolor) 

const plaintext = "Changed color of"
const embed = new RichEmbed()  
embed.setTitle(selectedrole.id) 
embed.setColor(newcolor)  
embed.setDescription("from " + oldcolor + " to " + newcolor )
embed.setAuthor(selectedrole.name)
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
 console.log("Successfully changed color");
	console.log(" ")
return message.channel.send(plaintext, embed);

} }
 } 
catch(error) { 
console.log("Error: " + error);
console.log(" ")
}

console.log("getDetected: " + getDetected)
console.log(" ")
console.log("Unknown Error in execution of command");
console.log(" ")

//<:warn_3:498277726604754946>
const finaltext = "⚠ Error: Either this is no role on " + message.channel.guild.name + " or there is no color."
const embed = new RichEmbed()  
//embed.setTitle('Title') 
embed.setColor(0xffcc4d)  
embed.setDescription("Try `" + config.prefix + "rolecolor get {<rolename>/<roleid>}` if you don\'t intend to change the color.")
//embed.setAuthor("Header")
embed.setFooter("@" + msgauthor)
//embed.addField("Field", "Value");
return message.channel.send(finaltext, embed);
}