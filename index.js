const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const configs = require("./config.json");

const google = require("googleapis");

const youtube = new google.youtube_v3.Youtube({
	version: "v3",
	auth: configs.GOOGLE_API_KEY
});

const prefixo = configs.PREFIX;

//variável para declarar vários servidores

const servidores = {
	"server": {
		connection: null,
		dispatcher: null,
		row: [],
		imPlaying: false
	}
}

//ligar o bot

client.on("ready", () => {
	console.log("cheguei nessa porra");
});

//funções de mensagem

client.on("message", async (msg) => {
	//filtros
	if(!msg.guild) return;
	if(!msg.content.startsWith(prefixo)) return;

	//comandos

	//chamar o bot para o canal de voz
	if(msg.content === prefixo + "brota"){
		if(msg.member.voice.channel){
			try{
				servidores.server.connection = await msg.member.voice.channel.join(); // $brota
				msg.channel.send("Brotei");
			}catch (err) {
				console.log(err); // erro ao conectar em um canal de voz
			}
		}else if(!msg.member.voice.channel){
			msg.channel.send("entre em um canal de voz antes de me invocar");
			return;
		}
	}


	//sair do canal de voz
	if(msg.content === prefixo + "vaza"){
		if(msg.member.voice.channel){
			msg.member.voice.channel.leave();
			servidores.server.connection = null;
			servidores.server.dispatcher = null;
			msg.channel.send("Vazei"); //$vaza
		}else if(!msg.member.voice.channel){
			msg.channel.send("me invoque no mesmo canal de voz que você");
			return;
		}
	}

	//ajuda
	if(msg.content === prefixo + "ajuda"){
		msg.channel.send("Comandos atuais: $vasco, $brota, $toca, $vaza, $pausa, $volta, $fogos"); //$ajuda
	}

	if(msg.content === prefixo + "pao de cria"){
		msg.channel.send("não, de sal"); // $pao de cria
	}
	
	//tocar o hino do vasco
	if(msg.content === prefixo + "vasco"){
		if(msg.member.voice.channel){
			msg.channel.send("```A CRUZ DE MALTA É O MEU PENDÃO```");
			if(servidores.server.connection === null){
				try{
					servidores.server.connection = await msg.member.voice.channel.join();
				}catch (err) {
					console.log(err); // erro ao conectar em um canal de voz
				}
			}
			servidores.server.connection.play("./vasco.mp3"); //$vasco
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar doente");
			return;
		} 
	}


	//soltar fogos de artificio
	if(msg.content === prefixo + "fogos"){
		if(msg.member.voice.channel){
			if(servidores.server.connection === null){
				try{
					servidores.server.connection = await msg.member.voice.channel.join();
				}catch (err) {
					console.log(err); // erro ao conectar em um canal de voz
				}
			}
			servidores.server.connection.play("./fogos.mp3"); // $fogos
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes");
			return;
		}
	}

	//dar play em uma música
	if(msg.content.startsWith(prefixo + "toca")){
		if(msg.member.voice.channel){
			
			let music = msg.content.slice(6);

			if(music.length === 0){
				msg.channel.send("pô meu mano se tu n falar a musica n tem como eu tocar ne");
				return;
			}

			if(servidores.server.connection === null){
				try{
					servidores.server.connection = await msg.member.voice.channel.join();
				}catch (err) {
					console.log(err); // erro ao conectar em um canal de voz
				}
			}

			if(ytdl.validateURL(music)){
				
				if(servidores.server.connection === null){
					try{
						servidores.server.connection = await msg.member.voice.channel.join();
					}catch (err) {
						console.log(err); // erro ao conectar em um canal de voz
					}
				}
				
				servidores.server.row.push(music); 
				playMusic(); //toca a musica
				msg.channel.send("ADICIONADO À FILA: ```" + result.data.items[0].snippet.title + "```");

			}else{
				youtube.search.list({
					q: music,
					part: "snippet",
					fields: "items(id(videoId), snippet(title, channelTitle))",
					type: "video"
				}, function (err, result) {
					if(err){
						console.log(err);
					}
					if(result){

						const resultList = [];

						//organiza a ordem de resultados de uma pesquisa
						for (let i in result.data.items) {
							const itemMount = {
								"videoTitle": result.data.items[i].snippet.title,
								"channelTitle": result.data.items[i].snippet.channelTitle,
								"id": result.data.items[i].id.videoId
							}

							resultList.push(itemMount);
						}

						//cria a mensagem embed
						const embed = new Discord.MessageEmbed()
						.setColor([178,0,255])
						.setAuthor("MARCELO D2")
						.setDescription("Escolha a música de 1 a 5");

						for (i in resultList){
							embed.addField(
								`${parseInt(i) + 1} - ${resultList[i].videoTitle}`,
								resultList[i].channelTitle
							);
						}

						msg.channel.send(embed)
							.then((embedMessage) => {
								const possibleReactions = ["1️⃣","2️⃣", "3️⃣", "4️⃣", "5️⃣"];

								//reação de emojis para escolher a musica
								for (i in possibleReactions){
									embedMessage.react(possibleReactions[i]);
								}
							});
					}
				});
			}

		}else if(!msg.member.voice.channel){
			
			msg.channel.send("Vai pro canal de voz antes de me chamar ");
			return;
		
		} 
	}

	//pausar a música atual
	if(msg.content === prefixo + "pausa"){
		if(msg.member.voice.channel){
			servidores.server.dispatcher.pause(); // $pausa
			msg.channel.send("Pausei");
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar ");
			return;
		}
	}

	//voltar a tocar a musica
	if(msg.content === prefixo + "volta"){
		if(msg.member.voice.channel){
			servidores.server.dispatcher.pause(true);
			servidores.server.dispatcher.resume(); // $volta
			msg.channel.send("Voltei");
		}else if(!msg.member.voice.channel){
			msg.channel.send("Vai pro canal de voz antes de me chamar");
			return;
		}
	}

});

const playMusic = () => {
	if(servidores.server.imPlaying === false){
		const playing = servidores.server.row[0];
		servidores.server.imPlaying = true;
		servidores.server.dispatcher = servidores.server.connection.play(ytdl(playing, configs.YTDL)); //$toca
	
	
		servidores.server.dispatcher.on("finish", () => {
			
			servidores.server.row.shift();
			
			if(servidores.server.row.length > 0){
				playMusic();
			}else{
				servidores.server.dispatcher = null;
			}
		
		});
	}

}

client.login(configs.DISCORD_TOKEN);
