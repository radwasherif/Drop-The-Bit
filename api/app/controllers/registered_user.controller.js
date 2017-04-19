var mongoose = require('mongoose');
var User = mongoose.model('RegisteredUser');
var Booking = mongoose.model('Booking');
var Event = mongoose.model('Events');
var EventOccurrence = mongoose.model('EventOccurrences');
var Business = mongoose.model('Business');
var Rating = mongoose.model('Rating');




exports.getUserDetails =  function (req, res) {
        var user_id = req.params.id;

	    User.findById(user_id, function(err, user) {
	        if(err) 
	        	console.log("error in finding user");
	        else {
	        	console.log(user);
	        	res.json({user:user});
	        }
	    });
}


exports.getBookingDetails =  function (req, res) {
        var user_id = "58f7bf25a609f6396ec3d286";
        var booking_id = req.params.booking;
        console.log("This is the booking id in user controller :"+ booking_id);

	    Booking.findById(booking_id, function(err, booking) {
	        if(err) 
	        	console.log("error in finding booking");
	        else {
	        	console.log("This is booking in node "+ booking);
	        	if(booking) {
	        		EventOccurrence.findById(booking.event_id, function(err, eventocc) {
	        			if(err)
	        				console.log("error in finding event occurrence");
	        			else {
	        				if(eventocc) {
	        					Event.findById(eventocc.event, function(err, event) {
	        						if(err)
	        							console.log("error in finding event");
	        						else {
			    						if(event) {
				        					Business.findById(event.business_id, function(err, business) {
				        						if(err)
				        							console.log("error in finding business");
				        						else {
				        							// console.log(booking); 
				        							// console.log(eventocc); 
				        							res.json({booking: booking, eventocc: eventocc, event: event, business: business});
				        						}
				        					});	 	        							
	        							}
	    
	        						}
       						
	        					});

	        				}
	        			}
	        		});
	        	}
	        }
	    });
}



exports.getSubscribedBusiness =  function (req, res) {
        var user_id = "58f7bf25a609f6396ec3d286";
        var business_id = req.params.business_id;

		Business.findById(business_id, function(err, business) {
			if(err)
				console.log("error in finding business subscription");
			else {
				console.log("This is business in node subscriptions "+ business);
				res.json({business: business});
			}
		});	 	        							
	
}






exports.subscribe = function(req,res)
{
	// if(req.user && req.user instanceof User) {
		var userID = "58f7bf25a609f6396ec3d286";
		var businessID = req.params.id;
		var subscribed_business;
		console.log("business sub");
		User.findOne({_id: userID}, function(err, user_found)
		{
			if(err) {
				res.send("Error in findOne() of subscribe-user");
				return;

			}


			Business.findByIdAndUpdate(businessID,{$push: {"subscribers" : user_found}},{safe: true, upsert: true, new : true},
			function(err, business)
			{
				if(err)
					res.send("Something went wrong. Please try again.");
				else {
					if (user_found) {
						var check = 0;
						for(var i = 0; i < user_found.subscriptions.length; i++)
						{
							if(user_found.subscriptions[i] == businessID)
								check = 1;
						}

						if(check == 1)
							return res.send("Already subscribed");
						else
						{
							user_found.subscriptions.push(business);
							user_found.save();
							return res.send("business has been added to subscriptions.");
						}

				}
			}
		 });
		});
	// }
	// else {
	// 	res.redirect('/auth/login');
 //    }
}


exports.unsubscribe = function(req,res)
{
	// if(req.user && req.user instanceof User) {
		// var userID = req.user.id;
		var userID = "58f7bf25a609f6396ec3d286";
	    var businessID = req.params.id;
	    var subscribed_business;
			console.log("business unsub");
	    User.findOne({_id: userID}, function(err, user_found)
	    {
			if(err) {
				res.send("Error in findOne() of unsubscribe-user");
				return;
			}

			var check = 0;
			for(var i = 0; i < user_found.subscriptions.length; i++)
			{
				if(user_found.subscriptions[i] == businessID)
					check = 1;
			}
			if(check == 1)
			{
				Business.findOne({_id: businessID}, function(err, business)
				{
						if(err || !business) {
						res.send("Error in finding business.");
						return;
					}

					if (user_found) {
						business.subscribers.pull(user_found);
						business.save();
						user_found.subscriptions.pull(business);
						user_found.save();
						res.send("business has been removed from subscriptions.");
						return;
					}
					else {
						res.send("User is not found.");
						return;
					}

				});
			}
			else {
				return res.send("Not subscribed");
			}




	    });
	// }
	// else {
		// res.redirect('/auth/login');
	// }
}


