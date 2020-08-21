const express = require('express')
const app = express()
const http = require('http').createServer(app)
// const http = require('http')
const io = require('socket.io')(http)

// app.get('/', function(req, res) {
//     res.end('Hello World!!')
//   })

// app.use(express.static('static'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html')
})

// io.on('connection', (socket) => {
//     console.log('A new chatter has joined the chat...')
//     socket.emit('message', 'You have joined the chat...')
//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//       })
//     socket.on('disconnect', () => {
//         console.log('A chatter has left the chat...');
//       })
//   })

// const server = http.listen(8000, function() {
//     console.log('listening on *:8000')
// });

io.on('connection', (socket) => {
    console.log('A new chatter has joined the chat...')
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    })
    socket.on('disconnect', () => {
        console.log('A chatter has left the chat...');
    })
})

http.listen(8000, () => {
  console.log('listening on *:8000')
})

