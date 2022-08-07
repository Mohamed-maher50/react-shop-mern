const mongoose = require("mongoose");
mongoose.connect(
  process.env.DB_url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("you are connect with db");
  }
);
