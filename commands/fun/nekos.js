const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const akaneko = require("akaneko");
module.exports = {
  name: "nekos",
  aliases: [],
  description: "Unas nekos?",
  category: "fun",
  usage: "nekos",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setDescription("Aqui tienes a tu neko")
      .setImage(await akaneko.neko());
    return msg.channel.send(embed);
  },
};
