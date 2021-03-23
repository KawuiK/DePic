const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "serverinvit",
  aliases: ["srin"],
  description: "Manda la invitacion del servidor",
  category: "admin",
  usage: "serverinvit",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 3,
  run: async (client, msg, args) => {
    msg.channel.send("**Aqui la invitación del servidor**");
    msg.channel
      .createInvite({
        maxAge: 0,
      })
      .then((invite) => {
        msg.channel.send(invite.url);
      });
  },
};
