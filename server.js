const express = require('express');
const Mustache = require('mustache-express');
const bodyParser = require('body-parser');

var application = express();
application.engine('mustache', Mustache());

application.set('views', './views');
application.set('view engine', 'mustache');

application.use(bodyParser.urlencoded({ extended: true }));

var model = {};
var todos = [];
var dones = [];
model.todos = todos;
model.dones = dones;

application.get('/', (request, response) => {
    if(model.todos.length > 0){
      for(var i in model.todos){
        model.todos[i].id = i;
      }
    }
   response.render('To_Do', model);
});

application.post("/", function (request, response) {
  model.todos.push({id: model.todos.length, item: request.body.item });
  response.redirect('/');
});

application.post("/:id", function (request, response) {
  var dex = parseInt(request.params.id);
  model.dones.push(model.todos[dex].item);
  model.todos.splice(dex, 1);
  response.redirect('/');
});

application.listen(3000);

