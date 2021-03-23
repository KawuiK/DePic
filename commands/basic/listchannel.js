const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: " ",
  aliases: ["lc"],
  description: "lista de canales y categoria",
  category: "basic",
  usage: "listchannel",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: Number,
  run: async (client, msg, args) => {
    const lepush = (q, c) => {
      if (c.type == "text") q.push(`  ✉️ ${c.name}`);
      else if (c.type == "voice") q.push(`  🔊 ${c.name}`);
      else if (c.type == "news") q.push(`  📢 ${c.name}`);
      else if (c.type == "store") q.push(`  🛒 ${c.name}`);
      else if (c.type == "category") q.push(`📁 ${c.name}`);
      else q.push(`#?? ${c.name}`);
    };

    let categorias = msg.guild.channels.cache
      .filter((q) => q.type == "category")
      .sort((p, c) => p.position - c.position);
    let canales = [];
    msg.guild.channels.cache
      .filter((q) => q.type != "category")
      .filter((q) => !q.parentID)
      .sort((p, c) => p.position - c.position)
      .forEach((c) => lepush(canales, c));
    categorias.forEach((c) => {
      lepush(canales, c);
      msg.guild.channels.cache
        .filter((q) => q.parentID == c.id)
        .sort((p, c) => p.position - c.position)
        .forEach((c) => lepush(canales, c));
    });
    msg.channel.send(canales.join("\n"), {
      code: "ini",
      split: { char: "", maxLength: 1900 },
    });
  },
};
