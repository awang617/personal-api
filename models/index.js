const mongoose = require("mongoose");
const Project = require("./projects.js")
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useNewUrlParser: true});

exports.Project = Project;
