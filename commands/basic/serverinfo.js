const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "serverinfo",
  aliases: [],
  description: "Ve la informacion del server",
  category: "basic",
  usage: "serverinfo",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    var server = msg.guild;

    const embed = new MessageEmbed()
      .setTitle("**SERVERINFO**")
      .setDescription("**Inforamcion actual del server**")
      .setThumbnail(server.iconURL())
      .setAuthor(server.name, server.iconURL())
      .addField(
        "**Informacion del server**",
        `> **->**ID: ${server.id}
      > **->**Fecha de creacion: ${server.joinedAt.toLocaleDateString("es-pe")}
      > **->**Region: ${msg.guild.region}
      > **->**Canales: ${server.channels.cache.size}
      > **->**Categoria:${
        server.channels.cache.filter((x) => x.type === "category").size
      } texto: ${
          server.channels.cache.filter((x) => x.type === "text").size
        } voz: ${server.channels.cache.filter((x) => x.type === "voice").size}
      > **->**Roles: ${server.roles.cache.size}
      > **->**Miembros: ${server.memberCount}
      > **->**Bots: ${msg.guild.members.cache.filter((m) => m.user.bot).size}
      > **->**Emojis: ${msg.guild.emojis.cache.size} 
      > **->**Booster: ${msg.guild.premiumSubscriptionCount.toString()}
      > **->**Nivel de verificacion: ${server.verificationLevel}`
      )
      .addField(
        "Server Owner",
        `> **->**Owner: ${server.owner.user}
      > **->**ID: ${server.ownerID}`
      )
      .setColor("YELLOW");
    msg.channel.send(embed);
  },
};
