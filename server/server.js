const express = require("express");
const app = express();
const dotenv = require("dotenv");
const router = require("./routes/userRouter");
const cookiParser = require("cookie-parser");
app.use(cookiParser());
dotenv.config();
app.use(express.json());
require("./db/db");

app.use(
  require("cors")({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(require("./routes/productsRouter"));
app.listen(5000, () => {
  console.log("you are in port 5000");
});
