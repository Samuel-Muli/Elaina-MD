var fetch = require('node-fetch');
var handler = async (m, {
  text,
  usedPrefix,
  command
}) => {
  if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
  try {
    await m.reply(wait)
    var apii = await fetch(`https://api.betabotz.eu.org/api/search/openai-chat?text=${text}&apikey=apikey`)
    var res = await apii.json()
    await m.reply(res.message)
  } catch (err) {
    console.error(err)
    throw "Terjadi kesalahan dalam menjawab pertanyaan"
  }
}
handler.command = handler.help = ['ai2', 'openai2'];
handler.tags = ['tools'];
handler.premium = false
module.exports = handler;