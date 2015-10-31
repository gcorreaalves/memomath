describe("BoardController", function(){
  var scope, BoardController, pieces, result;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    scope   = _$rootScope_.$new();
    pieces = [
      { id : 1, pair : 2 },
      { id : 2, pair : 1 }
    ];

    spyOn(scope, "$emit");

    BoardController = _$controller_("BoardController", {
     '$scope' : scope
    });

    BoardController.pieces = pieces;

  }));

  it('Check choice', function() {
    result = BoardController.check_pair(pieces);
    expect(result).toBe(true);
  });

  it('Board is not Completed', function() {
    result = BoardController.is_completed();
    expect(result).toBe(false);
  });

  it('Board is Completed', function() {
    BoardController.store_hits(pieces);
    expect(scope.$emit).toHaveBeenCalledWith('board_completed', 'Some data');
  });

});
