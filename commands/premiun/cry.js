const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const star = require("star-labs");
const config = require("../../config");
module.exports = {
  name: "cry",
  aliases: [],
  description: "Llora pero pq? (Comando vip)",
  category: "premiun",
  usage: "cry",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: Number,
  run: async (client, msg, args) => {
    let user = msg.author.id;
    if (config.vipsusers.id.includes(msg.author.id)) {
      let aA = msg.author;
      const aC = new MessageEmbed()
        .setDescription(aA.tag + " Esta llorando :,c ")
        .setImage(star.cry())
        .setFooter(`Comando solicitado por ${msg.member.displayName}`)
        .setTimestamp();
      msg.channel.send(aC);
      console.log(`Comando premiun realizado por ${user}`);
    } else {
      msg.channel.send("No tienes vip de DePic");
      console.log(`Comando premiun intentado usar de ${user}`);
    }
  },
};
