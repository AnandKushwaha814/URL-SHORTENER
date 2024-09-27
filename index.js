const express = require("express");
const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const path = require("path");
const URL = require("./models/url");
const { connectToMongoose } = require("./connect");
const { log } = require("console");

const app = express();
const PORT = 3000;

connectToMongoose("mongodb://localhost:27017/short-url").then(() => {
  console.log("Mongoose Connected");
});

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views")); // Ensure path is correct

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use("/", staticRouter);

// Test route to fetch all URLs
app.get("/test", async (req, res) => {
  try {
    const allUrls = await URL.find({}); // Fetch all URLs from the database
    console.log(allUrls); // Log the URLs after fetching

    return res.render("home", {
      urls: allUrls,
      name: "Anand",
    }); // Render 'home.ejs' with the fetched URLs and name
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Server error"); // Send an error response
  }
});

// Use URL routes
app.use("/url", urlRoute);

// Redirect based on shortId
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId; // Consistent naming
  try {
    const entry = await URL.findOneAndUpdate(
      { shortid: shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error fetching URL:", error);
    res.status(500).send("Server error");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
