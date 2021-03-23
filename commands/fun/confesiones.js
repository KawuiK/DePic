const Discord = require("discord.js");
const Conf = require("../../database/models/setConfention_db");

module.exports = {
  name: "confesion",
  aliases: [],
  description: "Manda un texto anonimo",
  category: "Fun",
  usage: "confesion <confesion>",
  cooldown: 3,
  run: async (client, msg, args) => {
    let channelConf = await Conf.findOne({ guild: msg.guild.id });
    if (!channelConf)
      return msg.channel.send("No hay un canal establesido para eso :c");

    let text = args.join(" ");
    if (!text)
      return msg.channel
        .send("No escribistes el mensaje  ")
        .then((m) => m.delete({ timeout: 10000 }))
        .catch((err) =>
          msg.channel.send(`No tengo permisos para borrar mensajes`)
        )
        .then((x) => x.delete({ timeout: 5000 }));
    msg.delete();
    const embed = new Discord.MessageEmbed()
      .setTitle("**Nueva confesion**")
      .setDescription(text)
      .setColor("RANDOM")
      .setFooter("Author: Anonimo")
      .setThumbnail(msg.guild.iconURL({ dynamic: true }));
    msg.guild.channels.cache.get(channelConf.ChannelID).send(embed);
  },
};
