const express = require('express');
const path = require('path');
const port = 8500;

// database (mongoDB)
const db = require('./config/mongoose');

const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());  //middleware (coverting to key:value pairs (req.body)
app.use(express.static('assets'));  //for CSS

// //middleware 1:
// app.use(function(req, res, next){
//     console.log("Middleware 1 is called!");
//     next();
// });

// //middleware 2:
// app.use(function(req, res, next){
//     console.log("Middleware 2 is called!");
//     next();
// });

var contactList = [
    {
        name: 'Daksh',
        phone: '9988776655'
    },
    {
        name: 'Tony Stark',
        phone: '9876543210'
    },
    {
        name: 'CodingNinjas',
        phone: '9192939495'
    }
];


app.get('/', function(req, res){
    // console.log(__dirname);

    Contact.find({}, function(err, contacts){
        if(err){
            console.log("Error in fetching contacts from database.");
            return;
        }
        return res.render('home', { 
            title: "My Contact List",
            contact_list: contacts
        });
    });

    // return res.render('home', { 
    //     title: "My Contact List",
    //     contact_list: contactList
    // });
});

// app.get('/practice', function(req, res){
//     return res.render('practice', { 
//         title: "Let us Play with EJS." 
//     });
// });

app.post('/create-contact', function(req, res){

    // console.log(req.body.name);
    // console.log(req.body.phone);

    // console.log(req.body);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log("Error in creating a contact.");
            return;
        }
        console.log('New Contact ==>', newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
    // return res.redirect('back');

});

// // Through Params:
// app.get('/delete-contact/:phone', function(req, res){
//     console.log(req.params);
//     let phone = req.params.phone;
// 
//      .....
// 
// });

// Through Query:
app.get('/delete-contact/', function(req, res){
    // console.log(req.query);

    /* Without using database: */
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
    // }
    // return res.redirect('back');

    /* Using database: */

    // get the id from the url
    let id = req.query.id;

    // find the contact in the database using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log("Error in deleting an object from database.");
            return;
        }
        return res.redirect('back');
    });

});

// Server:
app.listen(port, function(err){
    if(err){
        console.log("Error in setting up the express server!");
    }
    console.log("Express server is up and running!");
});