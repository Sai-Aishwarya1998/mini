const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
let nodemailer = require('nodemailer');
const path = require('path');
////////////////////////
// parse application/json
app.use(express.json());
app.use(cors());
//Create Database Connection
const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "meetingroombooking",
});

// connect to database
conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

// creat a new Record
// app.post("/api/create", (req, res) => {      ///// booking 
// 	let data = { Id: req.body.id, City: req.body.city, Campus: req.body.campus, HallName: req.body.name };
// 	let sql = "INSERT INTO bookinghalls SET ?";
// 	let query = conn.query(sql, data, (err, result) => {
// 		if (err) throw err;
// 		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
// 	});
// });
app.get("/api/view", (req, res) => {     ///  check availibility   city campus and name
	let sql = "SELECT * FROM bookinghalls";      // let sql = "SELECT id FROM hall details where city = "+ params.city ";    
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
        
		res.send(JSON.stringify({ status: 200, error: null, response: result }));  /// id 
	});
});



app.post("/api/create", (req, res) => {  
	const city = req.body.city;
	const campus = req.body.campus;
	const hall =req.body.hallName;
	const from =req.body.Intime;
	const to =req.body.Outtime;
	const date =req.body.date;
	conn.query(
		"insert into bookings (Id,Date,CheckIn,CheckOut) values ((select id from halldetails where City = ? and Campus=? and HallName=?),?,?,?) ",    // 
		[city , campus, hall,date,from,to],
		(err) => {
			if(err){
				res.send({err : err});
			}
			else
			{
				res.send({message : "Record added"});
			}

		}

	);
});


app.get("/api/getcities", (req, res) => {  
	
	conn.query(
		"select * from bookings",    // 
		
		(err,result) => {
			if(err){
				res.send({err : err});
			}
			else if(result)
			{
				res.send(result);
			}
			

		}

	);
});



app.post("/api/checkav", (req, res) => {  
	const city = req.body.city;
	const rooms = req.body.rooms;
	const date = req.body.date;
	const campus = req.body.campus;
    const Intime = req.body.Intime;
	const Outtime = req.body.Outtime;

	//const id ='';
    console.log(city, campus,rooms,Intime,Outtime,Intime,Outtime,date);
	conn.query(
		"select id from bookings where ( Id =(select id from halldetails where City = ? and Campus=? and HallName=?) AND Date= ? AND (((CheckIn between ? and ?) OR(CheckOut between ? and ?))))",
		[city, campus,rooms,date,Intime,Outtime,Intime,Outtime],
		(err,result) => {
			if(err){
				res.send({err : err});
			}
			//console.log(err)
			if(result.length > 0)   // booked 
			{
			    res.send(JSON.stringify({result }));
				//id = result[0].id ;
                console.log(JSON.stringify({result }));
			}
			else 
			{
				res.send({message: "Not Found" });
				
			}

		}
       
         
	);
});





app.listen(8082,()=>{
	console.log('app running at 8082')
})


app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/api");
	res.header(
	  "Access-Control-Allow-Headers",
	  "Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
  });
  app.use('/public', express.static(path.join(__dirname, 'public')));

  var transporter=nodemailer.createTransport({
	service : "gmail",
   
  auth: {
	user: "backendteam123456@gmail.com",
	pass: "backend@123" 
  }
  });
  
  app.post('/api/access',(req,res,next)=>{
  
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









// booking

// id    

// end 
// date 
// 10-11






