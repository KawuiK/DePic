const {
  Client,
  MessageEmbed,
  displayAvatarURL,
  Presence,
  User,
} = require("discord.js");
const math = require("math-expression-evaluator");
module.exports = {
  name: "matematicas",
  aliases: ["mat"],
  description: "No sabes matematicas esta es tu solucion",
  category: "fun",
  usage: "matematica <operacion>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: [],
  cooldown: 5,
  run: async (client, msg, args) => {
    const embed = new MessageEmbed();

    if (!args[0]) {
      embed.setFooter("Argumentos invalidos");
      return await msg.channel.send(embed);
    }

    let resultado;

    try {
      resultado = math.eval(args.join(""));
    } catch (e) {
      resultado = Operacion.invalida;
    }

    embed
      .setColor("RED")
      .setTitle("Calculadora")
      .addField("Operaciona", `\`\`\`\n${args.join("")} \`\`\``, false)
      .addField("=Resultado", `\`\`\`\n${resultado} \`\`\``, false)
      .setFooter("Por lo menos di de nada por hacerte la tarea");
    await msg.channel.send(embed);
  },
};
