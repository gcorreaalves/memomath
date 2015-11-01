module.exports = function(app){

  class Player extends app.models.Application{
    constructor(){
      let schema = {
          id    : Number
        , name  : String
        , email : String
      };
      super(schema);
    }
  }

  return Player;

};
