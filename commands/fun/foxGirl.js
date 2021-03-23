const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const akaneko = require("akaneko");
module.exports = {
  name: "foxgirl",
  aliases: [],
  description: "Quires una foto de foxgirl",
  category: "fun",
  usage: "foxgirl",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 4,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setDescription("Aqui tienes a tu . . .")
      .setImage(await akaneko.foxgirl());
    return msg.channel.send(embed);
  },
};
