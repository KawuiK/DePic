const Discord = require("discord.js");
const sugg = require("../../database/models/setSugerencia_db");

module.exports = {
  name: "denegar-sugerencia",
  aliases: ["denegar"],
  description: "Denega una sugerencia del server",
  category: "admin",
  usage: "denegar-sugerencia <Id del mensaje> <razon>",
  cooldown: 2,
  run: async (client, message, args, p) => {
    const messageID = args[0];
    const acceptSuggestionQuery = args.slice(1).join(" ");

    let channelSugg = await sugg.findOne({ guild: message.guild.id });
    if (!channelSugg)
      return message.channel.send("No hay canal de sugerencia establesido");

    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        "No tienes los permisos necesarios para usar este comando"
      );
    if (!messageID)
      return message.channel.send(
        "Mete la id de la sugerencia. **`(Pudes usar " + p + "help denegar)`**"
      );

    try {
      const suggestionChannel = message.guild.channels.cache.get(
        channelSugg.ChannelID
      );
      const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
      if (!suggestedEmbed) return message.channel.send("Mete una ID valida");

      const data = suggestedEmbed.embeds[0];

      let images = data.image ? data.image.proxyURL : null;
      const acceptEmbed = new Discord.MessageEmbed()
        .setAuthor(data.author.name, data.author.iconURL)
        .setTitle("__**Suggestion Denegada**__")
        .setThumbnail(data.thumbnail.url)
        .setDescription(data.description)
        .setImage(images)
        .setColor("#FF0000")
        .addField(
          "> Estado (Denegada)",
          acceptSuggestionQuery || "No hay razon"
        )
        .addField("> Denegada por: ", message.author)
        .setFooter(`DePic | Moderacion`);

      message.channel
        .send("La sugerencia fue Denegada")
        .then((x) => x.delete({ timeout: 7000 }));
      suggestedEmbed
        .edit(acceptEmbed)
        .catch((err) =>
          message.channel.send("Ese mensaje no es una sugerencia `1`")
        );
      const user = client.users.cache.find((u) => u.tag === data.author.name);
      user
        .send(`Tu sugerencia fue denegada por: **\`${message.author.tag}\`**!`)
        .catch((error) =>
          message.channel.send(
            "El author de la sugerencia no tiene los DMs abiertos no de puedo mandar mensaje!"
          )
        );
    } catch (err) {
      message.channel.send("Ese mensaje no es una sugerencia `2`");
    }
  },
};
