
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const corsOptions = {
	origin: "*",
	credentials: true,
	optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(
	express.urlencoded({extended: true})
);

app.listen(port, () => {
	console.log(`App is listening at http://localhost:${port}`);
});

var server = app.listen(8081, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("App server is listening at http://%s:%s", host, port);
});

app.get("/", function(req, res) {
	res.send("Hello World");
});

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({message: err.message});
	return;
});

app.use(express.static("public"));