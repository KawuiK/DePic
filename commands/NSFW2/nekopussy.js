const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const NSFW = require("discord-nsfw");

module.exports = {
  name: "apussy",
  aliases: [],
  description: "Este comando es NSFW",
  category: "NSFW2",
  usage: "apussy",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: Number,
  run: async (client, msg, args) => {
    let nswf = msg.channel.nsfw;
    if (!nswf)
      return msg.channel.send(
        "No es un canal NSFW, NO es valido el comando aqui"
      );

    const nsfw = new NSFW();
    const image = await nsfw.nekopussy();

    const embed = new MessageEmbed()
      .setDescription("Aqui tienes a tu . . .")
      .setColor("PURPLE")
      .setImage(image);
    msg.channel.send(embed);
  },
};
