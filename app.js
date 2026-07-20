// ===== IMPORTS =====
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// ===== CONFIG =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// ===== MIDDLEWARE =====
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// ===== DB CONNECTION =====
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
.then(() => console.log("Connected to DB"))
.catch(console.log);

// ===== ROUTES =====

// ROOT
app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

// INDEX
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// NEW (form)
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//EDIT Route
app.get("/listings/:id/edit", async (req, res) => {
    try {
        const { id } = req.params;

        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        res.render("listings/edit.ejs", { listing });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


// SHOW
app.get("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);

        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        res.render("listings/show.ejs", { listing });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// CREATE (POST)
app.post("/listings", async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating listing");
    }
});


//UPDATE Route
app.put("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await Listing.findByIdAndUpdate(
            id,
            req.body,
            { runValidators: true }
        );

        res.redirect(`/listings/${id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Update failed");
    }
});

//DELETE Route
app.delete("/listings/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedListing = await Listing.findByIdAndDelete(id);

        if (!deletedListing) {
            return res.status(404).send("Listing not found");
        }

        console.log("Deleted:", deletedListing);

        res.redirect("/listings");

    } catch (err) {
        console.error(err);
        res.status(500).send("Delete failed");
    }
});

// TEST (optional)
app.get("/testListing", async (req, res) => {
    const sampleListing = new Listing({
        title: "My New Villa",
        description: "By the Beach",
        price: 12000,
        location: "Calangute, Goa",
        country: "India"
    });

    await sampleListing.save();
    res.send("Successful testing");
});

// ===== SERVER =====
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});