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
    console.log(getfindings[0].info);
    msg.channel.send(`
      \n https://misp.serverurl.org/events/view/${getfindings[0].id} 
      \n Date = ${getfindings[0].date} 
      \n Title = ${getfindings[0].info}`);
  }
});

bot.login(token);
