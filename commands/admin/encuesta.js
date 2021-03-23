const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "encuesta",
  aliases: ["poll"],
  description: "Realisa una encuesta de si o no",
  category: "admin",
  usage: "encuesta",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "ADD_REACTION"],
  userPermissions: ["MANAGE_GUILD"],
  cooldown: 10,
  run: async (client, msg, args) => {
    let pregunta = args.join(" ");

    if (!pregunta)
      return msg.channel.send(":x: | USO: **&encuesta [Pregunta]**");
    msg.delete();
    msg.channel
      .send({
        embed: {
          color: 0x0099ff,
          title: ":bar_chart: **" + pregunta + "**",
          fields: [
            { name: ":thumbsup: ", value: "Si", inline: true },
            { name: ":thumbsdown: ", value: "No", inline: true },
          ],
          timestamp: new Date(),
          footer: {
            text: `DePic | Moderacion`,
          },
        },
      })
      .then((sentEmbed) => {
        sentEmbed.react("👍");
        sentEmbed.react("👎");
      });
  },
};
