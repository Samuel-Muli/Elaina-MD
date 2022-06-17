let fs = require('fs')
let winScore = 500
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        if (this.game[id].id !== undefined) return this.sendButton(m.chat, 'Masih ada kuis yang belum terjawab di chat ini', 'Ketik *Nyerah* untuk mengakhiri', 1, ['Nyerah', 'nyerah'], this.game[id].msg)
        delete this.game[id]
        throw false
    }
    this.game[id] = {}
    let src = JSON.parse(fs.readFileSync(`./src/scrap/family.json`))
    let json = src[Math.floor(Math.random() * src.length)]

    conn.scrapGame(global.API('xteam', '/game/family100', '', 'APIKEY'), 'family').catch(_ => _)

    let caption = `
*Soal:* ${json.soal}

Terdapat *${json.jawaban.length}* jawaban${json.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}

+${winScore} XP tiap jawaban benar
    `.trim()
    this.game[id] = {
        id,
        msg: await m.reply(caption),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.group = true
handler.command = /^family100$/i

module.exports = handler