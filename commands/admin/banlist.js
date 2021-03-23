const {
  Client,
  MessageEmbed,
  Presence,
  User,
  splitMessage,
} = require("discord.js");

module.exports = {
  name: "banlist",
  aliases: [],
  description: "Ver la lista de bans",
  category: "admin",
  usage: "banlist",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_MESSAGES"],
  userPermissions: ["MANAGE_MESSAGES"],
  cooldown: Number,
  run: async (client, msg, args) => {
    const noPermCLient = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Error!")
      .setColor("RED")
      .setDescription("No tengo permisos para ver los baneos")
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    const noPermUser = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Error!")
      .setColor("RED")
      .setDescription("No tengo permisos para ver los baneos")
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    let perms = msg.guild.me.hasPermission("BAN_MEMBERS");
    if (!perms) return message.channel.send(noPermCLient);
    if (!msg.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(noPermUser);
    var blist = await msg.guild.fetchBans();
    if (blist.size <= 0)
      return msg.channel.send("No hay baneos en el servidor.");
    var bansID = blist
      .map((b) => "**" + b.user.username + "**: " + b.user.id)
      .join("\n");
    const description = "**📌 Usuario y ID:** \n" + bansID;

    let embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setColor("RANDOM")
      .setTitle("Banlist de **" + msg.guild.name + "**")
      .setDescription(description)
      .setFooter(`DePic | Moderacion`)
      .setTimestamp()
      .setThumbnail(msg.guild.iconURL({ dynamic: true, size: 1024 }));

    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: "",
    });

    splitDescription.forEach(async (m) => {
      embed.setDescription(m);
      msg.channel.send(embed).then((m) => m.delete({ timeout: 200000 }));
    });
  },
};
