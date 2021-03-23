const sqlite3 = require('sqlite3').verbose();
const config = require('../util').getConfig()[1];
const sql = new sqlite3.Database(config.dirBase)

async function tableCoins(){
    //TABLA: comandos usados
    await sql.run('CREATE TABLE IF NOT EXISTS coins (iduser TEXT, coins INTEGER, status INTEGER)')
}
async function tableVerific () {
    // TABLA: prefixes
    await sql.run('CREATE TABLE IF NOT EXISTS prefixes (idserver TEXT, prefix TEXT, status INTEGER DEFAULT 0)')
}
async function tableLogs () {
    // TABLA: logs
    await sql.run('CREATE TABLE IF NOT EXISTS log (idserver TEXT, idchannel TEXT)')
}


module.exports = {
    createTables: async function(){
        try{
            await tableCoins();
            await tableVerific();
            await tableLogs();


        } catch (e) {
            console.error(e)
        }
    }
}