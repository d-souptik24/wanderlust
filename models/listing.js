const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    image: {
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1695154528717-67648e7a6cd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm8lMjBpbWFnZSUyMGF2YWlsYWJsZSUyMHNpZ258ZW58MHx8MHx8fDA%3D",
            set: (v) => 
                (!v || v
                    .trim() === "" ? 
                    "https://images.unsplash.com/photo-1695154528717-67648e7a6cd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm8lMjBpbWFnZSUyMGF2YWlsYWJsZSUyMHNpZ258ZW58MHx8MHx8fDA%3Dhttps://images.unsplash.com/photo-1695154528717-67648e7a6cd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bm8lMjBpbWFnZSUyMGF2YWlsYWJsZSUyMHNpZ258ZW58MHx8MHx8fDA%3D" : 
                    v)
        },
        filename: {
            type: String,
            default: "listingimage",
        },
    },

    price: {
        type: Number,
        min: 0,
    },

    location: {
        type: String,
        trim: true,
    },

    country: {
        type: String,
        trim: true,
    },
},
{ timestamps: true } // adds createdAt, updatedAt
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;