exports.addRating = function(req, res)
{

	//  if(req.user && req.user instanceof User) {
		 var userID = "58f7bf25a609f6396ec3d286";
		// var userID = req.user.id;              // from passport session; changed to body temporarily for testing
	    var businessID = req.params.bid;        // from url parameters; changed from param to body

	    var rating2 = req.params.rate;		   // from post body
			console.log("entered addRating");
	    var rating_query = {user_ID: userID, business_ID: businessID};

	    Rating.findOne(rating_query, function(err, previous_rating)
	    {
	    	if(err) {
	    		res.send("Error in finding rating");
	    		return;
	    	}

	    	if (previous_rating) {
					console.log("previous_rating");
	    		previous_rating.rating = rating2;
					previous_rating.save();
	    	}

	    	else {
	    		var rating1 = new Rating(
				  {
						user_ID: userID,
						business_ID: businessID,
					  rating: rating2
				  });

					rating1.save();
	    	}

	    	module.exports.average_rating(req,res);


	    });
	// }
	// else {
		// 	res.redirect('/auth/login');
    // }
};

exports.average_rating = function(req,res)
{
	console.log("entered average_rating");
    var businessID = req.params.bid;
		// var businessID = "58e666a20d04c180d969d591";


	Rating.find({business_ID:businessID}, function(err,ratings) { //this exists mainly to postpone the function
		Rating.aggregate([{$group: {_id : '$business_ID', average: {$avg: '$rating'}}}],
        function (err, result) {
			if(err)
				{
					res.send("Error. Please retry.");
					return;
				}
			else {
				Business.findByIdAndUpdate(businessID,{$set:{average_rating:result[0].average}},function(err, business){
					if(err)
					{
						return res.send("Error. Please return to previous page.");
					}
					else
					{
						Business.findOne({_id:businessID}, function(err, updatedBusiness) {
							if(err) console.log("error");
							else {
								console.log(updatedBusiness.average_rating);
								return res.json({average_rating:updatedBusiness.average_rating });
							}
						})
					}
				});
			}
		});
	 })
}


exports.customize = function(req,res)
{
	if(req.user && req.user instanceof User)
	{
		// return res.send("Bookings: " +  user_found.bookings + "\n Subscriptions: "  + user_found.subscriptions);
		return res.render('user_profile.ejs', {
        user : req.user, bookings: req.user.bookings, subscriptions: req.user.subscriptions });

	}
	else {
		res.send("Please log in.");
		return;
	}

}



/* A user can edit his personal information. He can edit name, birthdate,
phone, gender, address, email or profilePic.*/
exports.editInformation = function(req, res) {
	// if(req.user && req.user instanceof User) {
		console.log("yasso");
		var id = req.params.userID;
		var body = req.body;
		console.log("!!!!!!!!!");
		console.log(body.name);
		// var file = req.file;

		User.findById(id, function(err, user) {
			if(err)  res.send("error");
			else {
				if(!user) res.send("user not found");
				else {
					console.log("ANA GOWA");
					if(body.name) {
						console.log("Ana fl name");
						user.name = body.name;}
					if(body.birthdate) user.birthdate = new Date(body.birthdate);
					if(typeof body.phone != "undefined" && body.phone.length > 0) user.phone = body.phone;
					if(typeof body.gender != "undefined" && body.gender.length > 0) user.gender = body.gender;
					if(typeof body.address != "undefined" && body.address.length > 0) user.address = body.address;
					if(typeof body.email != "undefined" && body.email.length > 0) user.email = body.email;
					if(typeof file != "undefined") user.profilePic = file.filename;
					console.log(user);
					user.save(function(err) if(err) res.status(500).json(err.message));
				}
			}
		});
	// } else res.send("you are not authorized to view this page");
}
