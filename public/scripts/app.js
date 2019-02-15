console.log("Sanity Check: JS is working!");
var $projectList;
var allProjects = [];

$(document).ready(function(){

  $projectList = $('#projectTarget');
  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: handleSuccess,
    error: handleError
  });

  $('#newProjectForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/projects',
      data: $(this).serialize(),
      success: newProjectSuccess,
      error: newProjectError
    });
  });

  $projectList.on('click', '.deleteBtn', function() {
    console.log('clicked delete button to', '/api/projects/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/projects/'+$(this).attr('data-id'),
      success: deleteProjectSuccess,
      error: deleteProjectError
    });
  });

});

function getProjectHtml(project) {
  return `<hr>
          <p>
            <b>${project.name},</b>
            ${project.description} on ${project.date}. Find it <a href="${project.githubUrl}">here</a>!
            <button type="button" name="button" class="deleteBtn btn btn-danger pull-right" data-id=${project._id}>Delete</button>
          </p>`;
}

function getAllProjectsHtml(project) {
  return project.map(getProjectHtml).join("");
}

// helper function to render all posts to view
// note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $projectList.empty();

  // pass `allProject` into the template function
  var projectHtml = getAllProjectsHtml(allProjects);

  // append html to the view
  $projectList.append(projectHtml);
};

function handleSuccess(json) {
  allProjects = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#projectTarget').text('Failed to load projects, is the server working?');
}

function newProjectSuccess(json) {
  $('#newProjectForm input').val('');
  allProjects.push(json);
  render();
}

function newProjectError() {
  console.log('new project error!');
}

function deleteProjectSuccess(json) {
  var project = json;
  console.log(json);
  var projectId = project._id;
  console.log('delete project', projectId);
  // find the project with the correct ID and remove it from our allProjects array
  for(var index = 0; index < allProjects.length; index++) {
    if(allProjects[index]._id === projectId) {
      allProjects.splice(index, 1);
      break;  // we found our project - no reason to keep searching (this is why we didn't use forEach)
    }
  }
  render();
}

function deleteProjectError() {
  console.log('delete project error!');
}