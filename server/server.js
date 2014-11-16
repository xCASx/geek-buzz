var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

// app.use(express.compress());

app.use(express.static('../dist'));

app.get('/:fileName', function(req, res){
	fs.readFile(req.param("fileName") + '.json', {encoding: 'utf-8'}, function(err,data) {
	    if (!err) {
		    res.set({ 'content-type': 'application/json; charset=utf-8' })
			res.write(data);
		    res.end();
	    } else {
	        console.log(err);
	    }    
	});
});

app.listen(3000);
