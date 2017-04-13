var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Offer = mongoose.model('Offer');

exports.GetOffers = function(req, res) {
  var id = req.user.id;

  Offer.find({_id:id}, function(err, offers) {
    if(err) {
      console.log("error in finding all offers");
    } else {
      console.log(offers);
    }
  })
};


exports.createOffer = function(req, res) {
  var businessId = req.user.id;  //get _id from session
  var s = req.body;
  var f = req.file;

  console.log(s);
  // console.log("!");
  if(!s.name || !s.type || !s.value || !s.details || !s.expiration_date) {
    console.log("please add all information");
    res.send("please add all information");
    //send back to add offer page
  } else {
    var newOffer = new Offer({
      name:s.name,
      type:s.type,
      value:s.value,
      details:s.details,
      // start_date:s.start_date,
      expiration_date:s.expiration_date
    });
    // newOffer.business = businessId;
    newOffer.business = s.id; //only for testing

    if(typeof f != 'undefined') {
      newOffer.image = f.filename;
    }
    if(typeof s.start_date != 'undefined') {
      newOffer.start_date = s.start_date;
    }
    // console.log(newOffer);
    newOffer.save(function(err, offer) {
      if(err) {
        console.log("error in creating offer");
        res.send("error in creating offer");
        //send back to add offer page
      } else {
        console.log(offer);
        console.log("offer created successfully");

        this.notify_on_create(function(err)
        {
          if(err)
              console.log("error in offer creation notification");
          else
              console.log("successfully notified for offer creation");

          });
        res.send(offer);
        // res.send("offer created successfully");
        //send to profile/next page
      }
    })
  }
};

exports.updateOffer = function(req, res) {
  var s = req.body;
  var businessId = req.user.id; //session
  var id = req.query.id;
  // var id = s.id; //only for testing
  var f = req.file;
  // res.send(s);
  console.log(s);
  console.log("-----------------------------------------");

  if(typeof s.name != 'undefined' && s.name.length != 0) {
    Offer.findByIdAndUpdate(
      id,
      {$set:{name:s.name}},
      function(err, offer) {
        if(err){
          console.log("error in updating name");
          // res.send("error in updating type");
        }
        else {
          console.log("name updated");
          console.log(offer);
          // res.send(offer);
        }
      }
    )
  }

  if(typeof s.type != 'undefined' && s.type.length != 0) {
    Offer.findByIdAndUpdate(
      id,
      {$set:{type:s.type}},
      function(err, offer) {
        if(err){
          console.log("error in updating type");
          // res.send("error in updating type");
        }
        else {
          console.log("type updated");
          console.log(offer);
          // res.send(offer);
        }
      }
    )
  }

  if(typeof s.value != 'undefined' && s.value.length != 0) {
    Offer.findByIdAndUpdate(
      id,
      {$set:{value:s.value}},
      function(err, offer) {
        if(err){
          console.log("error in updating value");
          // res.send("error in updating value")
        }
        else {
          console.log("value updated");
          console.log(offer);
          // res.send(offer);
        }
      }
    )
  }

  if(typeof s.details != 'undefined' && s.details.length != 0) {
    Offer.findByIdAndUpdate(
      id,
      {$set:{details:s.details}},
      function(err, offer) {
        if(err){
          console.log("error in updating details");
          // res.send("error in updating details");
        }
        else {
          console.log("details updated");
          console.log(offer);
          // res.send(offer);
        }
      }
    )
  }

  if(typeof s.start_date != 'undefined' && s.start_date.length != 0) {
    Offer.findByIdAndUpdate(
      id,
      {$set:{start_date:s.start_date}},
      function(err, offer) {
        if(err){
          console.log("error in updating start_date");
          // res.send("error in updating start_date");
        }
        else {
          console.log("start_date updated");
          console.log(offer);
          // res.send(offer);
        }
      }
    )
  }

  if(typeof s.expiration_date != 'undefined' && s.expiration_date.length != 0) {
    Offer.findByIdAndUpdate(
      id,
      {$set:{expiration_date:s.expiration_date}},
      function(err, offer) {
        if(err) {
          console.log("error in updating expiration_date");
          console.log(offer);
          console.log(s.expiration_date);
          // res.send("error in updating expiration_date");
        }
        else {
          console.log("expiration_date updated");
          console.log(offer);
          // res.send("offer");
        }
      }
    )
  }

  if(typeof s.notify_subscribers != 'undefined' && s.notify_subscribers.length != 0) {
    Offer.findByIdAndUpdate(
      id,
      {$set:{notify_subscribers:s.notify_subscribers}},
      function(err, offer) {
        if(err){
          console.log("error in updating notify_subscribers");
          // res.send("error in updating notify_subscribers");
        }
        else {
          console.log("notify_subscribers updated");
          console.log(offer);
          // res.send(offer);
        }
      }
    )
  }

  if(typeof f != 'undefined') {
    Offer.findByIdAndUpdate(
      id,
      {$set:{image:f.filename}},
      function(err, offer) {
        if(err){
          console.log("error in updating image");
          // res.send("error in updating image");
        }
        else {
          console.log("image updated");
          console.log(offer);
          // res.send(offer);
        }
      }
    )
  }

  Offer.findOne({_id:id}, function(err, offer) {
    if(err) {
      console.log("error in finding offer");
      res.send("error in finding offer");
    } else {
      console.log(offer);
      res.send(offer);
    }
  })
};

exports.deleteOffer = function(req, res) {
  var id = req.query.id;
  var businessId = req.user.id;
  var businessId = req.query.Bid; //just for testing
  var d = new Date();
  Offer.findOne({_id:id}, function(err, offer) {
    if(err)
    {
      console.log("error in finding the offer");
    }
    else
    {
      if(d < offer.expiration_date)
      {
        console.log("are you sure you want to delete the offer before its expiration date?");
      }
      else
      {
        Offer.remove({_id:id}, function(err)
        {
          if(err)
          {
            console.log("cannot delete offer");
            res.send("cannot delete offer");
          }
          else
          {
            console.log("offer deleted");
            // res.send("offer deleted");
            Offer.find({business:businessId},function(err, myoffers)
            {
              if(err)
              {
                console.log("cannot get my offers");
              }
               else
              {
                res.send(myoffers);
              }
            })
          }
        })
      }
    }
  })
};


exports.notify_on_create = function(req,res)
{
  //Notification:  "Business name" just added "event name".
  var subscibers = req.user.subscibers;
  var content = req.user.name + "added" + req.body.name; 
  var notification = new Notification(
  {
    date: new Date(),
    content: content
  });

  notification.save(function(err,notification)
  {
    if(err)
      console.log("error saving notification");
    else
    {

      for(var i = 0; i < subscribers.length; i++)
      {
        User.findByIdAndUpdate({_id:subscibers[i]},{$push:{"notifications": notification}},function(err,user)
        {
          if(err)
            console.log("error updating user notifications");
          else
            console.log(user);
        });
      }
    }
  });

}