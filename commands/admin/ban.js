const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "ban",
  aliases: [],
  description: "Banea a un usuario",
  category: "admin",
  usage: "ban",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "BAN_MEMBERS"],
  userPermissions: ["BAN_MEMBERS"],
  cooldown: 5,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setThumbnail(msg.guild.iconURL())
      .setFooter(`DePic | Moderacion`);

    if (!args[0]) {
      embed.setDescription("Debes que mencionar a un usuario.");
      embed.setColor("RED");
      return msg.channel.send(embed);
    }

    let member =
      msg.mentions.members.first() ||
      msg.guild.members.resolve(args[0]) ||
      msg.guild.members.cache.find(
        (m) => m.user.username.toLowerCase() == args[0]
      ) ||
      (await client.users.fetch(args[0]));
    if (!member || member.id == msg.author.id) {
      embed.setDescription("Debes que mencionar a un usuario.");
      embed.setColor("RED");
      return msg.channel.send(embed);
    }

    if (!msg.member.permissions.has("BAN_MEMBERS")) {
      embed.setDescription("No puedes usar este comando.");
      embed.setColor("RED");
      return msg.channel.send(embed);
    }

    if (msg.guild.members.resolve(member.id)) {
      if (
        msg.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
      ) {
        embed.setDescription(
          "No puedes banear a un usuario con mayor o igual nivel jeraquira mas alta."
        );
        embed.setColor("RED");
        return msg.channel.send(embed);
      }
      if (!member.bannable) {
        embed.setDescription("No puedo banear a este usuario");
        embed.setColor("RED");
        return msg.channel.send(embed);
      }
    }

    let razon = args.slice(1).join(" ")
      ? args.slice(1).join(" ")
      : "Razon sin especificar";
    msg.guild.members.ban(member.id, { reason: razon });
    embed
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setThumbnail(
        !!member.user
          ? member.user.displayAvatarURL()
          : member.displayAvatarURL()
      )
      .setTitle("Baneo exitoso!")
      .addField(
        `> Usuario Baneado`,
        !!member.user ? member.user.tag : member.tag
      )
      .addField("> Razon", razon)
      .setColor("AQUA")
      .setTimestamp();

    if (!!member.user) member.user.send(embed).catch((e) => e);
    msg.channel.send(embed).then((m) => m.delete({ timeout: 30000 }));
  },
};
