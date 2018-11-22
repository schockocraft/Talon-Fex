module.exports = (client, line) => {
	
	const reload = require('./../commands/reload.js')
	//const restart = require('./../commands/restart.js')
	const kill = require('./../commands/kill.js')
	
	const input = line.slice(client.config.prefix.length).trim().split(/ +/g);	
	
	switch (input[0]) {
		case "eval":
		 
		break;
		case "restart":
		 
		break;
		case "reload":
		 input.shift()
		 reload(client, null, input)
		break;
		case "kill":
		case "stop":
		 kill(client, null)
		break;
		case "info":
		 console.log(client.meta)
		break;
		case "help":
		case "commands":
		default:
		 console.log("commands:")
		 console.log(" ├─>abc")
		 console.log(" │   └─>")
		 console.log(" ├─>eval")
		 console.log(" │   └─>execute code")
		 console.log(" ├─>help")
		 console.log(" │   └─>show this list")
		 console.log(" ├─>info")
		 console.log(" │   └─>show package.json")
		 console.log(" ├─>reload")
		 console.log(" │   └─>reload commands and modules")
		 console.log(" ├─>restart")
		 console.log(" │   └─>restarts bot")
		 console.log(" ├─>stop/kill")
		 console.log(" │   └─>stops bot")
		 console.log(" └─>abc")
		 console.log("     └─>")
		break;
		} //switch
	
	
	
	} //module.exports