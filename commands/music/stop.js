const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "stop",
  aliases: [],
  description: "Para las canciones",
  category: "music",
  usage: "stop",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 3,
  run: async (client, msg, args) => {
    const queue = client.queue;
    const serverQueue = queue.get(msg.guild.id);

    if (!msg.member.voice.channel)
      return msg.channel.send("No estas conectando en un canal de voz.");
    if (!serverQueue)
      return msg.channel.send("No hay canciones reproduciendo.");

    serverQueue.songs = [];
    await serverQueue.connection.dispatcher.end();
    return msg.channel.send("Canciones detenidas.");
  },
};
