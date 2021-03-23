const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "userinfo",
  aliases: ["us"],
  description: "Ve la informacion de un usuario",
  category: "basic",
  usage: "us <usuario",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    let usereres =
      msg.mentions.members.first() ||
      msg.guild.members.cache.get(args[0]) ||
      msg.member ||
      msg.author;
    let status;
    switch (usereres.presence.status) {
      case "online":
        status = "🟢 En linea";
        break;
      case "dnd":
        status = "⛔ No molestar";
        break;
      case "idle":
        status = "🌙 Ausente";
        break;
      case "offline":
        status = "⚪ Desconectado";
    }
    let badges1 = {
      EARLY_SUPPORTER: "<:nitroClasic:815258604810141765>",
      DISCORD_EMPLOYEE: "🔨",
      DISCORD_PARTNER: "<:partner:815258604700827688>",
      HYPESQUAD_EVENTS: "<:hypesquadGold:815258604810141735>",
      HOUSE_BRAVERY: "<:badges1:815207341200375868>",
      HOUSE_BRILLIANCE: "<:badges2:815207341225803787>",
      BUGHUNTER_LEVEL_1: "<:bugHunter:815264795653308446>",
      VERIFIED_DEVELOPER: "<:badges0:815207341204832287> ",
      HOUSE_BALANCE: "<:badges3:815207341313097738>",
    };
    let obj = {
      HOUSE_BRAVERY: "Bravery",
      VWERIFIED_DEVELOPER: "Desarrollador de bots verificado",
      HOUSE_BRILLIANCE: "Brilliance",
      DISCORD_PARTNER: "Socio de discord",
    };
    const UsersInfo = new MessageEmbed()
      .setTitle(`Informacion del usuario ${usereres.user.username}`)
      .setColor("NAVY")
      .setThumbnail(usereres.user.displayAvatarURL({ dynamic: true }))
      .addField(
        "Informacion del usuario",
        `> **->**User: ${usereres.user.tag}
         > **->**Badge: ${
           usereres.user.flags.toArray().length
             ? usereres.user.flags
                 .toArray()
                 .map((badge) => badges1[badge])
                 .join(" ")
             : "No tengo badges"
         }
         > **->**ID: ${usereres.user.id}
         > **->**Status: ${status}
         > **->**Estado: ${
           usereres.presence.activities[0]
             ? usereres.presence.activities[0].state
             : "Sin estado"
         }
         > **->**[Avatar Link](${usereres.user.displayAvatarURL()}) 
         > **->**Cuenta creada: ${usereres.user.createdAt.toLocaleDateString(
           "es-pe"
         )}`
      )
      .addField(
        "Informacion del miembro",
        `> **->**Apodo: ${
          usereres.nickname ? usereres.nickname : "No tiene apodo"
        }
         > **->** Roles: ${usereres.roles.cache
           .map((role) => role.toString())
           .join(" | ")}
         > **->**Se unio al server: ${usereres.guild.joinedAt.toLocaleDateString(
           "es-pe"
         )}`
      );
    msg.channel.send(UsersInfo);
  },
};
