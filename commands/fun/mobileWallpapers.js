const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const akaneko = require("akaneko");
module.exports = {
  name: "mobilewallpapers",
  aliases: ["mwp"],
  description: "Quieres un wallpapers para ru celular",
  category: "general",
  usage: "mobilewallpapers",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 5,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setDescription("Aqio tienes a tu . . .")
      .setImage(await akaneko.mobileWallpapers());
    return msg.channel.send(embed);
  },
};
