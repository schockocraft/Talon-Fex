module.exports = (client, args) => {
 
/*return 
   Array: [
    Object: {
     path: path "/dir/file.type"
     name: path.slice(path.lastIndexOf("."))
     icon: getIcon(path),
     emote: getEmote(path)
     format: path.slice(path.lastIndexOf(".") + 1)
     type: moduleType
     }
    ]
 */
 
 const pathList = []
 var queue = []
 
 //===return===
 
 function retCmd (command) {
  
  const response = {}
  response.path = relativePath(require.resolve("../commands/" + command + ".js"))
  response.name = response.path.slice(1, response.path.lastIndexOf("."))
  response.icon = getIcon(response.path)
  response.emote = getEmote(response.path)
  response.format = response.path.slice(response.path.lastIndexOf(".") + 1)
  response.type = "command"
  
  
  return [response]
  }
  
 function retModule (paths) {
  const multiResponse = []
  paths.forEach(path => {
   console.log("returning match: " + path)
   const response = {}
  response.path = path
  response.name = response.path.slice(1, response.path.lastIndexOf("."))
  response.icon = getIcon(response.path)
  response.emote = getEmote(response.path)
  response.format = response.path.slice(response.path.lastIndexOf(".") + 1)
  response.type = "file"
  multiResponse.push(response)
   })
  
  return multiResponse
  
  }
  
 function multi (absPaths) {
  console.log("convert multiple responses to returnable")
  const relPaths = []
  absPaths.forEach(abs => {
   relPaths.push(relativePath(abs))
   })
   return retModule(relPaths)
  }
 
 
 //===display===
 function showModule (path) {
 	
   //embed.setAuthor("schockocraft/Talon-Fex" + path, "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/blob/master" + path)
   //message.respond(message.c.commands.git.cmdLeft + " " + icon + path.slice(1, path.lastIndexOf(".")) + "\u2024" + type + " " + message.c.commands.git.cmdRight, embed)
 	 }
 	 
 	 //using \u2024 as dot which isn't recognized as dot by discord
 
 function showCmd (command) {
   //embed.setAuthor("schockocraft/Talon-Fex" + relativePath(require.resolve("./" + command + ".js")), "https://cdn.discordapp.com/attachments/498229013093810179/515203530051813409/1542904475253.png", "https://github.com/schockocraft/Talon-Fex/blob/master/commands/" + command + ".js")
   
   //const  displayPath = relativePath(require.resolve("./" + command + ".js"))
   //"schockocraft/Talon-Fex" + relativePath(require.resolve("./" + command + ".js"))
   //
   
   // message.respond(message.c.commands.git.cmdLeft + " " + client.emote("517658260975910912") + command + "\u2024js " + message.c.commands.git.cmdRight, embed)
 	 }
 
 //===search===
 function fetchFile (filename, path) {
   console.log("fetchFile (" + filename + ", " + path + ")")
	  queue[queue.indexOf(path)] = null
	  require('fs').readdirSync(path, {withFileTypes: true}).forEach(dirent => {
	   console.log("check type of " + dirent.name)
	  	 if (dirent.isDirectory()) {
	  	  
	  	  if (dirent.name !== "node_modules") {
	  	   console.log("adding dir to search queue:  /" + dirent.name + "/")
	  		  queue.push(path + "/" + dirent.name)
	  		  }
	  		 else {
	  		  console.log("blacklisted dir:  /" + dirent.name + "/")
	  		  }
	  		 } //if
	  		else if (dirent.name == filename) {
	  		 console.log("match: /" + dirent.name)
	  			pathList.push(path + "/" + dirent.name)
	  			} //else if
	  		}) //readdir.forEach
	  	} //function fetchFile
 
 function relativePath (fullPath) {
  return fullPath.slice(__filename.lastIndexOf("/utility/"))
  } //function relativePath
 
 function getIcon (path) {
 	 const type = path.slice(path.lastIndexOf(".") + 1)
 	 switch (type) {
 	  case "js":
 	   return "https://image.flaticon.com/icons/png/256/136/136530.png"
 	  break;
 	  case "json":
 	   return "https://image.flaticon.com/icons/png/256/136/136525.png"
 	  break;
 	  case "md":
 	   return "https://cdn.discordapp.com/attachments/498229013093810179/517810147146596368/1543525935617.png"
 	  break;
 	  default:
 	   return "https://image.flaticon.com/icons/png/256/136/136549.png"
 	  break;
 	  } //switch
 	 } //function getIcon
 	  
 	function getEmote (path) {
 	 const type = path.slice(path.lastIndexOf(".") + 1)
 	 switch (type) {
 	  case "js":
 	   return client.emote("517658260975910912")
 	  break;
 	  case "json":
 	   return client.emote("517804949497839627")
 	  break;
 	  case "md":
 	   return client.emote("517810148987895819")
 	  break;
 	  default:
 	   return client.emote("517806605878689792")
 	  break;
 	  } //switch
 	 } //function getEmote
 
 
 
 //show specific command module
 if (client.commands.has(args[0])) {
   return retCmd(args[0])
	  } //if
 else if (client.aliases.has(args[0])) {
	  return retCmd(client.aliases.get(args[0]))
	  } //else if
	//returns here if any match
	  
	  
	  
	//show any loaded module
 Object.keys(require.cache).filter(path => path.indexOf(args[0]) == path.length - args[0].length).forEach(match => {
	 pathList.push(match)
	 })
	  if (pathList.length == 1) {
	  	return retModule([relativePath(pathList[0])])
	   //message.respond("match: " + relativePath(pathList[0]))
	   return
	   } //if
	   
	 //show
	  else if (pathList.length == 0) {
	  	//var botDir = __filename.slice(0, __filename.lastIndexOf("/commands/")) + "/"
	  	//fetchFile(args[0], __filename.slice(0, __filename.lastIndexOf("/commands/")))
	  	
	  	queue.push(__filename.slice(0, __filename.lastIndexOf("/utility/")))
	  	
	  while (queue.length) {
	   console.log(queue.length)
	   queue.forEach(dir => {
	    fetchFile(args[0], dir)
	    })
	   var queue = client.fillGaps(queue)
	  	 } //while
	  	 
	  	//message.respond("Matches: \n " + pathList.join(" \n "))
	  	
	  	if (pathList.length) return multi(pathList)
	  	
   } //else if
  else {
	   //multiple matches
	   console.log("[multiple matches]")
	   return multi(pathList)
   } //else
	   
	 if (pathList.length == 0) {
	   //no matches after all
	   return []
	   } //if
	  
 	 //} //?
 	 
 	 //pathList
 
 
 } //module.exports