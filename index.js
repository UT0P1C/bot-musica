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
		if(msg.member.voice.channel){
			servidores.server.connection = await msg.member.voice.channel.join(); // $brota
			msg.channel.send("Brotei");
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar doente");
		}
	}

	if(msg.content === prefixo + "vaza"){
					//$vaza
	}

	if(msg.content === prefixo + "ajuda"){
		msg.channel.send("Comandos atuais: $brota, $pao de cria"); //$ajuda
	}

	if(msg.content === prefixo + "pao de cria"){
		msg.channel.send("não, de sal"); // $pao de cria
	}
	
	if(msg.content === prefixo + "vasco"){
		if(msg.member.voice.channel){
			servidores.server.connection = await msg.member.voice.channel.join();
			servidores.server.connection.play("./vasco.mp3"); //$vasco
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar doente");
		} 
	}

});

client.login(TOKEN);