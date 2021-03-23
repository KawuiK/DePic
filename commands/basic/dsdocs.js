const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "djs",
  aliases: ["discord"],
  description: "Busca algo de la libreria de discord.js",
  category: "basic",
  usage: "djs <serach>",
  cooldown: 3,
  run: async (client, message, args) => {
    if (!args[0]) return message.channel.send("Añale algo para buscar");
    fetch(
      `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
        args.join(" ")
      )}`
    )
      .then((e) => e.json())
      .then((data) => {
        message.channel.send(new Discord.MessageEmbed(data));
      })
      .catch((e) => {
        const embed = new Discord.MessageEmbed()
          .setColor("#FF0000")
          .addField(`**Error**`, `\`\`\`js\n${e}\`\`\``)
          .setFooter(
            "Pedido por: " + message.author.tag + "",
            message.author.displayAvatarURL({ dynamic: true })
          );
        message.channel.send(embed);
      });
  },
};
