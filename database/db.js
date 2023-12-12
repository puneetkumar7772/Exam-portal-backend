const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/Exam-portal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
