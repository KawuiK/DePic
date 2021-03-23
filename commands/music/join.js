const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "join",
  aliases: [],
  description: "Para que el bot se una al canal",
  category: "music",
  usage: "join",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 2,
  run: async (client, msg, args) => {
    const queue = client.queue;
    const serverQueue = queue.get(msg.guild.id);
    const voiceChannel = msg.member.voice.channel;

    if (!msg.member.voice.channel)
      return msg.channel.send("No estas conectando en un canal de voz.");
    const join = new MessageEmbed()
      .setColor("GREEN")
      .addField(
        "Conectado",
        `Conectado al canal que esta  el usuario ${msg.author.username}`
      );
    const noJoin = new MessageEmbed()
      .setColor("RED")
      .addField(
        "No pude conectarme",
        `No tengo permisos de conectarme a ese canal, ${msg.author.username}`
      );
    if (!voiceChannel.permissionsFor(client.user).has("VIEW_CHANNEL"))
      return msg.channel.send(noJoin);
    voiceChannel
      .join()
      .then((connection) => msg.channel.send(join))
      .catch();
  },
};
