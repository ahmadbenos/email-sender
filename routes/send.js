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
            to: 'benos.tarabain@gmail.com',
            subject: subject,
            text: message
          }, (err, info) => {
            if (err) {
              console.log(`Error: ${err}`);
            }
            else {
                console.log(info)
                res.redirect("/");
            }
          });

    
})


module.exports = router;
