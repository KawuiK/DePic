const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "delrol",
  aliases: ["dr"],
  description: "Quita un rol a un usuario",
  category: "admin",
  usage: "delrol",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "MANAGE_ROLES"],
  userPermissions: ["MANAGE_ROLES"],
  cooldown: 4,
  run: async (client, msg, args) => {
    const noRol = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Error!")
      .setColor("RED")
      .setDescription("Rol no encontrado en el servidor")
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    const noRolJeraquia = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Error!")
      .setColor("RED")
      .setDescription("No puedo quitar ese rol ya que esta mas alto que el mio")
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    const noRolJeraquiaUser = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Error!")
      .setColor("RED")
      .setDescription(
        "No puedes quitar ese rol porque esta mas alto que el tu yo"
      )
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    let persona =
      msg.mentions.members.first() || msg.guild.members.resolve(args[0]);
    let rol =
      msg.mentions.roles.first() || //por mencion
      msg.guild.roles.resolve(args[1]) || //por id
      msg.guild.roles.cache.find((r) => r.name == args.slice(1).join(" ")); //por nombre
    if (!rol) {
      return msg.channel.send(noRol);
    } else if (!rol.editable) {
      return msg.channel.send(noRolJeraquia);
    } else if (rol.comparePositionTo(msg.member.roles.highest) > 0) {
      return msg.channel.send(noRolJeraquiaUser);
    }
    const rolTrue = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Correcto!")
      .setColor("GREEN")
      .setDescription(
        `Listo, le quite el rol **${rol.name}** a **${persona.user.username}**`
      )
      .setFooter(`DePic | Moderacion`)
      .setTimestamp();
    persona.roles
      .remove(rol)
      .catch((e) => msg.reply("Ocurrio un **error**"))
      .then(() => {
        msg.channel.send(rolTrue);
      });
  },
};
