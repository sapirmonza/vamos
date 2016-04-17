var express = require('express');
var request = require("request");
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({ type : "application/x-www-form-urlencoded", extended : false }));

app.get("/doc", function(req, res) {
	res.send(Object.keys(req));
});

app.post("/doc", function(req, res) {
	res.send(Object.keys(req));
});

function validateSignupReq(data) {
	var missingField;
	["form-first-name", "form-last-name", "form-email", "pwd1", "pwd2"].some(p => (data[p] ? false : missingField = p));
	if (missingField) return "missing field:" + missingField;
	if (data.pwd1 !== data.pwd2) return "mismatch password";
	if (data.pwd1.length < 6) return "short password";

	return;
}

app.post('/signup.html', function (req, res) {
	console.log("signup with body:" + JSON.stringify(req.body));
	var err = validateSignupReq(req.body);

	if (err) return res.send("Error occured:" + err);

	res.send("Yeah!! you successfully registered");
});

app.get('/moshe.json', function (req, res) {
	res.send('{a:1}');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
