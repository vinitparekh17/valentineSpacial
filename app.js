const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const coupleModel = require("./models/user")
const ejs = require("ejs");
const uri = "mongodb+srv://parekh:Smartyvinit100@webwork.stlpo.mongodb.net/WebWork?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Mongoose connected"));

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    // console.log(req.body);
})

app.post("/", (req, res) => {
    var Results = Math.floor(Math.random() * (100 - 75)) + 75;
    const user = req.body.userName;
    const partner = req.body.crushName;
    const newCouple = new coupleModel(req.body)
    newCouple.save((error) => {
        if (error) throw error;
    })
    if (!isNaN(user && partner)) {
        return res.sendFile(__dirname + "/invalid.html")
    }

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (specialChars.test(user) || specialChars.test(partner)) {
        return res.sendFile(__dirname + "/invalid.html")
    }

    res.render("result", {
        userName: req.body.userName,
        crushName: req.body.crushName,
        result: Results

    })
})

app.listen(process.env.PORT, () => console.log("App has been deployed!"))
