const {Messages} = require('./components')
// const {renderMessagaes} = require('./main')
const tape = require('tape')
const yo = require('yo-yo')

const body = document.querySelector('body')

const list = document.querySelector('#test-1')

tape('tests_messages', t => {
    const messages = [{
        nick: 'Blob',
        text: 'Hello. I like to cook.'
    },
    {
        nick: 'Blob',
        text: 'Mostly desserts.'
    }]
    // body.appendChild(Messages(messages))
    yo.update(list, Messages(messages))
    const message_elements = document.getElementsByClassName('message')
    console.log(message_elements)
    t.equal(message_elements.length, messages.length)
    t.end()
})

tape('tests_rooms', t => {
    const messages = [{
        nick: 'Blob',
        text: 'Hello. I like to cook.',
        room: 'Food'
    },
    {
        nick: 'Blob',
        text: 'Mostly desserts.',
        room: 'Food'
    },
    {
        nick: 'Sarah',
        text: 'Hello. I like to build houses.',
        room: 'Houses'
    },
    {
        nick: 'Sarah',
        text: 'Mostly huts.',
        room: 'Houses'
    }
    ]

    const rooms = ['Food', 'Houses']

    rooms.forEach(room => {
        // body.appendChild(Messages(messages.filter(message => message.room === room)))
        yo.update(list, Messages(messages.filter(message => message.room === room)))
        const message_elements = document.getElementsByClassName('message')
        const room_messages = messages.filter(message => message.room === room)

        for (let i=0; i<room_messages.length; i++){
            t.equal(message_elements[i].children[0].children[1].innerText, room_messages[i].text)
        }
    })
    t.end()

})

