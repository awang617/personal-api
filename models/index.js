const mongoose = require("mongoose");
const Project = require("./project.js")
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api", {useMongoClient: true});

exports.Project = Project;
