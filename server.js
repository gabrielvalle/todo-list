var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var hbs = require('express-handlebars');
var app = express();
var session = require('express-session');

var db = require('./models');
var Task = db.Task;

var status500 = function(response) {
  return function() { response.status(500).end(); }
};

var status404 = function(response) {
  return function() { response.status(404).end(); }
};

var status422 = function(response) {
  return function(error) {
    console.log(error);
    if (error.name === 'SequelizeValidationError') {
      response.status(422).json(modelErrors(error));
    } else {
      status500(response);
    }
  }
};

var modelErrors = function(error) {
  return error.errors.map(function(validation) {
    return validation.message;
  });
};

app.use(session({
    secret: '61e8dc7ad6fc5fed7d9d760341b3c71b2612d1df6fdda5e62ee158752a2fc5e122c4397c205061b'
  , cookie: {expires: new Date(Date.parse('2038-01-01'))}
  , resave: true
  , saveUninitialized: true
}));

app.use(function(request, response, next){
  var session = request.session;

  if (!session.user_id) {
    session.user_id = uuid.v4();
  }

  next();
});

app.engine('hbs', hbs({extname:'hbs'}));
app.set('view engine', 'hbs');
app.use("/", express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response){
  response.render('index', {session: request.session});
});

app.get('/tasks', function(request, response){
  Task.findAll({where: {user_id: request.session.user_id}})
    .success(function(tasks){ response.json(tasks); })
    .error(function(error) { response.status(500).end(); })
  ;
});

app.get('/tasks/:id', function(request, response){
  Task.find({where: {user_id: request.session.user_id, id: request.params.id}})
    .success(function(task){
      if (task) {
        response.json(task);
      } else {
        status404(response);
      }
    })
    .error(status500(response))
  ;
});

app.post('/tasks', function(request, response){
  var attrs = request.body.task;
  attrs.user_id = request.session.user_id;

  Task.create(attrs)
    .success(function(task) { response.status(201).json(task); })
    .error(status422(response))
  ;
});

app.patch('/tasks/:id', function(request, response){
  Task.find({where: {user_id: request.session.user_id, id: request.params.id}})
    .success(function(task){
      task.updateAttributes(request.body.task)
        .success(function(task){ response.status(200).json(task); })
        .error(status422(response))
      ;
    })
    .error(status500(response))
  ;
});

app.delete('/tasks/:id', function(request, response){
  Task.find({where: {user_id: request.session.user_id, id: request.params.id}})
    .success(function(task){
      task.destroy()
        .success(function(){ response.status(204).end(); })
        .error(status500(response))
      ;
    })
    .error(status500(response))
  ;
});

console.log('Listening on localhost:9292, CTRL+C to stop');
app.listen(9292, 'localhost');
