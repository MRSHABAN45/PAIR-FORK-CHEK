const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const axios = require("axios");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    Browsers,
    makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');

const { upload } = require('./mega');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// GitHub Fork Check Function
async function isForked(username) {
    const GITHUB_TOKEN = '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';
    try {
        const res = await axios.get(`https://api.github.com/repos/${username}/SHABAN-MD`, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                'User-Agent': 'shaban-md-verifier'
            }
        });
        return res.data.fork && res.data.parent && res.data.parent.full_name === 'MRSHABAN45/SHABAN-MD';
    } catch (err) {
        return false;
    }
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    let username = req.query.username;

    // GitHub username check before pairing
    if (!username) return res.status(400).send({ error: 'GitHub username is required.' });
    const validFork = await isForked(username);
    if (!validFork) return res.status(403).send({ error: '❌ GitHub fork not found. Please fork https://github.com/MRSHABAN45/SHABAN-MD first.' });

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

                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }

                    const randomText = generateRandomText();

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
                        let ddd = sock.sendMessage(sock.user.id, { text: e });
                        let desc = `*┏━━━━━━━━━━━━━━*\n*┃SHABAN-MD SESSION IS*\n*┃SUCCESSFULLY*\n*┃CONNECTED ✅🔥*\n*┗━━━━━━━━━━━━━━━*`;
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "MR SHABAN⁴⁰",
                                    thumbnailUrl: "https://i.ibb.co/RT2k3nHG/shaban-md.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VazjYjoDDmFZTZ9Ech3O",
                                    mediaType: 2,
                                    renderLargerThumbnail: true,
                                    showAdAttribution: true
                                }
                            }
                        }, { quoted: ddd });
                    }

                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} Connected ✅ Restarting...`);
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
