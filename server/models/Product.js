// Import the Mongoose library
const mongoose = require("mongoose");

// Define the product schema using the Mongoose Schema constructor
const productSchema = new mongoose.Schema(
	{
        userId:{
            type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
        },
		medName: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			trim: true,
		},
		expMonth: {
			type: Number,
			required: true,
			trim: true,
		},
		expYear: {
			type: Number,
			required: true,
			trim: true,
		},
		mrp: {
			type: Number,
			required: true,
			trim: true,
		},
		wholeSalePrice: {
			type: Number,
			required: true,
			trim: true,
		},
		storeName: {
			type: String,
		},
		inStock: {
			type: Boolean,
		},
		rate: { // to show wholesale price per tab/syr/etc.
			type: Number,
			required: true,
			trim: true,
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("product", productSchema);