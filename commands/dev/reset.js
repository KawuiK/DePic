const Discord = require("discord.js");
const { Client, MessageEmbed, Presence, User } = require("discord.js");

module.exports = {
  name: "reload",
  aliases: ["creload"],
  description: "Comando para recargar un comando",
  category: "dev",
  usage: "reload <carpeta> <cmd>",
  cooldown: 2,
  run: async (client, message, args) => {
    const noDev = new MessageEmbed()
      .setTitle("Comando de ReLoad")
      .setColor("RED")
      .addField("Error!", "No eres un **Dev** de DePic Bot")
      .setFooter("DePic | Dev")
      .setTimestamp();
    if (!["332223388833677322"].includes(message.author.id))
      return message.channel.send(noDev);

    const folderName = args[0];
    if (!folderName) return message.channel.send("Pon una carpeta!");

    const commandName = args.slice(1).join(" ");
    if (!commandName)
      return message.channel.send("Coloca el nombre del comando!");

    try {
      delete require.cache[
        require.resolve(`../../commands/${folderName}/${commandName}.js`)
      ];
      client.commands.delete(commandName);
      const pull = require(`../../commands/${folderName}/${commandName}.js`);
      client.commands.set(commandName, pull);
    } catch (e) {
      console.log(e.message);
      const errorNoReload = new MessageEmbed()
        .setTitle("Comando reload")
        .setColor("RED")
        .addField(`\`\`\`No se puede recargar el comando ${commandName}\`\`\``)
        .setFooter("DePic | Dev")
        .setTimestamp();
      return message.channel.send(errorNoReload);
    }
    const reloadYes = new MessageEmbed()
      .setTitle("Comando recargado!")
      .setColor("GREEN")
      .addField(
        "Comando exitosamente recargado!",
        `\`\`\`El comando ${commandName} se a recargado \`\`\``
      )
      .setFooter(`DePic | Dev: ${message.author.username}`)
      .setTimestamp();
    message.channel.send(reloadYes);
  },
};
