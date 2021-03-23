const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const db = require("../../database/database.js");
module.exports = {
  name: "comandosusados",
  aliases: ["cu"],
  description: "Ve cuantos comandos usasdos has hecho al bot",
  category: "secret",
  usage: "comandosusados",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 10,
  run: async (client, msg, args) => {
    let data = await db.coins.viewMember(msg.author.id);

    if (data) {
      msg.channel.send(
        `Estas son las veces que has usado un comando mi => **${data.coins} **`
      );
    } else {
      await db.coins.addMember(msg.author.id, 0, 0);
      let data = await db.coins.viewMember(msg.author.id);
      msg.channel.send(
        `Estas son las veces que has usado un comando mi => **${data.coins}**`
      );
    }
  },
};
