// TO DO
// [] document api routes in /api
// [] make a route for api/profile
// [] make at least one resource you can CRUD




// require express and other modules
const express = require('express');
const app = express();

// parse incoming urlencoded form data
// and populate the req.body object
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// const db = require('./models');

const projects = [
  {
    _id: 1,
    name: "JS Racer"
  },
  {
    _id: 2,
    name: "Shop"
  }
];

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express-personal-api/README.md", // CHANGE ME
    baseUrl: "http://pure-spire-47744.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/projects", description: "See my projects"}, // CHANGE ME
      {method: "POST", path: "/api/projects", description: "Create a new project"}, // CHANGE ME
      {method: "PUT", path: "/api/projects/:id", description: "Update a previous project"},
      {method: "DELETE", path: "/api/projects/:id", description: "Delete a project"}
    ]
  })
});

app.get('/api/profile', (req, res) => {
  res.json({
    name: "Amberly",
    githubUsername: "awang617",
    githubLink: "https://github.com/awang617",
    personalSite: "https://awang617.github.io/",
    currentCity: "San Jose/San Francisco"
  })
})

app.get('/api/projects', (req,res) => {
  res.json({projects})
})

app.post('/api/projects', (req, res) => {
  const newProject = req.body;
  projects.push(newProject);
  res.json(newProject)
})

app.put('/api/projects', (req, res) => {

})

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express server is up and running on http://localhost:3000/');
});
