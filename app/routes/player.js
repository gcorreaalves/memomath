module.exports = function(app) {

  var Player = new app.controllers.PlayerController();

  app.post('/player', function(req, res){

    let {name, email} = req.body;

    Player.create(req.body)
    .done(function(result){
      res.sendStatus(201);
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.get('/player/:id', function(req, res){

    let id = req.params.id;

    Player.show(id)
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

  app.get('/players', function(req, res){
    Player.list()
    .done(function(data){
      res.send( data );
    }, function(error){
      res.sendStatus(404);
    });
  });

};
