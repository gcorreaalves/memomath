describe("BoardService", function(){
  var $httpBackend, APP, BoardService, Questions;

  beforeEach(inject(function(_$httpBackend_, _APP_, _BoardService_) {
    APP          = _APP_;
    $httpBackend = _$httpBackend_;
    BoardService = _BoardService_;

    Questions = [
        { "question" : "1+1", "answer" : "2", "level" : 1 }
      , { "question" : "2+2", "answer" : "4", "level" : 1 }
      , { "question" : "3+3", "answer" : "6", "level" : 1 }
      , { "question" : "4+4", "answer" : "8", "level" : 1 }
      , { "question" : "5+5", "answer" : "10", "level" : 1 }
      , { "question" : "6+6", "answer" : "12", "level" : 1 }
      , { "question" : "7+7", "answer" : "14", "level" : 1 }
      , { "question" : "8+8", "answer" : "16", "level" : 1 }
    ];

    $httpBackend.expectGET( APP.API_URL + '/questions').respond(Questions);

  }));

  it('Question to Piece', function() {
    var
    questions = [{ "question" : "1+1", "answer" : "2", "level" : 1 }],
    pieces    = BoardService.questions_to_pieces(questions);
    expect(pieces.length).toBe(2);
  });

  it('Get Pieces', function() {
    var
    result = BoardService.get_pieces(),
    total_pieces = 0;

    $httpBackend.flush();

    total_pieces = result.$$state.value.length;

    expect(total_pieces).toBe(16);
  });

  it('Suffle Pieces', function() {
    var pieces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    pieces = BoardService.suffle(pieces);
    expect( pieces[0] + '-' + pieces[9] ).not.toBe( '1-10' );
  });

});
