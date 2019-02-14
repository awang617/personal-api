const mongoose = require('mongoose');
Schema = mongoose.Schema;

const ProjectSchema = new Schema ({
    name: String,
    description: String,
    date: String,
    githubUrl: String
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;