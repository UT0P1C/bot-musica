const Discord = require("discord.js");
const client = new Discord.Client();

const TOKEN = "OTQ4OTcyMjczOTg4MTczODQ0.YiDlTQ.9kXP0GR_HYERokZE9bteyxoCA3M";

const prefixo = "$";

const servidores = {
	'server': {
		connection: null,
		despatcher: null
	}
}

client.on("ready", () => {
	console.log("cheguei nessa porra");
});

client.on("message", async (msg) => {
	//filtros
	if(!msg.guild) return;
	if(!msg.content.startsWith(prefixo)) return;

	//comandos

	if(msg.content === prefixo + "brota"){
		await msg.member.voice.channel.join(); // $brota
		msg.channel.send("Brotei");
	}

	if(msg.content === prefixo + "vaza"){

	}

	if(msg.content === prefixo + "ajuda"){
		msg.channel.send("Comandos atuais: $brota, $pao de cria");
	}

	if(msg.content === prefixo + "pao de cria"){
		msg.channel.send("não, de sal");
	}

});

client.login(TOKEN);