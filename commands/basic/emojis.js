const Discord = require("discord.js");

module.exports = {
  name: "emojilist",
  aliases: ["el"],
  description: "Ve la lista de emojis",
  category: "basic",
  usage: "emojilist",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 6,
  run: async (client, msg, args) => {
    if (msg.guild.emojis.cache.size < 1)
      return msg.channel.send("¡Este servidor no tiene emojis!");
    let emojis = [];
    let emojis_a = [];
    msg.guild.emojis.cache
      .filter((x) => !x.animated)
      .map((x) => emojis.push(`<:${x.name}:${x.id}>`));
    msg.guild.emojis.cache
      .filter((x) => x.animated)
      .map((x) => emojis_a.push(`<a:${x.name}:${x.id}>`));

    let m = await msg.channel.send({
      embed: {
        title: `Emojis de ${msg.guild.name}`,
        color: "RANDOM",
        fields: [
          {
            name: "Emojis estaticos:",
            value: emojis[0]
              ? emojis.slice(0, 10).join(" ")
              : "Este servidor no tiene emojis estaticos",
          },
          {
            name: "Emojis animados:",
            value: emojis_a[0]
              ? emojis_a.slice(0, 10).join(" ")
              : "Este servidor no tiene emojis animados",
          },
        ],
        author: {
          name: `Pedido por: ${msg.author.tag}`,
          icon_url: msg.author.displayAvatarURL(),
        },
      },
    });

    await m.react("◀️");
    await m.react("⏹️");
    await m.react("▶️");
    let i = 0;
    let i2 = 10;
    let filtro = (reaction, user) =>
      ["◀️", "⏹️", "▶️"].includes(reaction.emoji.name) &&
      user.id === msg.author.id;
    let colector = m.createReactionCollector(filtro, { time: 60000, max: 10 });
    colector.on("collect", (reaction) => {
      switch (reaction.emoji.name) {
        case "◀️":
          if (i > 1) {
            i -= 10;
            i2 -= 10;
            m.edit({
              embed: {
                title: `Emojis de ${msg.guild.name}`,
                color: "RANDOM",
                fields: [
                  {
                    name: "Emojis estaticos:",
                    value: emojis[0]
                      ? emojis.slice(i, i2).join(" ")
                      : "Este servidor no tiene emojis estaticos",
                  },
                  {
                    name: "Emojis animados:",
                    value: emojis_a[0]
                      ? emojis_a.slice(i, i2).join(" ")
                      : "Este servidor no tiene emojis animados",
                  },
                ],
                author: {
                  name: `Pedido por: ${msg.author.tag}`,
                  icon_url: msg.author.displayAvatarURL(),
                },
              },
            });
          }

          break;
        case "⏹️":
          colector.stop();
          break;
        case "▶️":
          if (
            emojis.slice(i, i2 + 1)[emojis.slice(i, i2 + 1).length - 1] !==
            emojis[emojis.length - 1]
          ) {
            i += 10;
            i2 += 10;
            m.edit({
              embed: {
                title: `Emojis de ${msg.guild.name}`,
                color: "RANDOM",
                fields: [
                  {
                    name: "Emojis estaticos:",
                    value: emojis[0]
                      ? emojis.slice(i, i2).join(" ")
                      : "Este servidor no tiene emojis estaticos",
                  },
                  {
                    name: "Emojis animados:",
                    value: emojis_a[0]
                      ? emojis_a.slice(i, i2).join(" ")
                      : "Este servidor no tiene emojis animados",
                  },
                ],
                author: {
                  name: `Pedido por: ${msg.author.tag}`,
                  icon_url: msg.author.displayAvatarURL(),
                },
              },
            });
          }
          break;
      }
    });
  },
};
