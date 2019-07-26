const request = require('request');
const senderAction = require('../templates/senderAction');
const sendMessage = require('../templates/sendMessage');

 module.exports = function processPostback(event) {
     const senderID = event.sender.id;
     const payload = event.postback.payload;

     if (payload === 'WELCOME') {
        request({
            url: "https://graph.facebook.com/v2.6/${user_id}?fields=first_name,last_name,profile_pic" + senderID,
            qs: {
                access_token: process.env.PAGE_ACCESS_TOKEN,
                
            },
            method: "GET"
        }, function(error, response, body) {
            let greeting = 'Hello';
            if (error) {
                console.error("Error getting user name: " + error);
            } else {
                let bodyObject = JSON.parse(body);
                console.log(bodyObject);
                name = bodyObject.first_name + bodyObject.last_name + bodyObject.profile_pic;
                greeting = "Hello " + name  + ". ";
            }
            let message = greeting + "Welcome to Talkliftbot. Hope you are doing good today";
            let message2 = "How can I assist you?"
            let message3 = "please type in which services you would like: We offer business automation using chatbots";
            senderAction(senderID);
            sendMessage(senderID, {text: message}).then(() => {
                sendMessage(senderID, { text: message2 }).then(() => {
                    sendMessage(senderID, {  text: message3}).then(() => {
                        sendMessage(senderID, { text: '🎈' });
                    })
                });
            });
        });
     }
 }