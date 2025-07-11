const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const cron = require('node-cron');

const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
  console.log('Scan QR berikut di WhatsApp kamu:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot siap digunakan!');
  
  // Shift Pagi - Jam 06:30 WIB (UTC = 23:30)
  cron.schedule('45 6 * * *', () => {
    kirimKeGrup('Selamat pagi! Rekan-rekan jangan lupa buang sampah nya, jangan lupa di foto juga ya. Terimakasiiiih');
  });

  // Shift Siang - Jam 14:30 WIB (UTC = 07:30)
  cron.schedule('45 14 * * *', () => {
    kirimKeGrup('Selamat siang! Rekan-rekan jangan lupa buang sampah nya, jangan lupa di foto juga ya. Terimakasiiiih');
  });

  // Shift Malam - Jam 22:30 WIB (UTC = 15:30)
  cron.schedule('45 22 * * *', () => {
    kirimKeGrup('Selamat malam! Rekan-rekan jangan lupa buang sampah nya, jangan lupa di foto juga ya. Terimakasiiiih');
  });
});

function kirimKeGrup(pesan) {
  const namaGrup = 'Menuju Sukses Yoook';
  client.getChats().then(chats => {
    const grup = chats.find(chat => chat.isGroup && chat.name === namaGrup);
    if (grup) {
      grup.sendMessage(pesan);
      console.log('Pesan terkirim:', pesan);
    } else {
      console.log('Grup tidak ditemukan.');
    }
  });
}

client.initialize();
