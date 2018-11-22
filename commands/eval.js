module.exports = (client, message, args) => {

const { Client, RichEmbed } = require("discord.js");

const embed = new RichEmbed()
const collectors = []

var plaintext = client.emote("check_b") + " eval was executed successfully"   

//following function is needed because events.EventEmitter.prototype.emit() gets this=undefined from client.setTimeout() which leads to crash
function outtimed(response) {
	message.runtimeEvents.emit('quit', response, true)
	}
	
	message.runtimeEvents.on('create', (response) => {
		var lifeTime = client.setTimeout(outtimed, 60000, response)
		})
		
	message.runtimeEvents.on('quit', (response, outtimed) => {
		if (!outtimed) {
			try {
		  client.clearTimeout(lifeTime)
		  }
		 catch (err) {
	   console.log("expected error at message.runtimeEvents.on('quit') in eval.js")
	   console.log(" └─>" + err)
	   }
	  }
		collectors.forEach(collector => {
   	try {collector.stop()}
   	catch (err) {
   		console.log(err)
   	}
   	})
   
    response.clearReactions()
	
	})



async function respond (result) {
	
 if (cmd.length < 256) {
  embed.setTitle(cmd) }
 else embed.setTitle(cmd.slice(0, cmd.indexOf(" ")) + "...");
 embed.setAuthor("Eval")
 embed.setFooter("@" + message.author.username)

var response = await message.channel.send(plaintext)

 showRawResult(response, result)

 console.log("finished")
 console.log(" ")
 console.log(result)
 console.log(" ")
 	 }
 	 
 	 
 	 
/*functions:
[raw]
 →send DM
 →inspect: util.inspect(result, false, 1)
   ├>collapse full: "
   ├>expand: util.inspect(result, false, +1)
   ├>collapse: util.inspect(result, false, -1)
   ├>expand full: util.inspect(result, false, null)
   ├>
   ├>
   ├>
   └>raw
 
 */
 
 
 
function chMode (callback, response, result, callCd, depth) {
 response.react("🔎")
 
 var filterMag = (reaction, user) => reaction.emoji.name === "🔎" && user.id === message.author.id

 var mag = response.createReactionCollector(filterMag, { 
   time: 60000 
   }) 
   collectors.push(mag)
   
 var isCollected = false
 mag.on('collect', reaction => {
   //Antwort → Auswerten
   var isCollected = true
   message.runtimeEvents.emit('quit', response)
   callback(response, result, 0)
   });
   
 /*mag.once('end', collected => {
   //Keine Antwort → Reaktionen entfernen
   
   
    
   }) */
   
   if (callCd) {
   	chDepth(response, result, depth)
   	}
 }
 
 

function cdMin (response, result) {
	//client.emote('close')
	console.log("min")
	response.react(client.emote("504299928764416020"))
 
 var filterMin = (reaction, user) => reaction.emoji.id === "504299928764416020" && user.id === message.author.id

 var min = response.createReactionCollector(filterMin, { 
   time: 60000 
   }) 
   
 collectors.push(min)
   
 min.on('collect', reaction => {
   //Antwort → Auswerten
   //message.channel.send("root layer")
   message.runtimeEvents.emit('quit', response, false)
   resolveResult(response, result, 0)
   });
   
	}



function cdDown (response, result, curDepth) {
	//client.emote('minus')
	console.log("down")
	response.react(client.emote("504299889870503936"))
 
 var filterDown = (reaction, user) => reaction.emoji.id === "504299889870503936" && user.id === message.author.id

 var down = response.createReactionCollector(filterDown, { 
   time: 60000 
   }) 
 
 collectors.push(down)
   
 down.on('collect', reaction => {
   //Antwort → Auswerten
   //message.channel.send("layer collapse")
   message.runtimeEvents.emit('quit', response, false)
   resolveResult(response, result, curDepth - 1)
   });
	}



function cdUp (response, result, curDepth) {
	//client.emote('plus')
	console.log("up")
	response.react(client.emote("504299851887149057"))
 
 var filterUp = (reaction, user) => reaction.emoji.id === "504299851887149057" && user.id === message.author.id

 var up = response.createReactionCollector(filterUp, { 
   time: 60000 
   }) 
 
 collectors.push(up)
   
 up.on('collect', reaction => {
   //Antwort → Auswerten
   //message.channel.send("layer expand")
   message.runtimeEvents.emit('quit', response, false)
   resolveResult(response, result, curDepth + 1)
   });
	}



function cdInf (response, result) {
	//client.emote('infinite')
	console.log("inf")
	response.react(client.emote("504299805615456306"))
 
 var filterInf = (reaction, user) => reaction.emoji.id === "504299805615456306" && user.id === message.author.id

 var inf = response.createReactionCollector(filterInf, { 
   time: 60000 
   }) 
 
 collectors.push(inf)
   
 inf.on('collect', reaction => {
   //Antwort → Auswerten
   //message.channel.send("infinite layers")
   message.runtimeEvents.emit('quit', response, false)
   resolveResult(response, result, null)
   });
	}



function chDepth (response, result, curDepth) {
	/*message.runtimeEvents.once('reactionTimeout', () => {
		response.clearReactions()
		});*/
		
	switch (curDepth) {
  case null: //infinite
	  cdMin(response, result)
	 break;
	 case 0: //none
	  cdUp(response, result, 1)
	  cdInf(response, result)
	 break;
	 case 1: //min = down
	  cdDown(response, result, 2)
	  cdUp(response, result, 2)
	  cdInf(response, result)
	 break;
	 default:
	  cdMin(response, result)
	  cdDown(response, result, curDepth)
	  cdUp(response, result, curDepth)
	  cdInf(response, result)
	 break;
	 }
	}
 	 
 	 
 	 
async function showRawResult (response, result, depth) {
	
 //response.clearReactions()
 //var embedInteractive = embed
 embed.fields = []

 if (client.hasToString(result)) {
  if ((result.toString().indexOf(client.token) == -1) || (message.channel.type == "dm" && message.author.id == client.config.suid)) {
   embed.addField("Raw result:", result.toString().slice(0,1024))
   embed.setColor(0x7289DA)
   }
  else {
 	  embed.setDescription("🛡 **Security Warning:** restricted information is not avaivable in public channels. Try in DM Channel")
  	 embed.setColor(0xcc0000)
  	 embed.setImage("https://media1.tenor.com/images/a8b0a72b4d23609c7f30b3ff2c3e9095/tenor.gif")
   	}
   
   response.edit(plaintext, embed);
 
   message.runtimeEvents.emit('create', response)
   chMode(resolveResult, response, result, false)
   
  }
 else {
	 embed.setDescription("The executed code returned no response")
	 embed.setColor(0x7289DA)
	 response.edit(plaintext, embed);
 
 message.runtimeEvents.emit('create', response)
	 }
	}
	
	
	
async function resolveResult(response, result, depth) {
	//response.clearReactions()
 //var embedInteractive = embed
 embed.fields = []

 var output = client.resolve(result, false, depth)

 if (client.hasToString(output)) {
  if ((output.toString().indexOf(client.token) == -1) || (message.channel.type == "dm" && message.author.id == client.config.suid)) {
   embed.addField("Resolved result:", output.toString().slice(0,1024))
   embed.setColor(0x7289DA)
   }
  else {
  	 embed.setDescription("🛡 **Security Warning:** restricted information is not avaivable in public channels. Try in DM Channel")
 	  embed.setColor(0xcc0000)
 	  embed.setImage("https://media1.tenor.com/images/a8b0a72b4d23609c7f30b3ff2c3e9095/tenor.gif")
   }
  
  response.edit(plaintext, embed);
	
 	message.runtimeEvents.emit('create', response)
	chMode(resolveResult, response, result, true, depth)
  
  }
 else {
	 embed.setDescription("⚠ Error: lost response")
  embed.setColor(0xffcc4d)
  response.edit(plaintext, embed);
	 }

 
	//chDepth(response, result, depth)
	}
	
	
	  
 const cmd = args.join(" ")
 
 
 
	try {
		const result = eval(cmd)
	  	respond(result)
		}
	catch(error) {
		var plaintext = "⚠ error on trying to execute eval:" 
embed.setColor(0xffcc4d)  
//alter längenbegrenzer
if (cmd.length < 256) {
embed.setTitle(cmd) }
else embed.setTitle(cmd.slice(0, cmd.indexOf(" ")) + "...");
// -
embed.setDescription(error)
embed.setAuthor("Eval")
embed.setFooter("@" + message.author.username)
  message.respond(plaintext, embed);
		 }
	}