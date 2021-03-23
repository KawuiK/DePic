const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "pause",
  aliases: [],
  description: "para pausar la cancion",
  category: "music",
  usage: "pause",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 2,
  run: async (client, msg, args, discord) => {
    const queue = client.queue;
    const serverQueue = queue.get(msg.guild.id);

    if (!msg.member.voice.channel)
      return msg.channel.send("No estas conectando en un canal de voz.");
    if (!serverQueue)
      return msg.channel.send("No hay canciones reproduciendo.");

    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      console.log("En pausa");
      serverQueue.connection.dispatcher.pause(true);

      return msg.channel.send("Canción pausada");
    }
  },
};
