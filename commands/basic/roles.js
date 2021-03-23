const { Client, MessageEmbed, Presence, User } = require("discord.js");
module.exports = {
  name: "rolesuser",
  aliases: [],
  description: "ve quien esta en un rol",
  category: "basic",
  usage: "rolesuser <id/mencion>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    let rol = msg.guild.roles.cache.get(args[0]) || msg.mentions.roles.first();

    if (!rol) return msg.channel.send("Menciona o pon la id de un rol");

    let role = msg.guild.roles
      .resolve(rol)
      .members.map((m) => m.user.tag)
      .join("\n");
    if (role.length === 0) {
      return msg.channel.send(`No se encontraron resultados.`);
    }

    const embed = new MessageEmbed()
      .setTitle(`Se han encontrado ${rol.members.size} usuario(s) con ese rol`)
      .setDescription("```js\n" + role + "```")
      .setColor("RANDOM");
    msg.channel.send(embed);
  },
};
