let express = require('express');
let app = express();
let nodemailer = require('nodemailer');
app.use(express.json());
const path = require('path');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

var transporter=nodemailer.createTransport({
  service : "gmail",
 
auth: {
  user: "backendteam123456@gmail.com",
  pass: "backend@123" 
}
});

app.post('/access',(req,res,next)=>{

var from = req.body.from;
var to = req.body.to;
var subject = req.body.subject;
var text = req.body.text;



 console.log(from);
  var mail = {
    from: from, 
    to: to, 
    subject: subject,
    text:text,
 
  }
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
       status: 'success'
      })
    }
  })
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages!");
    }
})

})

  const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.info(`server has started on ${PORT}`))
  