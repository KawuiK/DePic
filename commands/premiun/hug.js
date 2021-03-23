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
  name: "hug",
  aliases: [],
  description: "Dale un abrazo a alguien (Comando vip)",
  category: "premiun",
  usage: "hug <Usuario>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: Number,
  run: async (client, msg, args) => {
    let user = msg.author.id;
    if (config.vipsusers.id.includes(msg.author.id)) {
      let aA = msg.author;
      let aB = msg.mentions.users.first();
      if (!aB)
        return msg.channel.send("Menciona a 1 usuario para darle un beso.");
      const aC = new MessageEmbed()
        .setDescription(aA.tag + " de dio un abrazo a " + aB.tag)
        .setImage(star.hug())
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
