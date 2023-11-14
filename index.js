const express = require('express');
const path = require('path');
const app = express();
const port = 8000;


//express specific stuff
app.use('/static', express.static('static'))   //this enables serving static files
app.use(express.urlencoded())


//pug releated stuff setting it to use pug
app.set('view engine','pug')   //sets view engine to pug
app.set('views', path.join(__dirname,'views'))  //access pug file from folder views


//end points
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
});
app.get("/contact", (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug', params);
});
app.get("/about", (req, res)=>{ 
    const params = {}
    res.status(200).render('about.pug', params);
});
app.get("/classinfo", (req, res)=>{ 
    const params = {}
    res.status(200).render('classinfo.pug', params);
});



//MONGOOSE INTEGRATION


//get mongoose for data (folder named contactDetails will be created)
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/contactDetails', {useNewUrlParser:true},{useUnifiedTopology: true });
const bodyparser = require('body-parser');

//define Schema for contact details
var contactSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    phone : String,
    email : String
});
//model it
var Contact = mongoose.model('Contacts', contactSchema);

//save the data to db
app.post('/contact', (req,res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the db")
    }).catch(()=>{
        res.status(400).send("Could not save gomen :( ")
    })
});

//find saved items
Contact.find({}, function(err,person){                //insdie {} we can add name:whatever to find the specific object
    if (err) return console.error(err);
    console.log(person);
});



//START THE SERVER
app.listen(port,()=>{
    console.log(`App started on ${port} port!`)
});