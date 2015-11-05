module.exports = function(app) {

  let Attempt = new app.controllers.AttemptController();

  app.post('/attempt', function(req, res){

    let {name, email, attempts} = req.body;

    Attempt.create(name, email, attempts)
    .done(function(result){
      res.sendStatus(201);
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.get('/attempt/:id', function(req, res){

    let id = req.params.id;

    Attempt.show(id)
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.get('/attempts', function(req, res){
    Attempt.list()
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

};
