import promise from 'bluebird';

module.exports = function(app){

  let Attempt = new app.models.Attempt();

  class AttemptController extends app.controllers.ApplicationController{

    create(name, email, attempts){
      let resolver = promise.pending();
      Attempt.create({
          'name' : name
        , 'email' : email
        , 'attempts' : attempts
      })
      .then(function(row) {
        resolver.resolve(row);
      }).catch(function(error) {
        resolver.reject(error);
      });
      return resolver.promise;
    }

    show(id){
      let resolver = promise.pending();
      Attempt.findById(id)
      .then(function(rows) {
        resolver.resolve(rows);
      }).catch(function(error) {
        resolver.reject(error);
      });
      return resolver.promise;
    }

    list(){
      let resolver = promise.pending();
      Attempt.sort('id')
      .then(function(rows) {
        resolver.resolve(rows);
      }).catch(function(error) {
        resolver.reject(error);
      });
      return resolver.promise;
    }

  }

  return AttemptController;

};
