let path = require('../src/grouplink.json')
let link = path.map((v, i) => `Group ${i + 1}\n${v}`).join('\n\n')
let handler = async (m, { conn, args, usedPrefix, command, isAdmin, isOwner }) => {
	if (m.isGroup) {
		if (!(isAdmin || isOwner)) {
			global.dfail('admin', m, conn)
			throw false
		}
		let isClose = { // Switch Case Like :v
			'open': 'not_announcement',
			'close': 'announcement',
		}[(args[0] || '')]
		if (isClose === undefined)
			return conn.sendButton(m.chat, '_Silahkan pilih opsi_', 'Pilih aku atau dia hayoo..', 2, ['Buka', '.gc open', 'Tutup', '.gc close'], m)
		await conn.groupSettingUpdate(m.chat, isClose)

	} else {
		m.reply(`Gabung group Bot dan bersenang senang dengan pengguna lainya
⬇️⬇️
${link}`)
	}
}
handler.help = ['group [open/close]']
handler.tags = ['group']
handler.command = /^(group|gc)$/i
handler.botAdmin = true

module.exports = handler