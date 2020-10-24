const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { urlencoded } = require("express");
require("dotenv").config()

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "public")));

app.use("/send", require("./routes/send"))



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));