const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const akaneko = require("akaneko");
module.exports = {
  name: "nneko",
  aliases: [],
  description: "Este comando es NSFW",
  category: "NSFW",
  usage: "nneko",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: Number,
  run: async (client, msg, args) => {
    let nswf = msg.channel.nsfw;
    if (!nswf)
      return msg.channel.send(
        "No es un canal NSFW, NO es valido el comando aqui"
      );

    const embed = new MessageEmbed()
      .setDescription("Aqui tienes a tu . . .")
      .setImage(await akaneko.lewdNeko());
    return msg.channel.send(embed);
  },
};
