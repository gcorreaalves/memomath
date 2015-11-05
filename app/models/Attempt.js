module.exports = function(app){

  class Attempt extends app.models.Application{
    constructor(){
      let schema = {
          id       : Number
        , name     : String
        , email    : String
        , attempts : Array
      };
      super(schema);
    }
  }

  return Attempt;

};
