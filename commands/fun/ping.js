const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");

module.exports = {
  name: "ping",
  aliases: [],
  description: "Ve el ping del bot",
  category: "fun",
  usage: "ping",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 10,
  run: async (client, msg, args) => {
    let ping = Math.floor(msg.client.ping);
    msg.channel.send("Cargando...").then((m) => {
      m.edit({
        embed: {
          title: "Pong!:ping_pong: ",
          description: `Mensaje: **${Math.floor(
            m.createdTimestamp - Date.now()
          )}ms**, API: **Discord.js**`,
        },
      });
    });
  },
};
