const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");

module.exports = {
  name: "invitar",
  aliases: ["inv"],
  description: "Invita al bot a tu servidor!",
  category: "basic",
  usage: "invitar",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 2,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setTitle("Invitar")
      .setDescription("Prefix basico del bot -> &")
      .setColor("GREEN")
      .addField("Iinvitar", "Para invitar pica le aqui abajo")
      .addField(
        "Picale",
        "[Invitar](https://discord.com/api/oauth2/authorize?client_id=763582048995639296&permissions=8&scope=bot)"
      )
      .setImage(
        "https://discord.com/assets/ee7c382d9257652a88c8f7b7f22a994d.png"
      )
      .setTimestamp();
    msg.channel.send(embed);
  },
};
