const Discord = require("discord.js");
const Conf = require("../../database/models/setConfention_db");
const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "setconfesiones",
  aliases: [],
  description: "Establese un canal para confesiones",
  category: "config",
  usage: "setconfesiones <canal>",
  cooldown: 4,
  run: async (client, msg, args) => {
    const channelNo = msg.mentions.channels.first();

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.channel.send(
        "No tienes suficientes permisos para usar este comando"
      );

    if (!channelNo) return msg.channel.send("Necesitas mensionar el canal");

    if (!msg.guild.channels.cache.get(channelNo.id))
      return msg.channel.send("Ese canal no esta en el server");

    if (!channelNo.permissionsFor(client.user).has("VIEW_CHANNEL"))
      return msg.channel.send("No tengo permisos para ver ese canal");

    if (!channelNo.permissionsFor(client.user).has("SEND_MESSAGES"))
      return msg.channel.send("No tengo permisos para escribir en ese canal");

    let a = await Conf.findOne({ guild: msg.guild.id });

    let sv = new Conf({
      guild: msg.guild.id,
      ChannelID: msg.mentions.channels.first().id,
    });

    a
      ? await Conf.updateOne(
          { guild: msg.guild.id },
          { ChannelID: msg.mentions.channels.first().id }
        )
      : await sv.save();

    const EmbedConfChannel = new MessageEmbed()
      .setDescription(
        "En nuevo canal de confesiones es: <#" +
          msg.mentions.channels.first() +
          ">\n\n*Y puedes cambiarlo cuando quieras*"
      )
      .setFooter("confesiones | DePic")
      .setColor("GREEN")
      .setThumbnail(msg.guild.iconURL({ dynamic: true }));

    msg.channel.send(EmbedConfChannel);
  },
};
