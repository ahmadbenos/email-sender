const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport")


router.post("/", (req, res) => {
    const {name, email, subject, message} = req.body;

    console.log(email, subject, message)

    const auth = {
        auth: {
          api_key: process.env.API_KEY,
          domain: process.env.MY_DOMAIN
        }
    }

        const nodemailerMailgun = nodemailer.createTransport(mailGun(auth));

        nodemailerMailgun.sendMail({
            from: email,
            to: process.env.MY_EMAIL,
            subject: subject,
            text: `Name: ${name}

Message: ${message}`
          }, (err, info) => {
            if (err) {
              console.log(`Error: ${err}`);
              req.flash("email_error", "Email failed to send!")
              res.redirect("/");
            }
            else {
                console.log(info)
                req.flash("email_sent", "Email successfully sent!");
                res.redirect("/");
            }
          });
})





module.exports = router;
