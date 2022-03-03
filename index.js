const Discord = require("discord.js");
const client = Discord.Client();

const TOKEN = "OTQ4OTcyMjczOTg4MTczODQ0.YiDlTQ.9kXP0GR_HYERokZE9bteyxoCA3M";

client.on("ready", () => {
	console.log("cheguei nessa porra");
});

client.on("message", (msg) => {

});

client.login(TOKEN);