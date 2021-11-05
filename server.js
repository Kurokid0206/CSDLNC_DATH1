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

