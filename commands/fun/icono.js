const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");

module.exports = {
  name: "icono",
  aliases: ["icon"],
  description: "Ve el icono del server",
  category: "fun",
  usage: "icon",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 4,
  run: async (client, msg, args) => {
    let iconURL = msg.guild.iconURL({
      format: "png",
      dynamic: true,
      size: 4096,
    });
    const embed = new MessageEmbed().setImage(iconURL).setColor("RANDOM");
    msg.channel.send(embed);
  },
};
