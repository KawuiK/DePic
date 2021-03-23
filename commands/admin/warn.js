const { Command } = require("../../commands");
const {
  Client,
  MessageEmbed,
  Presence,
  User,
  Collection,
} = require("discord.js");
const MessageModel = require("../../database/models/warn_db");
const MessageModel2 = require("../../database/models/warn1_db");

const seteo = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField(
    "Forma de seteo del comando",
    `> Warn set <role/kick/ban> <número de warns o false> <roles (sólo modo roles)> 
    > O tambien
    > Warn <member> <reason>`
  )
  .setTimestamp();
const seteouso = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField(
    "Forma de seteo del comando",
    "Uso: `warn set <role, kick, ban> <number or false> <role id (solo opción de rol)>"
  )
  .setTimestamp();

const Rolset = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField(
    "Rol automatico",
    "Primero ponga el número de advertencias para poner el **rol**, y luego mencione el rol, escriba su ID o escriba su nombre. Establezca `false` para no usar roles en este sistema."
  )
  .setTimestamp();
const kikcSet = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField(
    "Kick automatico",
    "Ponga la cantidad de advertencias necesarias para **kickear** al miembro."
  )
  .setTimestamp();
const banSet = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField(
    "Auto Ban",
    "Ponga el número de advertencias necesarias para **banear** al miembro."
  )
  .setTimestamp();
const RolSetFalse = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField("Rol automatico", "Está bien, no pondré un rol.")
  .setTimestamp();
const kickFalse = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField("Kick automatico", "Está bien, dare kick a nadie")
  .setTimestamp();
const banFalse = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField("Auto Ban", "No dare ban a nadie")
  .setTimestamp();
const dbBug = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("RED")
  .addField("Data Base Error", "En mi base de datos se genero un error")
  .setImage("https://tenor.com/view/error-computer-warning-gif-8680016")
  .setTimestamp();
const invalidRol = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .addField("Rol Invadido", "Ese rol no es válido.")
  .setTimestamp();
const invalidAdv = new MessageEmbed()
  .setTitle("Warn DePic")
  .setColor("ORANGE")
  .setImage("https://tenor.com/view/error-computer-warning-gif-8680016")
  .addField(
    "Advertencias Invadidas",
    "Esa no es una cantidad válida de advertencias"
  )
  .setTimestamp();

module.exports = {
  name: "warn",
  aliases: [],
  description: "Configura el warn y warnea a un usuario",
  category: "admin",
  usage: "warn <set> <role/ban/kick> <Numero> / warn <usuario> <razon>",
  botPermissions: [
    "SEND_MESSAGES",
    "VIEW_CHANNEL",
    "BAN_MEMBERS",
    "KICK_MEMBERS",
    "MANAGE_ROLES",
  ],
  userPermissions: ["BAN_MEMBERS"],
  cooldown: 5,
  run: async (client, msg, args) => {
    if (!msg.guild)
      return msg.channel.send("Este comando solo funciona en servidores.");
    if (!msg.member.hasPermission("BAN_MEMBERS"))
      return msg.reply(`No tiene permiso para ejecutar este comando.`);
    if (!args[1]) return msg.channel.send(seteo);

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
    if (args[0] === "set") {
      if (args[1] === "role") {
        if (!args[2]) return msg.channel.send(Rolset);
        if (args[2] === "false") {
          try {
            let form = await dbMsgModel.updateOne({ role: false });
            msg.channel.send(RolSetFalse);
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
                const autoRolSet = new MessageEmbed()
                  .setTitle("Warn DePic")
                  .setColor("GREEN")
                  .addField(
                    "Activado!",
                    `> Ahora voy a poner el rol ${roleObj.name}\n> a los miembos que tienen: **${warnings}** advertencias`
                  )
                  .setTimestamp();
                msg.channel.send(autoRolSet);
              } catch (err) {
                console.log(err);
                return msg.channel.send(dbBug + err);
              }
            } else {
              return msg.channel.send(invalidRol);
            }
          } else {
            return msg.channel.send(invalidAdv);
          }
        }
      } else if (args[1] === "kick") {
        if (!args[2]) return msg.channel.send(kikcSet);
        if (args[2] === "false") {
          try {
            let form = await dbMsgModel.updateOne({ kick: false });
            msg.channel.send(kickFalse);
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
              const autoKickSet = new MessageEmbed()
                .setTitle("Warn DePic")
                .setColor("GREEN")
                .addField(
                  "Activado!",
                  `> Ahora voy a dar kick a los miembros que tienen: **${warnings}** advertencias`
                )
                .setTimestamp();
              msg.channel.send(autoKickSet);
            } catch (err) {
              console.log(err);
              return msg.channel.send(dbBug + err);
            }
          } else {
            return msg.channel.send(invalidAdv);
          }
        }
      } else if (args[1] === "ban") {
        if (!args[2]) return msg.channel.send(banSet);
        if (args[2] === "false") {
          try {
            let form = await dbMsgModel.updateOne({ ban: false });
            msg.channel.send(banFalse);
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
              const autoBanSet = new MessageEmbed()
                .setTitle("Warn DePic")
                .setColor("GREEN")
                .addField(
                  "Activado!",
                  `> Ahora voy a dar **ban** a los miembros que tienen: **${warnings}** advertencias`
                );
              msg.channel.send(autoBanSet);
            } catch (err) {
              console.log(err);
              return msg.channel.send(dbBug + err);
            }
          } else {
            return msg.channel.send(invalidAdv);
          }
        }
      } else {
        msg.channel.send(seteouso);
      }
    } else {
      let member =
        msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
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
          let newWarnings = warnings + 1;
          let form = await dbMsgModel2.updateOne({ warnings: newWarnings });
          const dmWarn = new MessageEmbed()
            .setTitle("Warn DePic")
            .setColor("ORANGE")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addField(
              "Warn",
              `> Has sido advertido en el servidor: **${msg.guild.name}**
              > Por la razón: **${args.slice(1).join(" ")}**
              > Tienes **${newWarnings}** advertencias
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
              `> Has advertido en el servidor: **${msg.guild.name}**
              > Por la razón: **${args.slice(1).join(" ")}**
              > Al Usuario **${member.user.username}**
              > Ahora tiene **${newWarnings}** advertencias
              > De: **${msg.author.username}**`
            )
            .setFooter(member.user.username)
            .setTimestamp();
          console.log(member);
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
              msg.channel
                .createInvite({
                  maxAge: 0,
                })
                .then((invite) => {
                  member.send(
                    "**Fuistes Kickado del servidor aqui la invitacion para unirte**"
                  );
                  member.send(invite.url);
                });
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
