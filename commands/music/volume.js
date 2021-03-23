const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "volumen",
  aliases: ["vol"],
  description: "Cambia el volumen de la cancion",
  category: "music",
  usage: "volumen <volumen>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 3,
  run: async (client, msg, args) => {
    const queue = client.queue;
    const serverQueue = queue.get(msg.guild.id);
    let volume = args[0];
    volume = Number(volume);

    if (!msg.member.voice.channel)
      return msg.channel.send("No estas conectando en un canal de voz.");
    if (!serverQueue)
      return msg.channel.send("No hay canciones reproduciendo.");

    if (!volume)
      return msg.channel.send("Debes agregar un valor para el volumen.");
    if (volume > 100)
      return msg.channel.send(
        "La cantidad para el valor del volumen debe ser menor a 100"
      );

    serverQueue.volume = volume;
    serverQueue.connection.dispatcher.setVolume(volume);

    return msg.channel.send(
      `Ahora el volumen para las canciones es de : **${volume}**`
    );
  },
};
