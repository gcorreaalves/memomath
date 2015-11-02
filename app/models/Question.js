module.exports = function(app){

  class Question extends app.models.Application{
    constructor(){
      let schema = {
          id       : Number
        , question : String
        , answer   : String
        , level    : Number
      };
      super(schema);
    }
  }

  return Question;

};
