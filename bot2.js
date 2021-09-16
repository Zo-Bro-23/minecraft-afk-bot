const mc = require('minecraft-protocol')
let lastPos = {
    x: 0,
    y: 0,
    z: 0
}

// Update this variable to your connection options

let client = mc.createClient({
    host: 'mc.zohan.ninja',
    port: '62457',
    username: 'AFK_Bot2',
    version: '1.17.1'
})

// Used for respawning the bot when killed

client.on('death_combat_event', () => {
    client.write('client_command', { payload: 0 })
})

// Used to prevent bot from getting kicked when inactive

client.on('login', () => {
    notInactive(200000, 1)
    client.write('client_command', { payload: 0 })
    // client.write('chat', {
    //     message: '/tp ZoBro23'
    // })
    // client.write('chat', {
    //     message: '/spawnpoint'
    // })

    // Used to teleport the bot to the location you want it to be in
})

// client.on('chat', (message) => {
//     console.log(message)
// })

// Used for debugging chat related issues

function notInactive(time = 200000, number = 2) {

    // Moves the bot every 'time' seconds

    client.write('position', {
        x: lastPos.x + number,
        y: lastPos.y,
        z: lastPos.z,
        onGround: true
    })

    // Messages the other bot to ensure double security against getting kicked for inactiveness

    client.write('chat', {
        message: '/msg AFK_Bot1 How r u?'
    })

    setTimeout(notInactive, time, Math.random() * time, -number)
}

// Used to prevent the application from crashing in the case of a server error

client.on('error', (err) => {
    console.log('Error:', err)
    client.end('Error occured, right?')
    client = mc.createClient({
        host: 'mc.zohan.ninja',
        port: '62457',
        username: 'AFK_Bot2',
        version: '1.17.1'
    })
})

// Rejoins when kicked

client.on('end', (msg) => {
    console.log('Connection ended: ', msg)
    client = mc.createClient({
        host: 'mc.zohan.ninja',
        port: '62457',
        username: 'AFK_Bot2',
        version: '1.17.1'
    })
})

// client.on('packet', (packet) => {
//     console.log(packet)
// })

// Used for debugging packet related issues

// Confirms any movement

client.on('position', (position) => {
    client.write('teleport_confirm', {
        teleportId: position.teleportId
    })
    lastPos.x = position.x
    lastPos.y = position.y
    lastPos.z = position.z
})