const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");

module.exports = {
  name: "love",
  aliases: ["lv"],
  description: "Quieres saber cuanto amor tienen ",
  category: "fun",
  usage: "love <Usuario>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 4,
  run: async (client, msg, args) => {
    let users = msg.mentions.users.map((m) => m.username).join(" y ");
    if (!users)
      return msg.channel.send("Mencione a dos usuarios para calcular");

    const random = Math.floor(Math.random() * 100);
    let heard = "";

    if (random < 50) {
      heard = ":broken_heart:";
    } else if (random < 80) {
      heard = ":sparkling_heart: ";
    } else if (random < 101) {
      heard = ":heart:";
    }

    const embed = new MessageEmbed()
      .setAuthor("El porcentaje de amor de " + users + " es:")
      .setDescription(heard + " **" + random + " %**" + " " + heard)
      .setColor(0xff4d4d);

    msg.channel.send(embed);
  },
};
