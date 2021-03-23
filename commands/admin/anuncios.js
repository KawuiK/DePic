const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "anuncio",
  aliases: [],
  description: "Crea un anuncio",
  category: "admin",
  usage: "anuncio <anuncio>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 5,
  run: async (client, msg, args) => {
    const noPerm = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Error!")
      .setColor("RED")
      .setDescription("No tienes permisos para hacer eso, Permisos faltantes")
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    const noAnun = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Error!")
      .setColor("RED")
      .setDescription("Falta anuncio escribelo!")
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    let anuncio = args.slice(0).join(" ");
    var perms = msg.member.hasPermission("MANAGE_GUILD");
    let autor = `${msg.author}`;
    if (!perms) return msg.channel.send(noPerm);
    if (!anuncio) return msg.channel.send(noAnun);
    const embed = new MessageEmbed()
      .setTitle("Anuncios")
      .setDescription(anuncio)
      .addField("Anuncio por:", `${msg.author}`)
      .setColor("#00ff11");
    msg.channel.send(embed);
    msg.channel
      .send(`${msg.author}` + " **listo, ya di el anuncio!**")
      .then(async (msg) => {
        setTimeout(() => {
          msg.delete();
        }, 1000);
      });
  },
};
