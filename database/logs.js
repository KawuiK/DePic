const queries = require('./queries');

module.exports = {
 existsLog: async function (idserver) {
  let query = "SELECT * FROM log WHERE idserver = ?"
  let result = await queries.getQuery(query, idserver)

  if (result != undefined) {
   return true

  } else {
   return false

  }
 },
 addLog: async function (idserver, prefix) {
  let query = `INSERT INTO log (idserver, idchannel) VALUES (${message.guild.id}, ${message.channel.id})`
  await queries.runQuery(query, [idserver, prefix])

 },
 getLog: async function (idserver) {
  let query = "SELECT * FROM log WHERE idserver = ?"
  let result = await queries.getQuery(query, idserver)

  return result;

 },
 deleteLog: async function (idserver) {
  let query = `DELETE FROM log WHERE idserver = ${message.guild.id}`
  await queries.runQuery(query, idserver)

 },

}
