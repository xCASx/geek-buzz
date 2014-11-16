var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/geek-buzz');

var contentSchema = mongoose.Schema({
    id: Number,
    video: String,
    title: String,
    tags: [String],
    rating: Number,
    language: String,
    event: String,
    city: String,
    date: String,
    description: String
});

var Doc = mongoose.model('Content', contentSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    Doc.remove({}, function(err) {
        console.log('collection removed')
    });

    fs.readFile('data.json', {encoding: 'utf-8'}, function(err, data) {
        if (!err) {
            var doc = new Doc(JSON.parse(data));
            doc.save();
        } else {
            console.log(err);
        }
    });
});

// app.use(express.compress());

app.use(express.static('../dist'));

app.get('/v/:id', function(req, res){
    var id = req.param("id");
    Doc.find({ id: id }, function(err, data) {
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.write(JSON.stringify(data[0]));
        res.end();
	});
});

app.listen(3000);
