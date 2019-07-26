const request = require('request');

module.exports = function sendGenericTemplate(recipientId, respBody) {
    console.log(respBody);
    const messageValue = [];
    for (let i = 0; i < respBody.length; i++) {
        let obj = {
            "title":respBody[i].message_title,
            "contact_id": respBody[i].contact_id,
            "text": respBody[i].text,
        }
        messageValue.push(obj);
    }
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": messageValue
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
            method: 'POST',
            json: {
                recipient: {id: recipientId},
                message: messageData,
            }
    }, function(error, response, body){
        if (error) {
            console.log("Error sending message: " + response.error)
        }
    })
}

//Accept POST request at /webhook endpoints
app.post('/webhook', (res, req) => {
    res.status(200).send ('EVENT_RECIEVED');

    const body = req.body;

    if (body.object ==== 'page') {
        
 }
});