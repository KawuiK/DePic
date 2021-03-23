const { Client, MessageEmbed, Presence, User } = require("discord.js");
const prefixSchema = require("../../database/models/prefix_db");

module.exports = {
  name: "setprefix",
  aliases: ["spe"],
  description: "Sete un nuevo prefix al bot",
  category: "config",
  usage: "setprefix <Prefix>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: ["ADMINISTRATOR"],
  cooldown: 30,
  run: async (client, msg, args) => {
    const res = await args.join(" ");

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.channel.send(
        "No tienes permisos necesarios para este comando"
      );

    if (!res) return msg.channel.send("Expesifica el prefix");
    if (res.length > 3)
      return msg.channel.send("El maximo de caracteres maximo es `3`");

    let a = await prefixSchema.findOne({ Guild: msg.guild.id });

    let sv = new prefixSchema({
      Guild: msg.guild.id,
      Prefix: res,
    });

    a
      ? await prefixSchema.updateOne({ Guild: msg.guild.id }, { Prefix: res })
      : await sv.save();

    msg.channel.send("Mi nuevo prefix es `" + res + "`");
  },
};
