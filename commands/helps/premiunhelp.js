const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "premiunhelp",
  aliases: ["prehelp"],
  description: "Ayuda para los usuarios premiun",
  category: "helps",
  usage: "premiunhelp",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 10,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setTitle("NsfwHelp")
      .setDescription("Aqui los comandos para los Vips de DePic Premiun")
      .addField(
        "Anime",
        "``Confused`` ``Cry`` ``Dance`` ``Feed`` ``Happy`` ``Hug`` ``Kill`` ``Pat`` ``Slap`` ``Sleep`` ``Suicide``"
      );
    msg.channel.send(embed);
  },
};
