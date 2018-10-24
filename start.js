//Import der Discord API
const Discord = require("discord.js");

//Import von node Modulen
const moment = require("moment");
const fs =  require("fs");

//Import von JSON Dateien
const config = require("./config.json");
const meta = require("./package.json");

//Initializing Client
const client = new Discord.Client();

//Import von Basis Modulen

const core = require("./core.js");

//Import von Command Modulen

client.commands = new Discord.Collection();

fs.readdir("./commands/", (fserror, cmdfiles) => {
  if (fserror) console.error(fserror);
  cmdfiles.forEach(file => {
    let cmdlink = require("./commands/" + file)
    client.commands.set(file.slice(0, file.lastIndexOf("."), cmdlink))
    } )
  } )
  
//Starting Bot

//Nice Startup Screen with Ascii-art

console.log ("---------------------------------------------------")
console.log(" _____      _                ____");
console.log("|_   _|__ _| | ___  _ __    |  __| ___  _  _");
console.log("  | | / _` | |/ _ \\| `_ \\   | |_  / _ \\\\ \\/ /");
console.log("  | || (_| | | (_) | | | |  |  _||  __/ >  <");
console.log("  |_| \\__,_|_/\\___/|_| |_|  |_|   \\___||_/\\_|");
console.log ("---------------------------------------------------")

client.on("ready", () => {

console.log("     _ Talon Fex " + meta.version + " by schockocraft")
console.log(" _  // ")
console.log(" \\\\//  Bot has successfully started")
console.log("  \\/   ")
console.log("    at " + moment(Date.now()).format("HH:mm:ss, DD.MM.YYYY")) 
console.log("  with " + client.users.size + " users,")
console.log("    in " + client.channels.size + " channels")
console.log("    on " + client.guilds.size + " servers")

//Set Activity
client.user.setActivity("messages from you", { type: 'LISTENING' });
});
//Started Bot

client.login(config.token);

core(client);







