const Discord = require('discord.js')
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

    // Adds user to list
    client.on('message', message => {
        if (message.content === prefix + 'add') {
            message.reply('Added: ' + message.member.displayName + ' to the user list')
            userList.push(message.author)
        }
    })

    // Removes user from list
    client.on('message', message => {
        if (message.content === prefix + 'remove') {
            message.reply('removed: ' + message.member.displayName + ' from user list')
            userList.pop(message.author);
        }
    })

    // Shows the user list
    client.on('message', message => {
        if (message.content === prefix + 'show') {
            if (userList < 1) {
                message.reply(' Looks like theres no users on the list yet!')
            } else {
                message.reply(' Here is the current user list: ' + userList);
            }
        }
    })

    // Starts the notification process
    client.on('message', message => {
        if (message.content === prefix + 'start') {
            message.reply(' Coin Cap Bot Started')
            setInterval(function() {
                message.reply('ITS TIME TO CAP: ' + userList);
            }, 1800000)
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
