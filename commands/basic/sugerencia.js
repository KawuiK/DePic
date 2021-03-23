const Discord = require("discord.js");
const sugg = require("../../database/models/setSugerencia_db");

module.exports = {
  name: "sugerencia",
  aliases: [],
  description: "Sugiere algo en el canal de sugerencia",
  category: "basic",
  usage: "sugerencia <sugerencia>",
  cooldown: 5,
  run: async (client, message, args) => {
    const suggestionQuery = args.join(" ");

    let channelSugg = await sugg.findOne({ guild: message.guild.id });
    if (!channelSugg)
      return message.channel.send("No hay canal de sugerencia en el servidor");

    if (!suggestionQuery)
      return message.channel.send(
        "Espefica la sugerencia!! `(Puedes meter una imagen)`"
      );
    if (suggestionQuery.length > 2000)
      return message.channel.send("Demaciados caracteres: **`2000`**!");

    let imageDelete = message.attachments.first()
      ? message.attachments.first().url
      : null;
    const embedSuggest = new Discord.MessageEmbed()
      .setTitle("__**Nueva sugerencia**__")
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Sugerencia:**\n${suggestionQuery}`)
      .setImage(imageDelete)
      .setColor("#FF8000");
    const noPermisionMANAGE_MESSAGES = new Discord.MessageEmbed()
      .setTitle("Error!")
      .setColor("#FF0000")
      .setDescription("Un error a ocurido!")
      .addField(
        "> Error por falta de permisos",
        "> Me falta los permisos de administrar mensages"
      )
      .setThumbnail("https://tenor.com/view/error-gif-5012696")
      .setFooter(
        "Para solucionalo poneme permisos para de `gestionar mensajes`"
      )
      .setTimestamp();

    message
      .delete()
      .catch((err) => message.channel.send(noPermisionMANAGE_MESSAGES))
      .then((msg) => msg.delete({ timeout: 4000 }));
    message.channel
      .send("Sugerencia enviada exitosamente")
      .then((x) => x.delete({ timeout: 20000 }));

    client.channels.cache.get(channelSugg.ChannelID).send(embedSuggest);
  },
};
