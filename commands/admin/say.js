const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "say",
  aliases: [],
  description: "Has que el bot diga algo",
  category: "admin",
  usage: "say",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: Number,
  run: async (client, msg, args) => {
    msg.channel.send(args.join(" "));
    msg.delete({ timeout: 0 });
  },
};
