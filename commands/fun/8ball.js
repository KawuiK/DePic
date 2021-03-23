const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "bola8",
  aliases: [],
  description: "Hasle una pregunta al bot",
  category: "fun",
  usage: "bola8 <pregunta>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    var rpts = ["No", "Tal vez", "No se", "¡Claro!", "Si <3", "No >:("];

    let pregunt = args.slice(1).join(" ");
    if (!pregunt) return msg.channel.send(":x: | Falta la pregunta.");

    const embed = new MessageEmbed()
      .setTitle("Command | 8Ball")
      .setThumbnail(msg.author.avatarURL)
      .addField("Su pregunta es:", args, true)
      .addField(
        "Mi respuesta es:",
        rpts[Math.floor(Math.random() * rpts.length)],
        true
      );
    msg.channel.send(embed);
  },
};
