const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

// bringing in the routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const tagRoutes = require("./routes/tag");


//app
const app = express();

//database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"));

//cors
// if ((process.env.NODE_ENV === "DEVELOPMENT")) {
//   app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// };

const allowList = ['http://localhost:3000', `${process.env.CLIENT_URL}`]
app.use(cors({
  origin: (origin, callback) => {
    const allowListIndex = allowList.findIndex(url => url.includes(origin))
    callback(null, allowListIndex > -1)
  }
}));


//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", blogRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", tagRoutes);



//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
