require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 100,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}/api/`);
});

app.set("view engine", "handlebars");
app.get('/', function (req, res) {
  res.render('portfolio')
});
require("./app/routes/routes.js")(app);
app.use(express.static("public"));
