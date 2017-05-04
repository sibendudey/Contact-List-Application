var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db= mongojs('contactList' , ['contactList'	]);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactList", function(request , response)	{
	console.log("I recieved a get request");
	
	db.contactList.find( function( err , docs)	{
		console.log(docs);
		response.json(docs);
	});
	
app.post("/contactList" , function( req , resp)	{
	console.log(req.body);
	db.contactList.insert(req.body , function( err , docs)	{
		resp.json(docs);
	})
});

app.delete("/contactList/:id" , function( req , response)	{
	var id = req.params.id;
	console.log(id);
	db.contactList.remove( {_id : mongojs.ObjectId(id)}, function(err , docs)	{
		response.json(docs);
	});
});
	/*person1 = {
		name: 'Sibendu',
		email: 'sibendu.dey@gmail.com',
		number: '+918971044680'
	};
	
	person2 = {
		name: 'Sibu',
		email: 'sibendu.dey@gmail.com',
		number: '+918904392904'
	};
	
	var contactList = [person1 , person2];
	response.json(contactList);*/
	
});

app.get("/contactList/:id" , function( req , res)	{
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)} , function( err, docs)	{
			res.json(docs);
	})
});

app.put("/contactList/:id" , function( req , res)	{
	var id = req.params.id;
	console.log(req.body.name);
	db.contactList.findAndModify({query: {_id : mongojs.ObjectId(id)}, 
	update: {$set: {name: req.body.name , email: req.body.email ,
	number: req.body.number}}, new: true} , function(err , docs)	{
		res.json(docs);
	});
});

app.listen(3000);
console.log("Server running in port 3000");