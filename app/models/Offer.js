var mongoose = require('mongoose'),
     Schema   = mongoose.Schema;

var offerSchema = new Schema({
  type 			 	: String,
  value       : SchemaTypes.Double,
  details		 	: String,
  start_date : { type: Date, default: Date.now }
  expiration_date	: Date,
  notify_subscribers: Boolean, //boolean or int?
  business:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business'
  },
  images: [String]
});

var Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer
