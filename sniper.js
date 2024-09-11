const { Client } = require('discord.js-selfbot-v13');
const axios = require('axios')
const fs = require('fs')


config = JSON.parse(fs.readFileSync("config.json", 'utf-8'))
let token = config["token"]
let guid = config["guild_id"]


const client = new Client();

client.on('ready', async () => {
    console.clear()
    console.log(`MAKE SURE UR IN THE SERVER U WANNA SNIPE THE VANITY FROM. AND PERMS IN THE ONE U WANT TO PUT THE VANITY ON!!!!!!`)
    console.log(`${client.user.username} is ready! fymjosh has ur token!`);
})

const vanities = [
    "yagami", "ground", 
    "seek", "goten", "newgen", "chidori", "aot", "smoke", "grisha", "tybw", "mass"
] // vanity codes to snipe


async function change_vanitys(vanityCode) {
    res = await axios.patch(`https://discord.com/api/v9/guilds/${guid}/vanity-url`, {
        code: vanityCode
    }, {
        headers: {
            Authorization: token
        }
    }).then((res)=> {
        if (res.status === 200) {
            console.log(`Sniped Vanity ${vanityCode}`)
        }
    })
}
client.on('guildUpdate', async(oldGuild, newGuild) => {
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode && vanities.includes(oldGuild.vanityURLCode)) {
        await change_vanitys(oldGuild.vanityURLCode)
    }
})

client.login(token);
