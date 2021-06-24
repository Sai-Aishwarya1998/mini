
const sendgrid = require('@sendgrid/mail');
const apikey = "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";

sendgrid.setApiKey(apikey);

const msg = {
    to : 'surajkotha2015@gmail.com',
    from : 'sujitthorve237@gmail.com',
    subject : "meeting invite",
    text : "hello"
}

sendgrid.send(msg).then(response=> console.log('email sent')).catch(err=> console.log(err.message));
