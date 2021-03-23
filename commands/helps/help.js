const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["cmd"],
  description: "Muestra todos los comandos del bot",
  category: "helps",
  usage: "help <staff/dirvecion/informacion/nsfw>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: Number,
  run: async (client, msg, args, p) => {
    let user = msg.member;
    let nswf = msg.channel.nsfw;
    const utility = client.commands
      .filter((c) => c.category == "basic")
      .map((c) => "`" + c.name + "`")
      .join(" **||** ");
    const moderation = client.commands
      .filter((c) => c.category == "admin")
      .map((c) => "`" + c.name + "`")
      .join(" **||** ");
    const config = client.commands
      .filter((c) => c.category == "config")
      .map((c) => "`" + c.name + "`")
      .join(" **||** ");
    const fun = client.commands
      .filter((c) => c.category == "fun")
      .map((c) => "`" + c.name + "`")
      .join(" **||** ");
    const music = client.commands
      .filter((c) => c.category == "music")
      .map((c) => "`" + c.name + "`")
      .join(" **||** ");
    const nsfwanime = client.commands
      .filter((c) => c.category == "NSFW")
      .map((c) => "`" + c.name + "`")
      .join(" **||** ");
    const nsfwreal = client.commands
      .filter((c) => c.category == "NSFW2")
      .map((c) => "`" + c.name + "`")
      .join(" **||** ");
    const cmd =
      client.commands.find((c) => c.name == args[0]) ||
      client.commands.find((c) => c.aliases.includes(args[0]));
    if (cmd) {
      const embed = new MessageEmbed()
        .setColor("#0FFF00")
        .setTitle(`__**Command Help**__`)
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nAsi funciona este comando!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .addField(
          `Comando Help`,
          `> **Nombre** -> ${cmd.name}
        > **Alias** -> ${cmd.aliases.join(" | ") || "No tiene alias"}
        > **Descripcion** -> ${cmd.description || "No tiene descripcion"}
        > **Uso** -> ${p}${cmd.usage}
        > **Categoria** -> ${cmd.category}
        > **Cooldown** -> ${
          new String(cmd.cooldown).split("0")[0] + "s" || "No tiene cooldown"
        }`
        )
        .setThumbnail(client.user.displayAvatarURL({ format: "png" }));
      return msg.channel.send(embed);
    }
    if (args[0] === "utility") {
      const info = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nEstos son mis comandos!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .setColor("YELLOW")
        .addField(
          `**Utility [${
            client.commands.filter((c) => c.category == "basic").size
          }]**`,
          utility
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(info);
    } else if (args[0] === "fun") {
      const Fun = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nEstos son mis comandos!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .setColor("GREEN")
        .addField(
          `**Fun [${
            client.commands.filter((c) => c.category == "fun").size
          }]**`,
          fun
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(Fun);
    } else if (args[0] === "music") {
      const Music = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nEstos son mis comandos!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .setColor("PURPLE")
        .addField(
          `**Musica [${
            client.commands.filter((c) => c.category == "music").size
          }]**`,
          music
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(Music);
    } else if (args[0] === "staff") {
      const Staff = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nEstos son mis comandos!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .setColor("RED")
        .addField(
          `**Moderacion [${
            client.commands.filter((c) => c.category == "admin").size
          }]**`,
          moderation
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(Staff);
    } else if (args[0] === "config") {
      const Config = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nEstos son mis comandos!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .setColor("AQUA")
        .addField(
          `**Config [${
            client.commands.filter((c) => c.category == "config").size
          }]**`,
          config
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(Config);
    } else if (args[0] === "nsfwanime") {
      if (!nswf)
        return msg.channel.send(
          "No es un canal NSFW, No es valido el comando aqui"
        );
      const nsfwanimeEmbed = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nEstos son mis comandos!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .setColor("AQUA")
        .addField(
          `**NSFW de anime [${
            client.commands.filter((c) => c.category == "NSFW").size
          }]**`,
          nsfwanime
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(nsfwanimeEmbed);
    } else if (args[0] === "nsfwreal") {
      if (!nswf)
        return msg.channel.send(
          "No es un canal NSFW, No es valido el comando aqui"
        );
      const nsfwRealEmbed = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(
          `**!DePic**.\nEstos son mis comandos!\n[Invite me](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)`
        )
        .setColor("AQUA")
        .addField(
          `**NSFW de real [${
            client.commands.filter((c) => c.category == "NSFW2").size
          }]**`,
          nsfwreal
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(nsfwRealEmbed);
    } else {
      const HelpGeneral = new MessageEmbed()
        .setAuthor(
          client.user.tag,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("GREEN")
        .addField("Uso de categorias", `${p}help **(categoria)**`)
        .addField(
          "Categorias",
          "```config || staff || music || fun || utility || nsfwanime || nsfwreal```"
        )
        .addField(
          "Mas Ayuda?",
          `Usa **${p}help (comando)** Para saber la informacion del comando!`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        );
      msg.channel.send(HelpGeneral);
    }
    /*    if (args[0] === "informacion") {
      const Info = new MessageEmbed()
        .setTitle("Info Help")
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("**Prefix basico del bot -> &**")
        .setColor("BLUE")
        .addField(
          "Comandos de informacion",
          "```UserInfo: La informacion de un usuario \nServerInfo: La informacion de un server\nRolesInfo: Todos los roles del server\nBotInfo: La informacion de este bot!```"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        )
        .setTimestamp();
      msg.channel.send(Info);
    } else if (args[0] === "dirvecion") {
      const Div = new MessageEmbed()
        .setTitle("Divercion Help")
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("**Prefix basico del bot -> &**")
        .setColor("YELLOW")
        .addField(
          "Comandos de divercion",
          "```NumberRandom: busca un numero del 0 al 100\nAvatar: Muestra el avatar de alguien\nPing: Muestra el ping del bot\nLove: Ve el amor que tienes tu y otra persona\nicono: Muestra la foto del server\nBola8: Preguntale algo al bot\nmobileWallpapers: Muestra un Wallpaper para telefonos (Anime)\nWallpapers: Muestra un Wallpapers para pc (Anime)```"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        )
        .setTimestamp();
      msg.channel.send(Div);
    } else if (args[0] === "musica") {
      const Music = new MessageEmbed()
        .setTitle("Musica Help")
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("**Prefix basico del bot -> &**")
        .setColor("PURPLE")
        .addField(
          "Comandos de musica",
          "```Play: pon una cancion a la cola\nPause: Pausa una cancion\nQueue: Ve la queue\nResume: Reanuda una cancion\nStop: Para la lista de canciones\nVolumen: Cambia el volumen de la cancion```"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        )
        .setTimestamp();
      msg.channel.send(Music);
    } else if (args[0] === "staff") {
      const Staff = new MessageEmbed()
        .setTitle("Staff Help")
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("**Prefix basico del bot -> &**")
        .setColor("RED")
        .addField(
          "Comandos de staff",
          "Kick: Saca a un usuario del server\nBan: Saca a un usuario y prohibe el ingreso a este\nAddRol: Añale un rol a un usuario\nDelRol: Quitale un rol a un usuario\nSlowmode: Activa el Slowmode en el canal\nSetPrefix: Setea un nuevo prefix al bot\nSay: Has que el bot diga algo\nidmember: Menciona al usuario y manda la id"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        )
        .setTimestamp();
      msg.channel.send(Staff);
    } else if (args[0] === "nsfw") {
      let nswf = msg.channel.nsfw;
      if (!nswf)
        return msg.channel.send(
          "No es un canal NSFW, NO es valido el comando aqui"
        );
      const NSFW = new MessageEmbed()
        .setTitle("Music Help")
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("**Prefix basico del bot -> &**")
        .setColor("RED")
        .addField(
          "Comandos de staff",
          "Play: Pon una cancion\nskip: Salta una cancion\nstop: Para la lista de canciones\nresumen: Reanuda la canciones\npause: pausa las canciones\nvolumen: Cambia el volumen a las canciones"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        )
        .setTimestamp();
      msg.channel.send(NSFW);
    } else if (args[0] === "musica") {
      const Musica = new MessageEmbed()
        .setTitle("NsfwHelp")
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Aqui los comandos rikos")
        .addField("Nekos", "``NSFWNeko``")
        .addField(
          "Anime",
          "``AAss`` ``AnimeBdsm`` ``AnimeBlowjob`` ``AnimeCum`` ``Doujin`` ``AnimeFeet`` ``AnimeFemdom`` ``NSFWFoxgirl`` ``AnimeGlasses`` ``Hentai`` ``AnimeMaid`` ``AnimeMasturbation`` ``AnimeNetorare`` ``AnimeOrgy`` ``AniemPanties`` ``AnimePussy`` ``AniemSchool`` ``AnimeTentacles`` ``AnimeThighs`` ``AnimeUglyBastard`` ``AnimeUniform`` ``AnimeYuri`` ``Afeet`` ``Apussy`` ``Atits``"
        )
        .addField("WallPapers", "``NmobileWallpapers``, ``NmobileWallpapers``")
        .addField("NSFW", "NsfwHelp Solo se admite en canales NSFW")
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        )
        .setTimestamp();
      msg.channel.send(Musica);
    } else {
      const help = new MessageEmbed()
        .setTitle("Help")
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Escribe: ***Help (Categoria)***")
        .setColor("GREEN")
        .addField(
          "Las categorias que tenemos",
          "👑 | staff             ⚽ | divercion\n\n🆕 | informacion             🍕 | nsfw \n\n 🎶 | musica"
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/763804175510929469/813806894266974218/DePic_2.png"
        )
        .setTimestamp();
      msg.channel.send(help);
    }*/
  },
};
