const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { urlencoded } = require("express");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config()

app.use(cors());
app.use(express.json());
app.use(urlencoded({extended: false}));
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: false
}))


app.use(flash());

app.use((req, res, next) => {
    res.locals.email_sent = req.flash("email_sent");
    res.locals.email_error = req.flash("email_error");
    next();
})

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index")
})
app.use("/send", require("./routes/send"))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));