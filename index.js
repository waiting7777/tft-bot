require('dotenv').config()
const TFT = require('./tftapi')
const tft = new TFT()
const { Client, RichEmbed } = require('discord.js')
const client = new Client()

ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

async function main() {
  const res = await tft.getAccountDataByName('waiting77777')
  const res2 = await tft.getLeagueBySummonerid(res.id)
  return res2[0]
}

function romaToNumber(roma) {
  switch (roma) {
    case 'I':
      return 1
    case 'II':
      return 2
    case 'III':
      return 3
    case 'IV':
      return 4
  }
}

client.login(process.env.TOKEN)
client.on('message', async (message) => {
  // If the message is "how to embed"
  if (message.content[0] === '$') {
    const res = await main()
    console.log(res)
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle(`${res.summonerName}`)
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(`${res.tier} ${res.rank} ${res.leaguePoints}`)
      .setThumbnail(`https://cdn.lolchess.gg/images/lol/tier/${res.tier.toLowerCase()}_${romaToNumber(res.rank)}.png`)
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
});