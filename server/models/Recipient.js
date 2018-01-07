const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
	email: String,
	responded: { 
		type: Boolean, 
		default: false
	} // if email is clicked -> True. Else -> False
	
});

module.exports = recipientSchema;