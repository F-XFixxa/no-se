var dbd = require("dbd.js")
var fs = require("fs")

const bot = new dbd.Bot({
token: process.env.TOKEN,
prefix: "$getServerVar[prefix]"
})
 
//bot status
bot.status({
  text: process.env.BOT_ACTIVITY_TEXT,
  type: process.env.BOT_ACTIVITY_TYPE,
  time: 12
})
 
bot.onMessage()

//variable
bot.variables({
 prefix: process.env.PREFIX,
 bank:"0",
 cash:"0",
 diamond:"0",
 fish:"0",
 fishrod:"0",
 car:"0",
 house:"0",
 laptop:"0",
 fuel:"0",
 health:"100",
 hungry:"100",
 thirsty:"100",
 pizza:"0",
 drink:"0",
 hm:"0",
 daily: process.env.DAILY_SALARY,
 monthly: process.env.MONTHLY_SALARY
})
  
 //commands handler
var reader = fs.readdirSync("./economy/").filter (file => file.endsWith(".js"))
for(const file of reader) {
  const command = require(`./economy/${file}`)
  bot.command({
name: command.name, 
aliases: command.aliases,
code: command.code
  })
}

//help command here
bot.command({

name: "help",
code: `$title[$userTag[$clientID] HELP MENU]

$description[**$getServerVar[prefix]help** - Esto!
**$getServerVar[prefix]balance** - tu balance.
**$getServerVar[prefix]inven** - tu Inventario.
**$getServerVar[prefix]dep** - deposita dinero al banco.
**$getServerVar[prefix]with** - retira banco a efectivo.
**$getServerVar[prefix]daily** - salario diario.
**$getServerVar[prefix]monthly** - salario mensual.
**$getServerVar[prefix]work** - chambea por dinero.
**$getServerVar[prefix]mining** - mina dinero.
**$getServerVar[prefix]fish** - pesca.
**$getServerVar[prefix]heist** - atraco al banco internacional?
**$getServerVar[prefix]give** - dale dinero a alguien.
**$getServerVar[prefix]shop** - Tienda. (¡más comandos para comprar, comer, etc. aquí!)]


$color[RANDOM]
$footer[codigo del dev de fantagvng]
$addTimestamp`
})
