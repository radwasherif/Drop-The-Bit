var Business = require('../models/Business');
var Events = require('mongoose').model('Events');
var EventOccurrences   = require('mongoose').model('EventOccurrences');
var Booking = require('mongoose').model('Booking');
var Rating = require('mongoose').model('Rating');
var Facility = require('mongoose').model('Facility');
var async = require('async');


var BusinessController = {
      getBusiness: function (req, res) {
        var name = "Nourhan";
        // var id = req.params.id;
        Business.findOne({ name: name }).
            exec(function (err, result) {
                if (err)
                    console.log(err);
                else{
                    console.log(result);
//in case there is a user logged in
                    if(!result); //return error message business does not exist
                    Rating.findOne({user_ID: "58ed22fcbfe67363f0c3a41d" , business_ID: result._id}, function(err, rate) {
                      if(err) console.log("error in finding rate");
                      // if(!rate) //dont forget this return zero rating
                      else {

                        console.log(rate);
//condition if business exists exists
                        Facility.find({business_id:result._id}, function(err, facilities) {
                            if(err) console.log("error in finding facilities");
                            else {
                                console.log(facilities);

                                Events.find({business_id:result._id, repeated:"Once"}, function(err, onceevents) {
                                    if(err) console.log("error in finding once events");
                                    if(!onceevents) 
                                        if(!rate)  res.json({result:result, user:"58ed22fcbfe67363f0c3a41d",
                                            rate:0, facilities:facilities, events:[]});
                                            else
                                        res.json({result:result, user:"58ed22fcbfe67363f0c3a41d",
                                            rate:rate.rating, facilities:facilities, events:[]});
                                    else {
                                         if(!rate)  res.json({result:result, user:"58ed22fcbfe67363f0c3a41d",
                                            rate:0, facilities:facilities, events:[]});
                                            else
                                        res.json({result:result, user:"58ed22fcbfe67363f0c3a41d",
                                            rate:rate.rating, facilities:facilities, events:onceevents});
                                    }
                                });
                            }
                        });
                      }
                    })

                    // res.json({result:result, user:"58f09946fcefb434ea0d4e22"});
                    // res.render("", {business: result});
                }
            });

    },


    /* A business can request to be removed from the website.
    If the business has any bookings the request is rejected and a message is sent to the business specifying
    that the request was cancelled and that the business should cancel its bookings first.*/


requestRemoval: function(req,res) {
        // if(req.user && req.user instanceof Business){
        // var id = req.user.id;
        console.log('removal');
        var id = "58e666a20d04c180d969d591";
        Business.findByIdAndUpdate(id,{$set:{delete:1}}, function(err,business){
            if(err) res.status(500).json("error in request removal");
            else res.status(200).json("Requested!");
        });

     //    }

     //    else{
     //     console.log('You are not a logged in busiess');
     // }

    },

    /* A business can make his own page public (by changing the public flag)
    so that Business will now show up in searches and can be viewed by all users.*/
    makePagePublic: function (req, res) {
        // if (req.user && req.user instanceof Business) {
            // var businessId = req.user.id;
            console.log('public');
            var businessId = "58e666a20d04c180d969d591";
            Business.findByIdAndUpdate(businessId, { $set: { public: 1 } },
                function (err) {
                    if (err) {
                        res.send("error in making page public");
                    } else {
                        res.send("done");
                    }
                });
        // } else res.send("you must be a logged in business");
    },

    /* A business can edit its personal infromation.*/


    editInformation: function (req, res) {

        // if (req.user && req.user instanceof Business) {
            var id = "58e666a20d04c180d969d591";
            console.log("ana fl backend");
            console.log(req.file);
            Business.findById(id, function (err, business) {
                if (err) res.send(err.message);
                else if (!business) res.send('Something went wrong');
                else {
                    if (typeof req.body.description != "undefined" && req.body.description.length > 0) {
                        business.description = req.body.description;
                    }

                    if (typeof req.body.location != "undefined" && req.body.location.length > 0) {
                        business.location = req.body.location;
                    }
                    if (typeof req.body.email != "undefined" && req.body.email.length > 0) {
                        business.email = req.body.email;
                    }

                    if (typeof req.body.address != "undefined" && req.body.address.length > 0) {
                        business.address = req.body.address;
                    }
                    if (typeof req.body.area != "undefined" && req.body.area.length > 0) {
                        business.area = req.body.area;
                    }
                    if (typeof req.body.phones != "undefined" && req.body.phones.length > 0) {
                        var found = false;
                        //check if phone already added
                        for (var i = 0; i < business.phones.length; i++) {
                            if (business.phones[i] == req.body.phones) {
                                found = true;
                                break;
                            }
                        }
                        if (!found)
                            business.phones.push(req.body.phones);
                    }
                    if (typeof req.body.payment_methods != "undefined" && req.body.payment_methods.length > 0) {
                        business.payment_methods.push(req.body.payment_methods);
                    }

                    if(typeof req.file != "undefined") {
                      business.images.push(req.file.filename);
                    }

                    business.save();
                    res.json({business:business});
                    // res.sendFile('/business/b');

                }

            });

        // }

        // else {
        //     res.send('You are not a logged in business');
        // }
    },

    /* A business can request to delete a phone number. If this is business' only phone number then it will
    not be deleted and the business will receive a message. If the business has other phone numbers then this
    one can be deleted. If the business entered a wrong phone number a message is sent to the business
    saying that the phone number was not found.*/
    deletePhone: function (req, res) {
        // if (req.user && req.user instanceof Business) {
            if (typeof req.params.phone != "undefined") {
                // var id = req.user.id;
                var id = "58e666a20d04c180d969d591";
                console.log("ana fl backend delete phone");
                var phone = req.params.phone;
                Business.findOne({ _id: id }, function (err, business) {
                    if (err) res.send('couldnt find a business');
                    else if (!business) res.send('Something went wrong');
                    else {
                        if (business.phones.length < 2)
                            res.send('Must have at least one phone number');
                        else {
                            var check = 0;
                            for (var i = 0; i < business.phones.length && check == 0; i++) {

                                if (business.phones[i] == phone) {
                                    check = 1;
                                }
                            }
                            if (check) {
                                Business.findByIdAndUpdate(id, { $pull: { "phones": phone } }, function (err, info) {
                                    if (err) res.send('Could not delete');
                                    if (!info) res.send('Something went wrong');
                                    else{ res.send('phone deleted'); console.log("phone deleted");}
                                });
                            }
                            else {
                                res.send('Phone not found!')
                            }

                        }

                    }

                });
            }
            else res.send('Enter a phone numebr to be deleted');
        // }

        // else {
            // res.send('You are not a logged in business');
        // }

    },

    /* A business can request to delete a payment method. If this is business' only payment method then it will
    not be deleted and the business will receive a message. If the business has other payment methods then this
    one can be deleted. If the business entered a wrong payment method a message is sent to the business
    saying that the payment method was not found.*/

    deletePaymentMethod: function (req, res) {
        // if (req.user && req.user instanceof Business) {
            if (typeof req.params.method != "undefined") {
                // var id = req.user.id;
                var id = "58e666a20d04c180d969d591";
                var payment = req.params.method;
                console.log("ana fl backend delete method");
                Business.findOne({ _id: id }, function (err, business) {
                    if (err) res.send('couldnt find a business');
                    else if (!business) res.send('Something went wrong');
                    else {
                        if (business.payment_methods.length < 2)
                            res.send('Must have at least one payment method');
                        else {
                            var check = 0;
                            for (var i = 0; i < business.payment_methods.length && check == 0; i++) {

                                if (business.payment_methods[i] == payment) {
                                    check = 1;
                                }
                            }

                            if (check) {
                                Business.findByIdAndUpdate(id, { $pull: { "payment_methods": payment } }, function (err, info) {
                                    if (err) res.send('Could not delete');
                                    if (!info) res.send('Something went wrong');
                                    else {res.send('payment method deleted'); console.log("payment method deleted");}
                                });

                            }
                            else {
                                res.send('Payment Method not found!');
                            }

                        }
                    }
                });

            }
            else {
                res.send('Enter a payment method to be deleted');
            }
        // }
        // else {
            // res.send('You are not a logged in business');
        // }

    },

    deleteImage: function(req, res) {
      // if(req.user && req.user instanceof business) {
        // var id = req.user._id;
        var id = "58e666a20d04c180d969d591";
        console.log("ana fl backend delete image");
        var image = req.params.image;

        Business.findByIdAndUpdate(id, {$pull: {"images" : image}},{safe:true, upsert: true, new:true},
        function(err, newBusiness) {
          if(err) {
            console.log("error in deleting image");
          } else {
            console.log("image deleted");
            console.log(newBusiness);
          }
        });
      // }
    // }
      // }
    },


    hasBookings: function(req, res)
    {
        // if(req.user && req.user instanceof business)
        // {
            // var id = req.user._id;
            var id = "58f0cb2d6bfb6061efd66625";
            Booking.find({}, function(err, bookings)
            {
             if(err) res.status(500).json(err.message);
             if(!bookings || bookings == undefined || bookings.length == 0)
                res.status(200).json(0);
             else
                res.status(200).json(1);   
            });
        // }
        // else
        // {
        //     res.status(401).json("YOU ARE NOT AUTHORIZED");
        // }
    },

    getAllBookings: function(req, res)
    {
        // if(req.user && req.user instanceof business)
        // {
            // var id = req.user.id;
               
                var id = "58f0cb2d6bfb6061efd66625";
                var all_bookings = [];
                var i = 0;
                console.log("sdsd");
                EventOccurrences.find({}, function(err,occs){
                    if(err) return res.status(500).json(err.message);
                    console.log("HIIIIIIIIIIII " +occs);
                    async.each(occs, function(occ, callback)
                    {
                        console.log("yalla b2a");
                        async.each(occ.bookings, function(booking, cb)
                        {
                            console.log("fsfsf");
                            Booking.findById(booking, function(err, book)
                            {
                                if(err) return res.status(500).json(err.message);
                                // console.log("halllooooo "+book);
                                all_bookings.push(book);
                                console.log("all bookings "+all_bookings[i++]);
                            });
                            console.log("all bookings1 "+all_bookings[0]);
                            cb();
                        }, function(err){
                            console.log("all bookings2 "+all_bookings[0]);
                            // if(err) return res.status(500).json("Something went wrong");
                            // return res.status(200).json(all_bookings);
                        });
                        callback(); 
                    }, function(err){
                            console.log("all bookings3 "+all_bookings[0]);
                            if(err) return res.status(500).json("Something went wrong");
                            return res.status(200).json(all_bookings);
                    });

                });
            
            
        // }
        // else res.status(401).json("YOU ARE NOT AUTHORIZED");

    },

getFacilityOccs: function(req, res)
{
    // if(req.user && req.user instanceof business)
    // {
            // var id = req.user.id; 
            var id = "58f0cb2d6bfb6061efd66625";
            var facility_id = req.params.facility;
            EventOccurrences.find({"facility_id": facility_id}, function(err, occs)
            {
                console.log(occs);
                if(err) return res.status(500).json(err.message);
                return res.status(200).json(occs);
            });
     // }
    // else res.status(401).json("YOU ARE NOT AUTHORIZED");

},

getEventOccs: function(req, res)
{
     // if(req.user && req.user instanceof business)
    // {
            // var id = req.user.id; 
            var id = "58f0cb2d6bfb6061efd66625";
            var event_id = req.params.event;
            EventOccurrences.find({"event": event_id}, function(err, occs)
            {
                if(err) return res.status(500).json(err.message);
                console.log("event occs in node");
                return res.status(200).json(occs);
            });

     // }
    // else res.status(401).json("YOU ARE NOT AUTHORIZED");
},

getBooking: function(req, res)
{
    // if(req.user && req.user instanceof business)
    // {
            // var id = req.user.id; 
            var id = "58f0cb2d6bfb6061efd66625";
            var booking_id = req.params.booking;
// <<<<<<< HEAD
//             console.log(booking_id);
//             Booking.findOne({"business_id": id, "_id": booking_id}, function(err, booking)
//             {
//                 if(err || !booking || booking == 'undefined') return res.status(500).json("error");
// =======
            Booking.findOne({"_id": booking_id}, function(err, booking)
            {
                console.log(booking);
                if(err) return res.status(500).json(err.message);
                return res.status(200).json(booking);
            });

     // }
    // else res.status(401).json("YOU ARE NOT AUTHORIZED");
}





}



module.exports = BusinessController;
