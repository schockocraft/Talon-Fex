module.exports = (client, message, args) => {


		const { Client, RichEmbed } = require("discord.js");
		const figlet =  require("figlet");
		const config = require("../config.json");
		
		const home = client.guilds.get(config.myguild)
		const superuserid = config.suid 
	//the Value suid in the config stores the ID of this bot's one superuser
	const botrole = config.permrole
	const superuser = home.members.get(superuserid)
	const msguser = message.author.id
 const msgauthor = message.author.username
 const cmd = args[0].toLowerCase()
 var extra = ""
if (args[1]) {
 var extra = args[1].toLowerCase()
	}
	
//function help(cmd) {
	const sc = "only " + superuser + " may execute this command"
	const bm = 'only ' + superuser + ' and user of role ' + botrole + ' may execute this command'
	var hlpdesc = "";
	var xinfo = "";
	var pinfo = "";
	var sinfo = "";
	var sxinfo = "";
	var image = "";
	var isValidCommand = true
	
	
	
	var field1text = ""
 var field2text = ""
 var field3text = ""
 var field4text = ""

function add1(element) {
	field1text += element + " \n"
	}

function add2(element) {
	field2text += element + " \n"
	}
	
function add3(element) {
	field3text += element + " \n"
	}

function add4(element) {
	field4text += element + " \n"
	}
	
	
	
	
	
function responsetofigletfont(userdecision, request) {
	request.clearReactions()
	if (!isNaN(userdecision)) {
		
		//parse data
		const fonts = figlet.fontsSync()

      const splitmax = fonts.length + 1
	     const splitpoint = Math.floor(splitmax / 4)
 
      const half1 = fonts.slice(0, splitpoint)
      const half2 = fonts.slice(splitpoint, splitpoint * 2)
      const half3 = fonts.slice(splitpoint * 2 , splitpoint * 3)
      const half4 = fonts.slice(splitpoint * 3)

      const char1end = half1[half1.length - 1].charAt(0)
      const char2 = half2[0].charAt(0)
      const char2end = half2[half2.length - 1].charAt(0)
      const char3 = half3[0].charAt(0)
      const char3end = half3[half3.length - 1].charAt(0)
      const char4 = half4[0].charAt(0)
      
    half1.forEach(add1);
    half2.forEach(add2);
    half3.forEach(add3);
    half4.forEach(add4);
      
 const plaintext = "<:info_1:498285998346731530> **Command information:**"
 const embed = new RichEmbed()  
embed.setColor(0xFFFFFF)  
embed.setDescription("FIGlet supports the following fonts:")
embed.setAuthor(config.prefix + cmd)
embed.setTitle(extra)
embed.setFooter("@" + msgauthor)
embed.addField("A - " + char1end, field1text, true)
embed.addField(char2 + " - " + char2end, field2text, true)
embed.addField(char3 + " - " + char3end, field3text, true)
embed.addField(char4 + " - Z", field4text, true)
		
		
		
	 switch (userdecision) {
    case 1:
      console.log("Reaction mail sucessfully captured")
      console.log("trying to send DM")
      console.log(" ")
      //send DM
      
      
      
      const reqembed = new RichEmbed()  
embed.setColor(0xFFFFFF)
embed.setDescription("<:mail_2:499302414856486915> " + message.author.toString() + " you should have received a DM")
embed.setAuthor(config.prefix + cmd)
embed.setTitle(extra)
embed.setFooter("@" + msgauthor)


     request.edit(reqembed)
      //return
    break;
    case 2:
      console.log("Reaction check sucessfully captured")
      console.log("trying to send in channel")
      console.log(" ")
      //send in channel
      
request.edit(plaintext, embed);
      
      //return
    break;
    case 0:
    default:
      console.log("There was no reaction on mail")
      console.log(" ")
      //no reaction
      console.log("won't send")
      console.log(" ")
       message.channel.send("<:warn_3:498277726604754946> The Request was aborted due to missing response from " + msgauthor)
       //return
    break;
     }
    }
    
	 }
	 
	 
	
async function longresponse(content, callback) {
		
		const plaintext = "<:info_1:498285998346731530> **Command information:**"
 const embed = new RichEmbed()  
embed.setColor(0xFFFFFF)  
embed.setDescription("React to this message to choose how to get " + content + " \n\n <:check_1:498283069485350923> will post it in this channel. Don't use this in a channel which is not especially for bots or spam. \n\n<:mail_2:499302414856486915> will send you a DM. \n\nYou have 20 seconds to react.")
embed.setAuthor(config.prefix + cmd)
if (extra !== "") {
embed.setTitle(extra) }
embed.setFooter("@" + msgauthor)

const request = await message.channel.send(plaintext, embed)


//react check
   request.react(home.emojis.get('498283069485350923'))
  
//await check
const filtercheck = (reaction, user) => reaction.emoji.name === home.emojis.get('498283069485350923').name && user.id === msguser

 const check = request.createReactionCollector(filtercheck, { 
   time: 20000 
   }) 
   
 check.on('collect', r => 
   //Antwort → Auswerten
   callback(2, request)
   );
   
  check.on('end', collected =>
   //Keine Antwort
   setNoCheck()
   ) 
   
 //react mail
  	 request.react(home.emojis.get('499302414856486915'))
		
//await mail
 const filtermail = (reaction, user) => reaction.emoji.name === home.emojis.get('499302414856486915').name && user.id === msguser
 
 const mail = request.createReactionCollector(filtermail, { 
   time: 20000 
   }) 
   
 mail.on('collect', r => 
   //Antwort → Auswerten
   callback(1, request)
   );
   
 mail.on('end', collected =>
   //Keine Antwort
   setNoMail()
   ); 
   
try {   
 if (!isNaN(collectedNoMail) && !isNaN(collectedNoCheck)) {
   callback(0, request)
   } }
catch(error) {
   console.log("isNaN reports: " + error)
   console.log(" ")
    };
 }

function setNoCheck() {
	console.log("detected no check")
	console.log(" ")
	var collectedNoCheck = 1
	}
	
function setNoMail() {
	console.log("detected no mail")
	console.log(" ")
 var collectedNoMail = 1
	}
	
	
	
//
//===Hauptfunktion===
//
	
switch (cmd)
{
case "examplecommand":
var hlpdesc = " "
var sinfo = config.prefix + " "
break;



//Alphabetisch sortiert:

case "abgehoben":
var hlpdesc = " "
var sinfo = config.prefix + "abgehoben [{<any name>/<userid>¹/<mention>¹/@me}] \n\n 1: this will only work with users who share at least one server with me"
break;

case "chinfo":
var hlpdesc = "Gives Information about this Channel"
var xinfo = "this command is not finished yet"
break;

case "chname":
var hlpdesc = "this command is not longer part of " + client.name + " \nTry `" + config.prefix + "get chname` instead"
break;

case "conmsg":
case "log":
var hlpdesc = "makes the bot send some message to console an the log file"
var pinfo = bm
var xinfo = "The bot can\'t only say `help` or `?` as it triggers this message. \n\nAs there is no log file yet, the message will only appear on console, and will be lost at restart"
var sinfo = config.prefix + "conmsg <text> \n" + config.prefix + "log <text>"
break;

case "embed":
var hlpdesc = config.prefix + "is a simple testing command which\'s purpose might change constantly"
var pinfo = sc
break;

case "figlet":
var hlpdesc = "FIGlet is a program which converts normal text char by char to large ascii art letters. "
var xinfo = "See also " + config.prefix + "figlet+ for fully customizable ascii art texts. \n\n The bot can\'t only convert `help` or `?` as it triggers this message."
var sinfo = config.prefix + "figlet <text>"
break;

case "figlet+":
  switch (extra) {
  	case "font":
  	  var hlpdesc = "```Type: String \nDefault value: \"Standard\"```\nA string value that indicates the FIGlet font to use."
    var xinfo = "If you want to get a list of all fonts, type " + config.prefix + "help figlet+ fontlist"
    
  break;
  case "fontlist":
    longresponse("a list of the " + figlet.fontsSync().length + " valid fonts you can use with the FIGlet library.", responsetofigletfont) 
    
  break;
  case "horizontallayout":
    var hlpdesc = "```Type: String \nDefault value: \"default\"```\nA string value that indicates the horizontal layout to use. FIGlet fonts have 5 possible values for this: \"default\", \"full\", \"fitted\", \"controlled smushing\", and \"universal smushing\". \"default\" does the kerning the way the font designer intended, \"full\" uses full letter spacing, \"fitted\" moves the letters together until they almost touch, and \"controlled smushing\" and \"universal smushing\" are common FIGlet kerning setups."
    var xinfo = "If you want to get more information about kerning, type " + config.prefix + "help figlet+ kerning"
    
  break;
  case "verticallayout":
    var hlpdesc = "```Type: String \nDefault value: \"default\"```\nA string value that indicates the vertical layout to use. FIGlet fonts have 5 possible values for this: \"default\", \"full\", \"fitted\", \"controlled smushing\", and \"universal smushing\". \"default\" does the kerning the way the font designer intended, \"full\" uses full letter spacing, \"fitted\" moves the letters together until they almost touch, and \"controlled smushing\" and \"universal smushing\" are common FIGlet kerning setups."
    var xinfo = "If you want to get more information about kerning, type " + config.prefix + "help figlet+ kerning"
    
  break;
  case "text":
    var hlpdesc = "This is the text you want to convert. It can be only one character or a long text. Be aware that FIGlet does *not* support line wrap, so if the text you set is too long, there will not longer be anything more than ascii-soup"
    
  break;
  case "kerning":
    var hlpdesc = "The layout options allow you to override a font\'s default \"kerning\". \n\nIn most cases you\'ll either use the default setting or the \"fitted\" setting. Most fonts don\'t support vertical kerning, but a hand full fo them do (like the \"Standard\" font). \n\nBelow you can see how this effects the text. The string \"Kerning\" was printed using the \"Standard\" font with horiontal layouts of \"default\", \"fitted\" and then \"full\"."
    var image = "https://cdn.discordapp.com/attachments/498229013093810179/499680883972767744/1539203576723.png"
    
  break;
  default:
    var hlpdesc = "With this command you can customly set the conversion options on starting FIGlet"
    var xinfo = "If you want to use default settings, use ```" + config.prefix + "figlet <text>```"
    var sinfo = config.prefix + "figlet+ <font> <horizontalLayout> <verticalLayout> <text> "
   }
break;

case "request":
case "get":
  switch (extra) {
//argument types
  
  
//objecttype arguments
  
  
//object arguments
  
  
//valuetype
  
  
  //{channel/<channel>}
  //{server/<server>}
  default:
    var hlpdesc = "this command gives you the information you request."
    var sinfo = config.prefix + "request {object} \n" + config.prefix + "get ?"
  break;
   }



break;

//Commands replaced by get
case "getchname":
var hlpdesc = "this command is not longer part of " + client.name + " \nTry `" + config.prefix + "get channel info` instead"
break;

case "getserver":
var hlpdesc = "this command is not longer part of " + client.name + " \nTry `" + config.prefix + "get server info` instead"
break;

case "getsu":
var hlpdesc = "this command is not longer part of " + client.name + " \nTry `" + config.prefix + "get superuser` instead"
break;

case "permit":
var hlpdesc = "This allows " + superuser + " to temporary permit another users to use a command which is restricted to them. "
var sinfo = config.prefix + "permit <user> {<command>} {<time limit (sec)>}"
//var xinfo = "This command does not work at the moment"
break;

case "whoami_getid":
var hlpdesc = "this command is not longer part of " + client.name + " \nTry `" + config.prefix + "get user info` instead"
break;



//Unsortiert:
	
case "roll":
var hlpdesc = "This is a cool dice roll command. Give the number of sides with `w<count>` (e.g. `w6` or `w20`) and the number of dices by simply typing it. The order doesn\'t matter. You can also use the command without any arguments to simply roll one normal hexaedric dice."
var sinfo = config.prefix + "roll [{w<number of sides>/<number of dices>}] [{w<number of sides>/<number of dices>}]"
var xinfo = "See also " + config.prefix + "xroll for fully customizable rolls"
break;

case "xroll":
var hlpdesc = "This is an even cooler dice roll command. "
var sinfo = config.prefix + "xroll ???"
var xinfo = "This command does not work at the moment"
break;

case "ping":
var hlpdesc = "Calculates ping between sending a message and editing it, giving a nice round-trip latency. \n\nThe second ping is an average latency between the bot and the websocket server (one-way, not round-trip)"
break;

case "say":
var hlpdesc = "makes the bot say something"
var pinfo = bm
var xinfo = "The bot can\'t only say `help` or `?` as it triggers this message"
break;

case "testmsg":
var hlpdesc = "Testing command"
var pinfo = sc
break;

case "start":
var hlpdesc = "Let the bot start typing"
var pinfo = sc
break;

case "stop":
var hlpdesc = "Let the bot start typing"
var pinfo = sc
break;

case "afk":
var hlpdesc = "States your awayness"
break;

case "re":
var hlpdesc = "States your reentering"
break;

case "rolecolor":
var hlpdesc = "Changes the color of the given role"
var sinfo = config.prefix + "rolecolor get {<rolename>/<roleid>} \n to read the role\'s color \n" + config.prefix + "rolecolor {<rolename>/<roleid>} <color> \n to change color"
var xinfo = "<:warn_2:498277617854709784> **WARNING:** rolename *is* case sensitive"
var pinfo = bm
break;

case "clear":
case "prune":
case "purge":
var hlpdesc = "clears the chat"
var sinfo = config.prefix + "clear  [<count>] \n" + config.prefix + "purge  [<count>] \n" + config.prefix + "prune  [<count>]"
var sxinfo = "<count> will default to 1"
var pinfo = bm
break;

default: 
var isValidCommand = false
}


//Antwort

if (isValidCommand) 
{

//console.log(isNaN(sxinfo)) defaults to false

 if (sxinfo == "") {
	 var sxinfo = "If you want to get more information about an argument, type " + config.prefix + "help " + cmd + " <argument> \n\n<:info_1:498285998346731530>This feature is WIP";
}
 else {
  sxinfo += "\n\nIf you want to get more information about an argument, type " + config.prefix + "help " + cmd + " <argument> \n\n<:info_1:498285998346731530>This feature is WIP";
}

	if (hlpdesc === " ") {
		var hlpdesc = "There is no further information on this command"
	}
	const plaintext = "<:info_1:498285998346731530> **Command information:**"
 const embed = new RichEmbed()  
//greyple: 
//embed.setColor(0x99AAB5)  
//white: 
embed.setColor(0xFFFFFF)  
//mix:
//embed.setColor(0xCCD5DA)  
embed.setDescription(hlpdesc)
embed.setAuthor(config.prefix + cmd)
if (extra !== ""){
embed.setTitle(extra)}
embed.setFooter("@" + msgauthor)
if (xinfo !== ""){
embed.addField('Additional Information', xinfo)}
if (pinfo !== ""){
embed.addField('Permissions', pinfo)}
if (sinfo !== ""){
embed.addField('Syntax', sinfo + "\n``` [arguments] are Optional \n <arguments> have to be replaced by an actual value \n {argument/argument} let you choose between the given arguments```\n" + sxinfo)}
if (image !== ""){
embed.setImage(image)}

/*
else {
embed.addField('Arguments', sxinfo)
}
*/
try {
 message.channel.send(plaintext, embed);
 }
catch (error) {
	console.log ("Error: " + error)
	console.log (" ")
	}
}
else message.channel.send("<:warn_3:498277726604754946> The Command " + cmd + " doesn\'t exist or is missing a Help message");
}  