const Discord = require("discord.js");
const prefixSchema = require("../../database/models/setSugerencia_db");

module.exports = {
  name: "resetsugerencias",
  aliases: ["rsugerencias"],
  description: "Borra el canal de sugerencias",
  category: "config",
  usage: "rsugerencias",
  cooldown: 4,
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        "No tienes permisos para ejecutar este comando"
      );

    let a = await prefixSchema.findOneAndDelete({ guild: message.guild.id });
    if (!a)
      return message.channel.send("No hay canal de sugerencias en el server");
    const sugerenciaRemove = new Discord.MessageEmbed()
      .setDescription(
        `> Canal de sugerencias eliminidado
        > *Esto lo puedes cambiar cuando quieras*`
      )
      .setColor("#00FC2A")
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
    message.channel.send(sugerenciaRemove);
  },
};
