module.exports = (client, message, args) => {


		const { Client, RichEmbed } = require("discord.js");
		const resetReload = require('../debug/resetReload.js')

 //code
 
 function reloadCmd (command) {
  try {
   client.commands.delete(command)
   delete require.cache[require.resolve("./" + command + ".js")]
 	  client.commands.set(command, require("./" + command + ".js"))
 	  }
 	 catch (error) {
   console.log("Error while trying to reload " + command + ": " + error)
   if (message !== null) {
    embed.setColor(0xffcc4d)
    embed.setDescription(error)
    embed.setAuthor(command)
    message.respond(message.c.reload.cmdErr, embed)
    return
    }
   }
  if (message !== null) {
   embed.setColor(0x36393E)
   console.log("successfully reloaded module " + command)
   embed.setAuthor(command, "https://image.flaticon.com/icons/png/256/136/136530.png", "https://github.com/schockocraft/Talon-Fex/blob/master/commands/" + command + ".js")
    message.respond(client.emote("check_b") + message.c.reload.cmd, embed)
   }
  console.log("successfully reloaded " + command)
  
  	}
 
 const embed = new RichEmbed()
if (message !== null) {
  embed.setFooter("@" + message.author.username)
 }
 
 if (!args[0] || ["all","commands"].includes(args[0])) {
 	//reload all commands
 	 try {
   client.cmdfiles.forEach(file => {
    delete require.cache[require.resolve("./" + file)]
    })
  delete client.commands 
  delete client.aliases
  delete client.cmdfiles
  delete client.cmdMeta
  delete require.cache[require.resolve("../commands.json")]
  client.cmdMeta = require("../commands.json");
  client.loadCommands()
   }
  catch (error) {
   console.log("Error while trying to reload all modules:")
   console.log(client.resolve(error))
   if (message !== null) {
    embed.setColor(0xffcc4d)
    embed.setDescription(client.resolve(error))
    client.lastError = error
    message.respond(message.c.reload.allErr, embed)
    
    try {
     resetReload(client)
     }
    catch (err) {
    	console.log("unable to reset reload: " + err)
    	return
    	}
    console.log("resetted reload. reloading again after fixing the error will revive bot")
    return
    }
   }
  //sucessfully reloaded
  embed.setColor(0x36393E)
  console.log("successfully reloaded all command modules")
   if (message !== null) {
    message.respond(client.emote("check_b") + message.c.reload.all, embed)
    }
  }
 else {
 	//reload specific command module
 	 if (client.commands.has(args[0])) {
   reloadCmd(args[0])
	  }
  else if (client.aliases.has(args[0])) {
	  reloadCmd(client.aliases.get(args[0]))
	  } //else if
 	 	
 	 } //else
 
 } //module.exports