const {
  Client,
  MessageEmbed,
  Presence,
  User,
  Collection,
} = require("discord.js");
const MessageModel = require("../../database/models/warn_db");
const MessageModel2 = require("../../database/models/warn1_db");

const UnWarnSet = new MessageEmbed()
  .setTitle("UnWarn DePic")
  .setColor("ORANGE")
  .addField("UnWarn", "Para quitar un warn es => UnWarn <Mencion> Razon")
  .setTimestamp();

const dbBug = new MessageEmbed()
  .setTitle("UnWarn DePic")
  .setColor("RED")
  .addField("Data Base Error", "En mi base de datos se genero un error")
  .setImage("https://tenor.com/view/error-computer-warning-gif-8680016")
  .setTimestamp();
const ErrorUnWarn = new MessageEmbed()
  .setTitle("UnWarn DePic")
  .setColor("RED")
  .addField(
    "Error!",
    "Ya tiene el minimo de warn posble osea **0**\n no se puede dar -1. . . o si 🤔?"
  )
  .setImage("https://tenor.com/view/error-computer-warning-gif-8680016")
  .setTimestamp();

module.exports = {
  name: "unwarn",
  aliases: [],
  description: "Quitale una advertencia a un usuario",
  category: "admin",
  usage: "unwarn <usuario> <Razon>",
  botPermissions: ["SEND_MESSAGES", "VIEW_CHANNEL"],
  userPermissions: ["BAN_MEMBERS"],
  cooldown: 5,
  run: async (client, msg, args) => {
    if (!msg.guild)
      return msg.channel.send("Este comando solo funciona en servidores.");
    if (!msg.member.hasPermission("BAN_MEMBERS"))
      return msg.reply(`No tiene permiso para ejecutar este comando.`);
    if (!args[1]) return msg.channel.send(UnWarnSet);

    let msgDocument = await MessageModel.findOne({
      guildid: msg.guild.id,
    }).catch((err) => console.log(err));
    if (!msgDocument) {
      try {
        let dbMsg = await new MessageModel({
          guildid: msg.guild.id,
          role: false,
          roletime: 0,
          roleid: "0",
          kick: false,
          kicktime: 0,
          ban: false,
          bantime: 0,
        });

        var dbMsgModel = await dbMsg.save();
      } catch (err) {
        console.log(err);
      }
    } else {
      var dbMsgModel = msgDocument;
    }
    if (
      args[1] ===
      "gsads4df74hfd4g8es4784ag4ea74ege4g6sa54g7848s4g4se87eh4g87e4h98e4h87se4"
    ) {
      if (
        args[2] ===
        "gsads4df74hfd4g8es4784ag4ea74ege4g6sa54g7848s4g4se87eh4g87e4h98e4h87se4"
      ) {
        if (!args[3]) return msg.channel.send(UnWarnSet);
        if (
          args[3] ===
          "gsads4df74hfd4g8es4784ag4ea74ege4g6sa54g7848s4g4se87eh4g87e4h98e4h87se4"
        ) {
          try {
            let form = await dbMsgModel.updateOne({ role: false });
            msg.channel.send(UnWarnSet);
          } catch (err) {
            console.log(err);
            return msg.channel.send(dbBug + err);
          }
        } else {
          let warnings = parseInt(args[2]);
          let roleObj =
            msg.mentions.roles.first() ||
            msg.guild.roles.cache.get(args[3]) ||
            msg.guild.roles.cache.find(
              (r) => r.name === args.slice(3).join(" ")
            );
          if (!isNaN(warnings)) {
            if (roleObj) {
              try {
                let form = await dbMsgModel.updateOne({
                  role: true,
                  roletime: warnings,
                  roleid: roleObj.id,
                });
                msg.channel.send(UnWarnSet);
              } catch (err) {
                console.log(err);
                return msg.channel.send(dbBug + err);
              }
            } else {
              return msg.channel.send(UnWarnSet);
            }
          } else {
            return msg.channel.send(UnWarnSet);
          }
        }
      } else if (
        args[1] ===
        "gsads4df74hfd4g8es4784ag4ea74ege4g6sa54g7848s4g4se87eh4g87e4h98e4h87se4"
      ) {
        if (!args[2]) return msg.channel.send(UnWarnSet);
        if (
          args[2] ===
          "gsads4df74hfd4g8es4784ag4ea74ege4g6sa54g7848s4g4se87eh4g87e4h98e4h87se4"
        ) {
          try {
            let form = await dbMsgModel.updateOne({ kick: false });
            msg.channel.send(UnWarnSet);
          } catch (err) {
            console.log(err);
            return msg.channel.send(dbBug + err);
          }
        } else {
          let warnings = parseInt(args[2]);
          if (!isNaN(warnings)) {
            try {
              let form = await dbMsgModel.updateOne({
                kick: true,
                kicktime: warnings,
              });
              msg.channel.send(UnWarnSet);
            } catch (err) {
              console.log(err);
              return msg.channel.send(dbBug + err);
            }
          } else {
            return msg.channel.send(UnWarnSet);
          }
        }
      } else if (
        args[1] ===
        "gsads4df74hfd4g8es4784ag4ea74ege4g6sa54g7848s4g4se87eh4g87e4h98e4h87se4"
      ) {
        if (!args[2]) return msg.channel.send(UnWarnSet);
        if (
          args[2] ===
          "gsads4df74hfd4g8es4784ag4ea74ege4g6sa54g7848s4g4se87eh4g87e4h98e4h87se4"
        ) {
          try {
            let form = await dbMsgModel.updateOne({ ban: false });
            msg.channel.send(UnWarnSet);
          } catch (err) {
            console.log(err);
            return msg.channel.send(dbBug + err);
          }
        } else {
          let warnings = parseInt(args[2]);
          if (!isNaN(warnings)) {
            try {
              let form = await dbMsgModel.updateOne({
                ban: true,
                bantime: warnings,
              });
              msg.channel.send(UnWarnSet);
            } catch (err) {
              console.log(err);
              return msg.channel.send(dbBug + err);
            }
          } else {
            return msg.channel.send(UnWarnSet);
          }
        }
      } else {
        msg.channel.send(UnWarnSet);
      }
    } else {
      let member =
        msg.mentions.members.first() || msg.guild.members.cache.get(args[1]);
      if (!member) return msg.channel.send("Miembro invalido!");

      let document = await MessageModel2.findOne({
        guildid: msg.guild.id,
        memberid: member.id,
      }).catch((err) => console.log(err));
      if (!document) {
        try {
          let dbMsg = await new MessageModel2({
            guildid: msg.guild.id,
            memberid: member.id,
            warnings: 0,
          });
          var dbMsgModel2 = await dbMsg.save();
        } catch (err) {
          console.log(err);
        }
      } else {
        var dbMsgModel2 = document;
      }
      console.log(dbMsgModel2);
      if (dbMsgModel2) {
        try {
          let { warnings } = dbMsgModel2;
          let newWarnings = warnings - 1;
          if (newWarnings < 0) {
            msg.channel.send(ErrorUnWarn);
            return;
          }
          console.log(newWarnings);
          let form = await dbMsgModel2.updateOne({ warnings: newWarnings });
          const dmWarn = new MessageEmbed()
            .setTitle("Warn DePic")
            .setColor("ORANGE")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField(
              "Warn",
              `> Se te quito una advertido en el servidor: **${msg.guild.name}**
              > Por la razón: **${args.slice(1).join(" ")}**
              > Tienes **${newWarnings}** advertencia(s)
              > Por: **${msg.author.username}**`
            )
            .setFooter(member.user.username)
            .setTimestamp();
          const severWarn = new MessageEmbed()
            .setTitle("Warn DePic")
            .setColor("ORANGE")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField(
              "Warn",
              `> Se a quitado advertido en el servidor: **${msg.guild.name}**
              > Por la razón: **${args.slice(1).join(" ")}**
              > Al Usuario **${member.user.username}**
              > Ahora tiene **${newWarnings}** advertencias
              > De: **${msg.author.username}**`
            )
            .setFooter(member.user.username)
            .setTimestamp();
          if (args[2]) {
            member.send(dmWarn).catch((err) => {});
            msg.channel.send(severWarn);
          } else {
            member.send(dmWarn).catch((err) => {});
            msg.channel.send(severWarn);
          }

          let {
            role,
            roletime,
            roleid,
            kick,
            kicktime,
            ban,
            bantime,
          } = dbMsgModel;
          if (role) {
            if (roletime <= newWarnings) {
              member.roles.add(roleid, "Demasiadas advertencias");
            }
          }
          if (kick) {
            if (kicktime == newWarnings) {
              member.kick("Demasiadas advertencias");
            }
          }
          if (ban) {
            if (bantime == newWarnings) {
              member.ban({ reason: "Demasiadas advertencias" });
            }
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return msg.channel.send("Algo pasó");
      }
    }
  },
};
