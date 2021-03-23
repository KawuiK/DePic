const {
  Client,
  MessageEmbed,
  Presence,
  User,
  MessageAttachment,
} = require("discord.js");

module.exports = {
  name: "nuke",
  aliases: [],
  description: "Borra completamente el canal y crea otro",
  category: "admin",
  usage: "nuke",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_CHANNELS"],
  userPermissions: ["ADMINISTRATOR"],
  cooldown: 20,
  run: async (client, msg, args) => {
    const noPermisionAdministrator = new MessageEmbed()
      .setTitle("Error!")
      .setColor("RED")
      .setThumbnail(msg.guild.iconURL({ dynamic: true }))
      .addField(
        "No tienes permisos para este comando",
        "Este comando solo puede usarse los administradores del servidor"
      )
      .setTimestamp();
    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.channel.send(noPermisionAdministrator);
    let link =
      "https://cdn.discordapp.com/attachments/786627691267751976/787745289523691541/6c485efad8b910e5289fc7968ea1d22f.gif";
    const nuke = new MessageAttachment(link, "nuke.gif");
    var posicion = msg.channel.position;
    msg.channel.clone().then((canal) => {
      msg.channel.delete();
      canal.setPosition(posicion);
      canal.send("***El canal le callo una nuke??***", nuke);
    });
  },
};
