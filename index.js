const express = require('express')
const fs = require('fs')
const app = express()
const port =8000
const MESSAGES_PATH = './messages.txt'
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('static'))

app.use(express.json())

app.post('/messages', function (req, res) {
    console.log(req.body)
    fs.appendFile(MESSAGES_PATH, JSON.stringify(req.body) + '\n', err => {
        if (err) {
          console.log(err)
          res.statusCode = 500
          res.end('Message posted unsuccessfully')
          return
        }
        res.statusCode = 200
        res.end('Message posted successfully')
      })
  })

app.get('/messages', function (req, res) {
    console.log('got a GET req')
    fs.readFile(MESSAGES_PATH, (err, text) => {
        if (err) return console.log(err)
        const lines = text.toString().split('\n')
        const messages = lines.filter(line => line !== '').map(line => JSON.parse(line))
        res.json(messages)
      })
})

io.on('connection', (socket) => {
    console.log('A new chatter has joined the chat...')
    socket.on('chat message', (text, nick, room) => {
      io.emit('chat message', text, nick, room);
    })
    socket.on('disconnect', () => {
        console.log('A chatter has left the chat...');
    })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})