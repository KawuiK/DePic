const { Client, MessageEmbed, Presence, User } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "botinfo",
  aliases: ["bi"],
  description: "Ve la informacion del bot",
  category: "basic",
  usage: "botinfo",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    let guilds = client.guilds.cache.size;
    let users = client.users.cache.size;
    const actividad = moment
      .duration(client.uptime)
      .format(" D [dias], H [hrs], m [mins], s [secs]");

    const embed = new MessageEmbed()
      .setColor(0x66ff66)

      .setTitle(`Bot info`)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/783715674220527667/783749389729660938/DePic.png"
      )
      .addField(`Dueño`, `\`\`\`Kawui#6497\`\`\``, true)
      .addField(`Version`, `\`\`\`0.9.2\`\`\``, true)
      .addField(`Libreria`, `\`\`\`Discord ^12.3.1 (Js)\`\`\``, true)
      .addField(`Servers`, `\`\`\`${guilds}\`\`\``, true)
      .addField(`Users`, `\`\`\`${users}\`\`\``, true)
      .addField(
        `Antiguedad`,
        `\`\`\`${client.user.createdAt.toLocaleDateString("es-pe")}\`\`\``,
        true
      )
      .addField(
        `Memoria`,
        `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB\`\`\``,
        true
      )
      .addField(`Uptime`, `\`\`\`${actividad}\`\`\``, true)

      .addField(
        "Actualizaciones",
        "Aqui se mostrara todas la actualizaciones del bot: \n\n**1.-**Mas de **40** comandos agregados 💻  \n**2.-**Un nuevo sistema en fabricacion 🛠️ \n**3.-**Sistema de levels en fabricacion 🔄 \n**4.-**Comando de warns\n**5.-**De nuevo estan los comandos de musica 🎶\n**6.-**Nuevo sistemas del bot creado 😎\n**7.-**Sistema de levels casi terminado 🔄"
      )
      .setFooter("Total de comandos 100.");
    msg.channel.send(embed);
  },
};
