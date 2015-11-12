module.exports = function(app) {

  let Question = new app.controllers.QuestionController();

  app.post('/question', function(req, res){

    let {question, answer, level} = req.body;

    Question.create(question, answer, level)
    .done(function(result){
      res.sendStatus(201);
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.get('/question/:id', function(req, res){

    let id = req.params.id;

    Question.show(id)
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.put('/question/:id', function(req, res){

    let id = req.params.id;
    let {question, answer, level} = req.body;

    Question.update(id, question, answer, level)
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.delete('/question/:id', function(req, res){

    let id = req.params.id;

    Question.remove(id)
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.get('/questions', function(req, res){
    Question.list()
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

};
