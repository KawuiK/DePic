const Discord = require("discord.js");
const prefixSchema = require("../../database/models/setConfention_db");

module.exports = {
  name: "resetconfesiones",
  aliases: ["rconfesiones"],
  description: "Quita el canal de confesiones",
  category: "config",
  usage: "rconfesiones",
  cooldown: 4,
  run: async (client, msg, args) => {
    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.channel.send(
        "No tienes suficientes permisos para usar este comando"
      );

    let a = await prefixSchema.findOneAndDelete({ guild: msg.guild.id });
    if (!a) return msg.channel.send("No hay un canal de confesiones");
    msg.channel.send("El canal de confesiones se borro");
  },
};
