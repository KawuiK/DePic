const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "clear",
  aliases: [],
  description: "Borra los mensajes de un canal",
  category: "admin",
  usage: "clear",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
  userPermissions: ["MANAGE_MESSAGES"],
  cooldown: 8,
  run: async (client, msg, args) => {
    let member;

    if (args[0])
      member =
        msg.mentions.members.first() ||
        msg.guild.members.resolve(args[0]) ||
        msg.guild.members.cache.find((p) =>
          p.user.username.startsWith(args[0])
        );
    let cantidad =
      member && !isNaN(args[1]) ? args[1] : !isNaN(args[0]) ? args[0] : 50;
    const messages = await msg.channel.messages.fetch({ limit: 100 });
    let filtro = member
      ? (m) => m.author.id == member.id && !m.pinned && !m.system
      : (m) => !m.pinned && !m.system;
    let msgs = messages.filter(filtro);
    if (msgs.array().length < 1)
      return msg.channel.send("No hay mensajes para eliminar");
    msg.channel.bulkDelete(msgs.array().slice(0, cantidad), true).then((m) => {
      msg.channel.send(
        `se han eliminado ${msgs.array().slice(0, cantidad).length}`
      );
    });
  },
};
