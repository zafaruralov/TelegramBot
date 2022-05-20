const TelegramApi = require('node-telegram-bot-api')

const api = '5334946203:AAHGQvrludSNBowKptEUL-TNvECUi3lheDc'    

const bot = new TelegramApi(api, {polling: true})

const chats = {}

const gameOp = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}
bot.setMyCommands([
    {command: '/start', description:'for begin'},
    {command: '/info', description:'for info'},
    {command: '/game', description:'waste your time'}
])

const againOp = {
    reply_markup:JSON.stringify({
        inline_keyboard: [
            [{text: 'again', callback_data:'/again'}]
        ]
    })
}

const startGame = async(chatId) =>{
    await bot.sendMessage(chatId, `choose from 0 to 9`)
            const randomNum = Math.floor(Math.random() * 10)
            chats[chatId] = randomNum
            return bot.sendMessage(chatId,'find the number', gameOp)
}


const start =() =>{
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        // bot.sendMessage(chatId, "")
    
        if(text == '/start'){
            return bot.sendSticker(chatId, 'https://telegram.org/file/464001512/11ecc/VrmK4ykBNYc.306395/ea2078f7918f0250aa')
        }
        if(text == '/info'){
            return bot.sendMessage(chatId, `welcom ${msg.from.first_name}`)
        }
        if(text == '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, `404`)
    })

    bot.on('callback_query', msg =>{
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data == '/again'){
            return startGame(chatId)
        }
        if(data == chats[chatId]){
            bot.sendMessage(chatId, 'congratulations')
        }else{bot.sendMessage(chatId, `unlucky ${chats[chatId]}`, againOp)}
    })
}
start()