const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["avar"],
  description: "Para ver el avatar de alguien",
  category: "fun",
  usage: "avatar <usuario>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 3,
  run: async (client, msg, args) => {
    let mentions =
      msg.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      msg.author;

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`Avatar del usuario **${mentions.tag}**`)
      .setImage(mentions.displayAvatarURL({ dynamic: true, size: 4096 }));
    msg.channel.send(embed);
  },
};
