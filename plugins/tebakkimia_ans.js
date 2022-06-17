const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEBAK UNSUR KIMIA/i.test(m.quoted.text)) return !0
    this.tebakkimia = this.tebakkimia ? this.tebakkimia : {}
    if (!(id in this.tebakkimia)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakkimia[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkimia[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.result.nama.toLowerCase()) {
            global.db.data.users[m.sender].exp += this.tebakkimia[id][2]
            this.sendButton(m.chat, `*Benar!*\n+${this.tebakkimia[id][2]} XP`, '', 1, ['Tebak Kimia', '.tebakkimia'], m)
            clearTimeout(this.tebakkimia[id][3])
            delete this.tebakkimia[id]
        } else if (similarity(m.text.toLowerCase(), json.result.nama.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler