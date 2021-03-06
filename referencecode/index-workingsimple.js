const Discord = require("discord.js");
const axios = require("axios");
const bot = new Discord.Client();

const prefix = "!";
const token = "";

bot.on("ready", () => {
  console.log("bot is working");
});

bot.on("message", async msg => {
  if (!msg.content.startsWith(prefix)) {
    return;
  }
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const command = args.shift().toLowerCase();
  console.log(args);

  if (command === "misp") {
    const combinedArgs = args.join(" ");
    const rotoken = "";
    let getioc = async () => {
      let response = await axios
        .get(
          `https://misp.serverurl.org/events/index/searchall:${combinedArgs}`,
          {
            headers: {
              Authorization: `${rotoken}`,
              responseType: "json"
            }
          }
        )
        .catch(error => {
          console.error(error);
        });

      let findings = response.data;
      return findings;
    };
    let getfindings = await getioc();
    console.log(getfindings);
    poop = JSON.stringify(getfindings);
    poop2 = poop.substring(0, 150);
    msg.channel.send(poop2);
  }
});

bot.login(token);
