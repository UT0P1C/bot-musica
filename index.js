const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");

const TOKEN = "OTQ4OTcyMjczOTg4MTczODQ0.YiDlTQ.9kXP0GR_HYERokZE9bteyxoCA3M";

const prefixo = "$";
const apenasAudio = {
	filter: "audioonly"
}

const servidores = {
	"server": {
		connection: null,
		dispatcher: null
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
			return;
		}
	}

	if(msg.content === prefixo + "vaza"){
		if(msg.member.voice.channel){
			msg.member.voice.channel.leave();
			servidores.server.connection = null;
			servidores.server.dispatcher = null;
			msg.channel.send("Vazei");
		}else if(!msg.member.voice.channel){
			msg.channel.send("nem vc ta ai pra que ta me expulsando desgraça");
			return;
		}
	}

	if(msg.content === prefixo + "ajuda"){
		msg.channel.send("Comandos atuais: $brota, $pao de cria, $toca, $vaza, $pausa, $volta"); //$ajuda
	}

	if(msg.content === prefixo + "pao de cria"){
		msg.channel.send("não, de sal"); // $pao de cria
	}
	
	if(msg.content === prefixo + "vasco"){
		if(msg.member.voice.channel){
			msg.channel.send("O CAMPEÃO DOS CAMPEÕES!!!!");
			servidores.server.connection = await msg.member.voice.channel.join();
			servidores.server.connection.play("./vasco.mp3"); //$vasco
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar doente");
			return;
		} 
	}

	if(msg.content.startsWith(prefixo + "toca")){
		if(msg.member.voice.channel){
			
			let music = msg.content.slice(6);

			if(ytdl.validateURL(music)){
				servidores.server.connection = await msg.member.voice.channel.join();
				
				servidores.server.dispatcher = servidores.server.connection.play(ytdl(music, apenasAudio)); //$toca <link>

				msg.channel.send("Toquei");
			}else{
				msg.channel.send("bota link do youtube burro");
			}

		}else if(!msg.member.voice.channel){
			
			msg.channel.send("Vai pro canal de voz antes de me chamar doente");
			return;
		
		} 
	}

	if(msg.content === prefixo + "pausa"){
		if(msg.member.voice.channel){
			servidores.server.dispatcher.pause(); // $pausa
			msg.channel.send("Pausei");
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar doente");
			return;
		}
	}

	if(msg.content === prefixo + "volta"){
		if(msg.member.voice.channel){
			servidores.server.dispatcher.pause(true);
			servidores.server.dispatcher.resume(); // $volta
			msg.channel.send("Voltei");
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar doente");
			return;
		}
	}

});

client.login(TOKEN);