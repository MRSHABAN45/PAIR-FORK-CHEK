const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
const axios = require('axios'); // ✅ Added for fork checking
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');

const { upload } = require('./mega');

// ✅ GitHub Token & Repo to check
const GITHUB_TOKEN = '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';
const MAIN_REPO = 'MRSHABAN45/SHABAN-MD';

// ✅ Fork Check Function
async function checkIfForked(username) {
  try {
    const res = await axios.get(`https://api.github.com/repos/${username}/SHABAN-MD`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    return res.data.fork && res.data.parent.full_name === MAIN_REPO;
  } catch (err) {
    return false;
  }
}

function removeFile(FilePath) {
  if (!fs.existsSync(FilePath)) return false;
  fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
  const id = makeid();
  let num = req.query.number;
  const username = req.query.username;

  // ✅ Step 1: Check for GitHub username
  if (!username) {
    return res.status(400).json({ error: "Missing GitHub username in query. Use ?username=yourgithubname" });
  }

  // ✅ Step 2: Run Fork Checker
  const hasForked = await checkIfForked(username);
  if (!hasForked) {
    return res.status(403).json({
      error: "❗ Please fork the repository first: https://github.com/MRSHABAN45/SHABAN-MD"
    });
  }

  // ✅ Step 3: Continue as normal
  async function GIFTED_MD_PAIR_CODE() {
    const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
    try {
      var items = ["Safari"];
      var randomItem = items[Math.floor(Math.random() * items.length)];

      let sock = makeWASocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
        },
        printQRInTerminal: false,
        generateHighQualityLinkPreview: true,
        logger: pino({ level: "fatal" }).child({ level: "fatal" }),
        syncFullHistory: false,
        browser: Browsers.macOS(randomItem)
      });

      if (!sock.authState.creds.registered) {
        await delay(1500);
        num = num.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(num);
        if (!res.headersSent) {
          await res.send({ code });
        }
      }

      sock.ev.on('creds.update', saveCreds);
      sock.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s;

        if (connection == "open") {
          await delay(5000);
          let rf = __dirname + `/temp/${id}/creds.json`;
          const randomText = "3EB" + [...Array(19)].map(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))).join('');
          try {
            const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
            const string_session = mega_url.replace('https://mega.nz/file/', '');
            let md = "SHABAN-MD~" + string_session;

            let code = await sock.sendMessage(sock.user.id, { text: md });

            await sock.newsletterFollow("120363358310754973@newsletter");
            await sock.newsletterUnmute("120363358310754973@newsletter");
            await sock.newsletterFollow("120363421135776492@newsletter");
            await sock.newsletterUnmute("120363421135776492@newsletter");
            await sock.newsletterFollow("120363315182578784@newsletter");

            let desc = `*┏━━━━━━━━━━━━━━*
*┃SHABAN-MD SESSION IS*
*┃SUCCESSFULLY*
*┃CONNECTED ✅🔥*
*┗━━━━━━━━━━━━━━━*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❶ || Creator = MR SHABAN⁴⁰👨🏻‍💻*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❷ || WhatsApp Channel =* https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❸ || Owner =* MR SHABAN⁴⁰
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❹ || Repo =* https://github.com/MRSHABAN45/SHABAN-MD
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*❺ || You Tube =* https://youtube.com/@mrshaban282?si=UzxrTKrBzDHa09a4
▬▬▬▬▬▬▬▬▬▬▬▬▬▬
*POWERD BY MR SHABAN⁴⁰*`;

            await sock.sendMessage(sock.user.id, {
              text: desc,
              contextInfo: {
                externalAdReply: {
                  title: "MR SHABAN⁴⁰",
                  thumbnailUrl: "https://i.ibb.co/RT2k3nHG/shaban-md.jpg",
                  sourceUrl: "https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O",
                  mediaType: 1,
                  renderLargerThumbnail: true
                }
              }
            }, { quoted: code });

          } catch (e) {
            let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
            // (Same desc again with mediaType 2 if error)
          }

          await delay(10);
          await sock.ws.close();
          await removeFile('./temp/' + id);
          console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅`);
          await delay(10);
          process.exit();

        } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
          await delay(10);
          GIFTED_MD_PAIR_CODE();
        }
      });
    } catch (err) {
      console.log("service restated");
      await removeFile('./temp/' + id);
      if (!res.headersSent) {
        await res.send({ code: "❗ Service Unavailable" });
      }
    }
  }

  return await GIFTED_MD_PAIR_CODE();
});

module.exports = router;