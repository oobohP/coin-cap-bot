const Discord = require('discord.js');
const { clearInterval } = require('timers');
const { prefix, token } = require('./config.json')

// Creates an instance of the discord client
const client = new Discord.Client();

// Ready Status
client.on('ready', () => {
    console.log(`Ready and Logged in as ${client.user.tag}!`);
})

// Shows users avatar and mentions them in the return.
client.on('message', message => {
    if (message.content === prefix + 'avatar') {
        message.reply(message.author.displayAvatarURL())
    }
});

// Coin Cap Notification Logic
function userList () {

    // User list of people wanting to be added
    var userList = [];

    // Create
    // Adds user to list replies to user
    client.on('message', message => {
        if (message.content === prefix + 'add') {
            message.reply('Added: ' + message.member.displayName + ' to the user list')
            userList.push(message.author)
        }
    })

    // Delete
    // Removes user from list replies to user
    client.on('message', message => {
        if (message.content === prefix + 'remove') {
            message.reply('removed: ' + message.member.displayName + ' from user list')
            userList.pop(message.author);
        }
    })

    // Read
    // Shows the user list sends to channel
    client.on('message', message => {
        if (message.content === prefix + 'show') {
            if (userList < 1) {
                message.channel.send(' Looks like theres no users on the list yet!')
            } else {
                message.channel.send(' Here is the current user list: ' + userList);
            }
        }
    })

    // Starts the notification process
    client.on('message', message => {
        if (message.content === prefix + 'start') {
            message.reply(' Coin Cap Bot Started')
            message.channel.send('ITS TIME TO CAP: ' + userList);
            interVal = setInterval(function() {
                message.channel.send('ITS TIME TO CAP: ' + userList);
            }, 7000)
        }

        // stops interval once user sends stop command
        if (message.content === prefix + 'stop') {
            message.reply(' Coin Cap Bot Stopped')
            try {
                clearInterval(interVal);
            } catch {
                console.log('No Interval Started');
            }
        }
    })
}

// Error Handling for Discord.js Client
client.on('error', (err) => {
    console.log(err.message);
})

// Coin Cap Logic
userList();

// Logs in with specified token
client.login(token);
