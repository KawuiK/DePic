const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const akaneko = require("akaneko");
module.exports = {
  name: "wallpapers",
  aliases: [],
  description: "quieres un wallpapers?",
  category: "general",
  usage: "Wallpapers",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setDescription("Aqui tienes tu Wallpapers de anime!")
      .setImage(await akaneko.wallpapers());
    return msg.channel.send(embed);
  },
};
