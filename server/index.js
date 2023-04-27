const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {
    getMessages,
    createNewMessage
} = require('./controllers/newMessageController')

app.post(`/api/messages`, createNewMessage)

app.listen(4004, () => console.log(`running on 4004`))