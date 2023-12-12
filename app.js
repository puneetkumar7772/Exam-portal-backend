const express = require("express");
const db = require("./database/db");
const bodyParser = require("body-parser");
const categoryRoute = require("./routes/categoryRoutes");
const QuizzeRoute = require("./routes/addQuizzeRoute");
const userRoute = require("./routes/userRoutes");

const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
app.use("/examportal", categoryRoute);
app.use("/examportal", QuizzeRoute);
app.use("/examportal", userRoute);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
