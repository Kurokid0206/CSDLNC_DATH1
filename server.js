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

//insert new bill to database
app.post("/insert-bill", function (req, res) {
	var maHD = req.body.maHD
    var maKH = req.body.maKH
    var NgayLap =req.body.NgayLap
	qry=`INSERT INTO HoaDon (MaHD,MaKH,NgayLap) VALUES ('${maHD}','${maKH}','${NgayLap}')`

  var promise_getdata=new Promise(function(resolve,reject){
    try{resolve(getdata(qry))}
    catch{reject('error')}
  })
	promise_getdata
	.then(function(data){
		try{
			var rows=JSON.parse(data).rowsAffected[0];
			res.send('Thêm thành công')
		}
		catch{
			res.send('Thêm thất bại! Thông tin lỗi: '+data)
		}
	})
	.catch(	function(data){res.send(data);})
});
//insert new bill-detail to database
app.post("/insert-bill-detail", function (req, res) {
	var maHD = req.body.maHD
    var maSP = req.body.maSP
    var soluong =req.body.soluong
	var giaban = req.body.giaban
	var giagiam =req.body.giagiam

	// console.log(req.body)

	qry=`INSERT INTO CT_HoaDon (MaHD,MaSP,SoLuong,GiaBan,GiaGiam) 
	VALUES ('${maHD}','${maSP}',${soluong},${giaban},${giagiam})`

  var promise_getdata=new Promise(function(resolve,reject){
    try{resolve(getdata(qry))}
    catch{reject('error')}
  })
	promise_getdata
	.then(function(data){
		try{
			var rows=JSON.parse(data).rowsAffected[0];
			res.send('Thêm thành công')
		}
		catch{
			res.send('Thêm thất bại! Thông tin lỗi: '+data)
		}
	})
	.catch(	function(data){res.send(data);})
});



