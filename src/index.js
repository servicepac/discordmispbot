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

   if (command === "help") {
    msg.channel.send(`List of Available Commands:
    \n !misp $variable - search misp for an indicator (IP/hash/bitcoinWallet/email/Domain-etc)
    \n !otx $variable- search Alienvault Online Threat Exchange for indicator
    \n !threatconnect $variable - search threatconnect
    \n !vt $hash - view AV score for a given hash on virustotal
    \n !shodan $variable - search shodan
    \n !multi $variable - search misp/otx/tc/and vt for given indicator
    \n !whois $ipaddress - query ip address for whois/rwhois info`);
  }

  if (command === "whois") {
    //check freegeoip.net
    axios.get(`http://freegeoip.net/json/${combinedArgs}`)
      //check viewdns.info
      

  }
  if (command === "misp") {
    const combinedArgs = args.join(" ");
    const rotoken = "";
    let getioc = async () => {
      let response = await axios
        .get(
          `https://workgroup.trustedmatrix.org/events/index/searchall:${combinedArgs}`,
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
    for (element in getfindings) {
      console.log(element);
      msg.channel.send(`https://misp.serverurl.org/events/view/${
        getfindings[element].id
      }
      Date = ${getfindings[element].date}
      Title = ${getfindings[element].info}`);
    }
  }
});

bot.login(token);
