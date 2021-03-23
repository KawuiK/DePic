const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "queue",
  aliases: ["list"],
  description: "Para ver las canciones",
  category: "music",
  usage: "queue",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 3,
  run: async (client, msg, args) => {
    const queue = client.queue;
    const serverQueue = queue.get(msg.guild.id);

    if (!serverQueue)
      return msg.channel.send("No hay canciones reproduciendo.");
    if (serverQueue.songs.length === 0)
      return msg.channel.send("No hay canciones en lista de espera.");

    const queueSongs = serverQueue.songs;

    let listSongs = queueSongs.slice(1, 10).map((song) => {
      let durationSeconds =
        song.duration.seconds < 9
          ? "0" + song.duration.seconds
          : song.duration.seconds;
      let durationMinutes =
        song.duration.minutes < 9
          ? "0" + song.duration.minutes
          : song.duration.minutes;
      let durationHours =
        song.duration.hours < 9
          ? "0" + song.duration.hours
          : song.duration.hours;

      return `**=>** ${song.title} - **__${durationHours}:${durationMinutes}:${durationSeconds}__**`;
    });

    const queueEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(queueSongs[0].thumbnail)
      .setDescription(
        `Reproduciendo ahora:\n**${
          queueSongs[0].title
        }**\n\n========================\n${listSongs.join("\n")}`
      );

    return msg.channel.send(
      "Lista de canciones del servidor **__" + msg.guild.name + "__**",
      { embed: queueEmbed }
    );
  },
};
