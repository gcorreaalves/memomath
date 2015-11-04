/**
 * Board service
 *
 * @author Gustavo Alves - contato@gustavocalves.com.br
 *
 */

(function() {
  'use strict';

  angular.module('app.components.board').service('BoardService', Service);

  let q, QService;

  Service.$inject = ['$q', 'QuestionService'];

  function Service($q, QuestionService) {
    q = $q;
    QService = QuestionService;
  }

  Service.prototype.get_questions = function(){
    return QService.list();
  };

  Service.prototype.get_pieces = function(questions){
    let deferred = q.defer();
    let result = this.get_questions();
    result.then((data) => {
      let questions = this.questions_to_pieces(data.data);
      deferred.resolve(questions);
    }, (errors) => {
      deferred.reject(errors);
    });
    return deferred.promise;
  };

  Service.prototype.suffle = function(questions) {
    return questions.sort( () => 0.5 - Math.random() );
  };

  Service.prototype.questions_to_pieces = function(questions){

    let pieces  = [];
    let counter = 0;

    questions.forEach( (question) => {

      let question_id = counter++;
      let answer_id   = counter++;

      let piece = [{
          id : question_id
        , content : question.question
        , pair : answer_id
        , show : false
      },{
          id : answer_id
        , content : question.answer
        , pair : question_id
        , show : false
      }];

      pieces.push(...piece);

    });

    return this.suffle(pieces);
  };

})();
