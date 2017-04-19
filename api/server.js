process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var WebAdmin = require('./app/models/WebAdmin');
var mongoose = require('./config/mongoose'),
    config   = require('./config/config'),
    express  = require('./config/express'),
    db       = mongoose(),

    app      = express(),
    cors     = require('cors');

app.listen(config.port);

// var Events = require('./app/models/Event');

// var event = new Events();
// event.name = "Name";
// event.description = "Event Description";
// event.location = "Cairo";
// event.capacity = "30";
// event.price = "100";
// event.repeated = "Once";
// event.business_id = "58f20e01b38dec5d920104f3";
// event.save();


var Businesses = require('./app/models/Business');

// var business = new Businesses();
// business.local.username = "Naaame";
// business.description = "Business Descriptions";
// business.area = "New Cairo";
// business.address = "S El-Teseen St, Building#311, 90th Street, New Cairo, New Cairo, Cairo Governorate 1996";
// business.phones = ["+201005467300", "2034857632"];
// business.email = "breakoutegypt.com.us";
// business.payment_methods = "Cash";
// business.name = "Breakout";
// business.category = "Category";
// business.local.password = business.generateHash("1234");
// business.merchant_ID = "58e58a2508c8ea1c74180847";
// business.average_rating = 3.5;
// business.save(function(err){
// if(err) throw err;
// });

// var business = new Businesses();
// business.local.username = "Naaaame";
// business.description = "Business Description";
// business.area = "New Cairo";
// business.address = "The Ring Road, Taha Hussein St. South of The Police Academy 5th District, New Cairo, Egypt,Cairo Festival City, Cairo 11511, Egypt";
// business.phones = ["+20 16593"];
// business.email = "kidzaniacairo.com";
// business.payment_methods = "Cash";
// business.name = "KidZania Cairo";
// business.category = "Category";
// business.local.password = business.generateHash("1234");
// business.merchant_ID = "58e5879af89eb11bf0484519";
// business.average_rating = 5.0;
// business.save(function(err){
// if(err) throw err;
// });


// var Users = require('./app/models/RegisteredUser');

// var user = new Users();
// user.address = "address";
// user.birthdate = "1996-06-27T00:00:00.000Z";
// user.email = "salma.ammar@gmail.com";
// user.gender = "Female";
// user.local.password = user.generateHash("123");
// user.local.username = "salma.ammar";
// user.name = "Salma Ammar";
// user.phone = "+(20)1118954678";
// user.subscriptions = ["58f6b2cea97a083153a0d256", "58f6b43f5f77f0316cec84b3"];
// user.save();




// var Bookings = require('./app/models/Booking');

// var booking = new Bookings();
// booking.booking_date = "2016-06-27T00:00:00.000Z";
// booking.count = 2;
// booking.booker = "58f626120e95ef2ac66449d8";
// booking.event_id = "58f6b682be76ba318a514eed";
// booking.save();


// var booking = new Bookings();
// booking.booking_date = "2017-03-07T00:00:00.000Z";
// booking.count = 1;
// booking.booker = "58f626120e95ef2ac66449d8";
// booking.event_id = "58f6b63b6de3b9318503d160";
// booking.save();


// var Events = require('./app/models/Event').Events;

// var event = new Events();
// event.name = "Jump Your Breath Out";
// event.description = "The massive technology conference Techweek references past attendees and sponsors to illustrate how popular and illustrious the event is. If you don’t have big names to reference you can include testimonials and reviews from past attendees to create the same effect. One study showed that 79% of customers trust online reviews as much as personal recommendationzz.";
// event.location = "Cairo";
// event.capacity = "30";
// event.price = "100";
// event.repeated = "Once";
// event.business_id = "58f6b2cea97a083153a0d256";
// event.save();



// var event = new Events();
// event.name = "See the World";
// event.description = "The massive technology conference Techweek references past attendees and sponsors to illustrate how popular and illustrious the event is. If you don’t have big names to reference you can include testimonials and reviews from past attendees to create the same effect. One study showed that 79% of customers trust online reviews as much as personal recommendationz.";
// event.location = "Cairo";
// event.capacity = "30";
// event.price = "200";
// event.repeated = "Once";
// event.business_id = "58f6b43f5f77f0316cec84b3";
// event.save();


    // day: Date,
    // time: String,
    // available: Number,
    // bookings : [{type: mongoose.Schema.Types.ObjectId,ref: 'Booking',default: [] }],
    // event : {type: mongoose.Schema.Types.ObjectId, ref:'Events'},
    // facility_id  :{type: mongoose.Schema.Types.ObjectId, ref:'Facility'}



//var EventOccurrences = require('./app/models/EventOccurrences');
// var EventOccurrences = require('./app/models/Event').EventOccurrences;
// var event_occ = new EventOccurrences();
// event_occ.day = "2017-05-13T00:00:00.000Z";
// event_occ.time = "5:00pm"
// event_occ.available = 25;
// event_occ.event = "58f6b63b6de3b9318503d160";
// event_occ.save();








// var Facility = require('./app/models/Facility');

// var facility = new Facility();
// facility.name = "room1";
// facility.description = "facility description";
// facility.capacity = "10";
// facility.business_id = "58f20e01b38dec5d920104f3";
// facility.save();



// var Business = require('./app/models/Business');

// var business = new Business();
// business.local.username = "habiiba";
// business.description = "Describe Me";
// business.area = "Lala Land";
// business.address = "Lala Land yemeen fi shemal";
// business.phones = "011";
// business.email = "habiiba.elghamry@gmail.com";
// business.payment_methods = "Cash";
// business.name = "Habiiba";
// business.category = "Arwash Haga";
// business.local.password = business.generateHash("123");
// business.save(function(err){
// if(err) throw err;
// });


module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.port);
