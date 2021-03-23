const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "kick",
  aliases: [],
  description: "Comando para kickear a alguien",
  category: "admin",
  usage: "kick",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL", "KICK_MEMBERS"],
  userPermissions: ["KICK_MEMBERS"],
  cooldown: 6,
  run: async (client, msg, args) => {
    const user = msg.mentions.users.first();
    const kickTrue = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setTitle("Correcto!")
      .setColor("GREEN")
      .setDescription(`Se a kickeado a **${user.tag}`)
      .setFooter(`DePic | Moderacion`);
    if (user) {
      const member = msg.guild.member(user);
      if (member) {
        member
          .kick("Kick bot")
          .then(() => {
            msg.channel.send(kickTrue);
          })
          .catch((err) => {
            msg.channel.send("No puedes hacer kick a ese usuario");
          });
      } else {
        msg.channel.send(
          "El usuario que quieres hacer kick no esta en el server"
        );
      }
    } else {
      msg.channel.send(
        "Necesito que menciones al usuario que quieres hacer kick"
      );
    }
  },
};
