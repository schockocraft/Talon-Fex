module.exports = (client, message, args) => {
 

		const { Client, RichEmbed } = require("discord.js");
	 const permcheck = require("../permissions.js")
	 const getModule = require("../utility/getModule.js")
	 const embed = new RichEmbed()
   embed.setFooter("@" + message.author.username)
  //embed.setColor(0x24292E)
  var multiList = []

 //code
 
 /*
 module:
 
 embed.setAuthor("schockocraft/Talon-Fex" + path, "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/blob/master" + path)
    message.respond(message.c.commands.git.cmdLeft + " " + icon + path.slice(1, path.lastIndexOf(".")) + "\u2024" + type + " " + message.c.commands.git.cmdRight, embed)
 
 
 command:
 
 embed.setAuthor("schockocraft/Talon-Fex" + relativePath(require.resolve("./" + command + ".js")), "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/blob/master/commands/" + command + ".js")
 message.respond(message.c.commands.git.cmdLeft + " " + client.emote("517658260975910912") + command + "\u2024js " + message.c.commands.git.cmdRight, embed)
 
 */
 
 const matches = getModule(client, args)
 //const matches = []
 
 /*switch (matches.type) {
  case "command":
   
   
  break;
  case "module":
   
   
  break;
  }*/
 
 
 
 switch (matches.length) {
  case 0:
   //no match
   message.respond("⚠" + message.c.commands.git.noMatchLeft + " `" + args[0] + "` " + message.c.commands.git.noMatchRight)
  break;
  case 1:
   //one match
   //matches[0].~
   embed.setColor(0x24292E)
   
   embed.setAuthor("schockocraft/Talon-Fex" + matches[0].path, "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/blob/master" + matches[0].path)
   
   message.respond(message.c.commands.git.cmdLeft + " " + matches[0].emote + matches[0].name + "\u2024" + matches[0].format + " " + message.c.commands.git.cmdRight, embed)
   
  break;
  default:
   //multiple matches
   embed.setColor(0x24292E)
   
   matches.forEach(file => {
    //matches[indexOf(file)].~
    /*View client.emote(paperstack) matches.length files on GitHub
      client.emote(GitHub) schockocraft/Talon-Fex/
      Tree-list: Files*/
      console.log(matches.indexOf(file))
      console.log(matches.length)
    if (matches.indexOf(file) !== matches.length - 1) {
     multiList.push("\u00A0\u251C\u25B8" + file.emote + "[" + file.path + "](https://github.com/schockocraft/Talon-Fex/blob/master" + file.path + ")")
     }
    else {
     multiList.push("\u00A0\u2514\u25B8" + file.emote + "[" + file.path + "](https://github.com/schockocraft/Talon-Fex/blob/master" + file.path + ")")
     }
    
    
    })
    
    embed.setAuthor("schockocraft/Talon-Fex/...", "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/blob/master")
    
    
    
    embed.setDescription(multiList.join("\n"))
    
    message.respond(message.c.commands.git.cmdLeft + " " + client.emote('518117732546248742') + matches.length + " " + message.c.commands.git.cmdMulti + " " + message.c.commands.git.cmdRight, embed)
    
  break;
  }
 
 
 
 
 
 
 } //module.exports