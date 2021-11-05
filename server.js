// use node exprgess
const express = require("express");
const app = express();
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

const sql = require('mssql')

app.listen(3000, function(){
	console.log("server is listen on port 3000.");
});

var config; //configuration for mssql (global variable)
var qry;	//qry to get data from mssql (global variable)


//get data from mssql
async function getdata(qry) {
	try {
		let pool = await sql.connect(config);
		let result = await pool.request().query(qry);
		await pool.close();
		return JSON.stringify(result)
	} catch (error) {
		console.log(error.message);
		return error.message
	}
};

//get home page
app.get("/", function (req, res) {
	res.sendFile(__dirname+"/index.html")
});

//try to log into ms sql
app.post("/login", function (req, res) {
	config = {
		user: req.body.username,
		password: req.body.password,
		server: 'localhost',
		database: 'qlHD',
		port: 1433,
		options: {
			trustServerCertificate: true // change to true for local dev / self-signed certs
		}
	}
	var promise_connect=new Promise(function(resolve,reject){
		try{resolve(pool = new sql.connect(config))}
		catch{reject('error')}
	})
	promise_connect
	.then(function(data){ 
		// console.log(data);
		res.send('0');
	})
	.catch(function(data){
		// console.log(data); 
		res.send(data)
	})
});

//log out from mssql
app.get("/logout",function(req,res){
	config = {
		user: "",
		password: "",
		server: 'localhost',
		database: 'qlHD',
		port: 1433,
		options: {
			trustServerCertificate: true // change to true for local dev / self-signed certs
		}
	}

	res.sendFile(__dirname+"/index.html")
})


