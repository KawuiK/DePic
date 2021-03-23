const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");

module.exports = {
  name: "report",
  aliases: [],
  description: "Reporta algun problema del bot",
  category: "basic",
  usage: "report <reporte>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 20,
  run: async (client, msg, args) => {
    let channel = client.channels.cache.get("763825308671279164");
    let user = msg.author;
    let reporte = args.join(" ");
    if (!reporte)
      return msg.channel.send(
        `**Envia un reporte o sugerencia al desarrollador!**`
      );

    const embed = new MessageEmbed()
      .setTitle(":e_mail: | **Reporte**")
      .setDescription(
        "`Tu reporte o sugerencia a sido enviado al desarrollador.`"
      )
      .setDescription(reporte)
      .setColor("RANDOM")
      .setFooter("Reporte enviado por " + msg.author.username);

    channel.send(embed);
    msg.channel.send("**Reporte enviado al desarrollador con �xito**");
    msg.channel.send(embed).then((m) => m.react("\u2709"));
  },
};
