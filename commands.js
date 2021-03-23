const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  fetchAllMembers: true,
});
const config = require("./config");
const fs = require("fs");
const cooldown = new Set();
require("./mongo.js");
const prefix = "&";
const prefixSchema = require("./database/models/prefix_db");
client.snipes = new Map();
client.editsnipes = new Map();
client.color = "#2769FF";
const ascii = require("ascii-table");
const table = new ascii("Commands");
table.setHeading("Command", "Load Status");
client.queue = new Map();
client.skipvote = new Map();
//New Collection
client.commands = new Discord.Collection();

//Reading Folders and files
let i = 0;
fs.readdirSync("./commands/").forEach((folder) => {
  const commands = fs
    .readdirSync(`./commands/${folder}/`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commands) {
    const cmd = require(`./commands/${folder}/${file}`);
    if (cmd.name) {
      client.commands.set(cmd.name, cmd);
      table.addRow(`${++i} - ${file}`, "✔️");
    } else {
      table.addRow(`${++i} - ${file}`, "❌");
      continue;
    }
  }
});
console.log(table.toString());

const events = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of events) {
  const event = require(`./events/${file}`);
}

client.prefix = async function (message) {
  if (!message.guild) return;
  let custom;

  const data = await prefixSchema
    .findOne({ Guild: message.guild.id })
    .catch((err) => console.log(err));

  if (data) {
    custom = data.Prefix;
  } else {
    custom = prefix;
  }
  return custom;
};

function presence() {
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "Bot DePic | &help",
      type: "WATCHING",
    },
  });
}

client.on("ready", () => {
  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;

  console.log(
    `${client.user.tag} is alive ✨ en ${guilds} servers con ${users} usuarios en cache`
  );
  presence();

  const clientDetails = {
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    channels: client.channels.cache.size,
  };
});

client.on("message", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.guild.unavailable) return;
  if (message.author.bot) return;
  /*let levels = require("./database/models/niveles_db"),
    data = await levels.findOne({ guild: message.guild.id }),
    new_data = new levels({ guild: message.guild.id });
  if (!data) {
    await new_data.save();
    data = await levels.findOne({ guild: message.guild.id });
  }
  let user_data = data.levels.find((u) => u.user === message.author.id);
  if (!user_data) {
    await data.updateOne({
      $push: {
        levels: {
          user: message.author.id,
          level: 1,
          xp: 1,
        },
      },
    });
  } else {
    if (174 * user_data.level >= user_data.xp) {
      user_data.level = user_data.level + 1;
      user_data.xp = 0;
      console.log(user_data);
      await data.save();
    } else {
      user_data.xp = user_data.xp + 1;
      await data.save();
    }
  }*/
  const p = await client.prefix(message);
  if (!message.content.startsWith(p)) return;
  let args = message.content.slice(p.length).trim().split(" ");
  let command = args.shift().toLowerCase();
  const file =
    client.commands.get(command) ||
    client.commands.find((c) => c.aliases.includes(command));
  if (!file) return;
  var id = message.author.id + file.name + file.aliases.join("");
  const time = file.cooldown;
  console.log(time);
  if (cooldown.has(id))
    return message.channel.send(
      `${message.author}, Espera **${time}** segundos para usar de nuevo ese comando`
    );
  cooldown.add(id);
  if (file) file.run(client, message, args, p);
  setTimeout(() => {
    cooldown.delete(id);
  }, time + "000");
});

client.login(config.token);
