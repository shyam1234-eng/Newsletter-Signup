const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { send } = require("process");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const eMail = req.body.email;
  const data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = " https://us14.api.mailchimp.com/3.0/lists/f0a9bd16cd";

  const options = {
    method: "POST",
    auth: "shyam1:c72cc312ece4eb2edc51685c0742dd0a-us14"

  }
  const request = https.request(url, options, function (response) {

    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("server is running on port 3000.");
});


// API Key
// a5221e2be6fe334f1e216b98a1b3f9e3-us14

// List Id
// f0a9bd16cd
