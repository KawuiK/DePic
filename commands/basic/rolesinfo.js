const { Client, MessageEmbed, Presence, User } = require("discord.js");
module.exports = {
  name: "roleslist",
  aliases: [],
  description: "Ve la lista de roles en el server",
  category: "basic",
  usage: "roleslist",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    const guild = msg.guild;
    const roles = guild.roles.cache;

    const embed = new MessageEmbed()
      .setColor(0x00ae86)
      .setDescription(roles.map((role) => `<@&${role.id}>`).join("\n"))
      .setFooter(`Lista de roles de: ${guild.name}`, guild.iconURL());

    msg.channel.send(embed);
  },
};
