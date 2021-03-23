const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "botservers",
  aliases: ["bs"],
  description: "Para ver en cuantos servers esta el bot",
  category: "admin",
  usage: "botservers",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 10,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setTitle("Servers")
      .setDescription("Estos son el total del los servers que esta el bot")
      .addField("Servers", `${client.guilds.cache.size}`)
      .setColor("GREEN");
    msg.channel.send(embed);
  },
};
