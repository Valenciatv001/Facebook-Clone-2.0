const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config(); // Load environment variables from .env file

mongoose.connect(
    process.env.MONGO_URL, // Connect to MongoDB using the URL from .env file
    console.log("Connected to MongoDB") // Log a message when the connection is successful
);

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(3001, () => {
    console.log("Backend is running"); // Start the server on port 3001 and log a message when it's running
});
