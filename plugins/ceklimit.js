let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
  let { name, limit, exp, level, role, suit, skata } = global.db.data.users[who]
  let { min, xp, max } = levelling.xpRange(level, global.multiplier)
  let math = max - exp
  conn.sendButton(m.chat, `
*Nama :* ${name}
*XP   :* ${exp} (${exp - min}/ ${xp})
[${math <= 0 ? `Siap untuk ${usedPrefix}levelup` : `Butuh ${math} XP lagi untuk levelup`}]
*Level:* ${level}
*Role :* ${role}
*Limit :* ${limit} 
*MMR Total:* ${suit + (skata ? skata : 1)} `.trim(), `${conn.readmore}
Harga penukaran 1 limit = -350 XP

Cara penukaran: ketik
${usedPrefix}buy

Bagaimana cara menambah XP? 

Kamu bisa mengumpulkan XP dengan bermain game yg ada di *${usedPrefix}menu game*
`.trim(), 2, ['Buy', '.buy', 'Claim', `${usedPrefix}claim`], m)
}
handler.help = ['cek']
handler.tags = ['xp']
handler.command = /^(cek|limit)$/i
handler.register = true
module.exports = handler