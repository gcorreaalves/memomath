import promise from 'bluebird';

module.exports = function(app){

  let Question = new app.models.Question();

  class QuestionController extends app.controllers.ApplicationController{

    create(question, answer, level){
      let resolver = promise.pending();
      Question.create({
          'question' : question
        , 'answer' : answer
        , 'level' : level
      })
      .then(function(row) {
        resolver.resolve(row);
      }).catch(function(error) {
        resolver.reject(error);
      });
      return resolver.promise;
    }

    update(id, question, answer, level){
      let resolver = promise.pending();
      Question.model.findByIdAndUpdate(id, {
          'question' : question
        , 'answer' : answer
        , 'level' : level
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
      Question.model.findById(id)
      .then(function(rows) {
        resolver.resolve(rows);
      }).catch(function(error) {
        resolver.reject(error);
      });
      return resolver.promise;
    }

    list(){
      let resolver = promise.pending();
      Question.sort('id')
      .then(function(rows) {
        resolver.resolve(rows);
      }).catch(function(error) {
        resolver.reject(error);
      });
      return resolver.promise;
    }

    remove(id){
      let resolver = promise.pending();
      Question.model.findByIdAndRemove(id)
      .then(function(rows) {
        resolver.resolve(rows);
      }).catch(function(error) {
        resolver.reject(error);
      });
      return resolver.promise;
    }
  }

  return QuestionController;

};
