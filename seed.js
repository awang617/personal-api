// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

const db = require('./models');

const project_list = [
    {
        name: "Animal Racers",
        description: "a simple game made with Javascript",
        date: "week 2",
        githubUrl: "https://github.com/awang617/sf-wdi-51-assignments/tree/master/amberly-awang617/week-2/js-racer-game-lab-master"
    },
    {
        name: "Shop",
        description: "a tea shop",
        date: "week 2",
        githubUrl: "https://github.com/awang617/sf-wdi-51-assignments/tree/master/amberly-awang617/week-2/week-two-project-master"
    },
    {
        name: "Geoquakes Lab",
        description: "map and list all earthquakes in the past week",
        date: "week 3",
        githubUrl: "https://github.com/awang617/sf-wdi-51-assignments/tree/master/amberly-awang617/week-3/jquery-geoquakes-lab"
    }
];

db.Project.deleteMany({}, function(err, projects) {
    console.log('removed all projects');
    project_list.forEach( (projectData) => {
        const project = new db.Project({
            name: projectData.name,
            description: projectData.description,
            date: projectData.date,
            githubUrl: projectData.githubUrl
        });
        project.save( (err, savedProject) => {
            if (err) {console.log(err)}
            console.log(`Saved ${savedProject.name}`)
        });
    });
});

// const new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })
