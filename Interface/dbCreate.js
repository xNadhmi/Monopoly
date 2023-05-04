
let mysql = require("mysql");
let con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: ""
});
con.connect(function(err) {
	if (err) throw err;
	dbName = "monopoly";
	console.log("MySQL: Connected");
	con.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, function(err, result) {
		if (err) throw err;
		console.log("MySQL: Database created");
	})
})