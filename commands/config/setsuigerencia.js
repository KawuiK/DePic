const Discord = require("discord.js");
const Conf = require("../../database/models/setSugerencia_db");
const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
module.exports = {
  name: "setsugerencias",
  aliases: [],
  description: "establese canal de sugerencia en el servidor",
  category: "config",
  usage: "setsugerencia <Canal>",
  cooldown: 4,
  run: async (client, message, args) => {
    const channelNo = message.mentions.channels.first();
    const noPermisionMESSAGE_SEND = new MessageEmbed()
      .setTitle("Error!")
      .setColor("#FF0000")
      .setDescription("Un error a ocurido!")
      .addField(
        "Error por falta de permisos",
        "Me falta los permisos de mandar mensajes (En canal mensionado)"
      )
      .setThumbnail("https://tenor.com/view/error-gif-5012696")
      .setFooter("Para solucionalo poneme permisos para `enviar mensajes`")
      .setTimestamp();
    const noPermisionVIEW_CHANNEL = new MessageEmbed()
      .setTitle("Error!")
      .setColor("#FF0000")
      .setDescription("Un error a ocurido!")
      .addField(
        "Error por falta de permisos",
        "Me falta los permisos de ver el canal (En canal mensionado)"
      )
      .setThumbnail("https://tenor.com/view/error-gif-5012696")
      .setFooter("Para solucionalo poneme permisos para `ver ese canal`")
      .setTimestamp();

    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        "No tienes permisos para ejecutar este comando"
      );

    if (!channelNo)
      return message.channel.send("Necesesitas mencionar el canal");

    if (!message.guild.channels.cache.get(channelNo.id))
      return message.channel.send("Este canal no esta en el server");

    if (!channelNo.permissionsFor(client.user).has("VIEW_CHANNEL"))
      return message.channel.send(noPermisionVIEW_CHANNEL);

    if (!channelNo.permissionsFor(client.user).has("SEND_MESSAGES"))
      return message.channel.send(noPermisionMESSAGE_SEND);

    let a = await Conf.findOne({ guild: message.guild.id });

    let sv = new Conf({
      guild: message.guild.id,
      ChannelID: message.mentions.channels.first().id,
    });

    a
      ? await Conf.updateOne(
          { guild: message.guild.id },
          { ChannelID: message.mentions.channels.first().id }
        )
      : await sv.save();

    const EmbedConfChannel = new Discord.MessageEmbed()
      .setDescription(
        "> Nuevo canal  de sugerencias esta en <#" +
          message.mentions.channels.first() +
          "> \n> *Esto lo puedes cambiar cuando quieras*"
      )
      .setColor("#00FC2A")
      .setThumbnail(message.guild.iconURL({ dynamic: true }));

    message.channel.send(EmbedConfChannel);
  },
};
