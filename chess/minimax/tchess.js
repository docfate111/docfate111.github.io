//Users/thwilliams/Documents/Code/JS/chess/index.html
var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
function onDragStart (source, piece, position, orientation) {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false
  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false
  }
}
function onDrop (source, target) {
  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  })
  // illegal move
  if (move === null) return 'snapback'
  updateStatus();
  window.setTimeout(makeMove, 50);
}
function formatpgn(s){
  let j=0;
  while(s.indexOf(".")!=-1){
    j=s.indexOf(".");
    s=s.slice(0, j-1)+s.slice(j+2, s.length);
  }
  return s;
}
function makeMove(){
  var possMoves=game.moves();
  //no more possible moves->game over
  if(possMoves.length===0) return 
  //only one possible move
  if (possMoves.length===1) x=possMoves[0];
  //make move
  var nextMove=getNextMove(formatpgn(game.pgn()));
  if(nextMove=='Empty'){
    game.move(generateMove("b"));
  }else{
    game.move(nextMove);
  }
  //update board
  board.position(game.fen());
}
function generateMove(player){
  var possMoves=game.moves();
  var bestMove=possMoves[Math.floor(Math.random()*possMoves.length)];
  var bestScore=Number.NEGATIVE_INFINITY;
  for(var i=0; i<possMoves.length; i++){
    game.move(possMoves[i]);
    var m=minimax(player, 2, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, player);
    if(m>=bestScore){
      bestScore=m;
      bestMove=possMoves[i];
      console.log("oh looks like ive found better move");
    }
    game.undo();
  }
  return bestMove;
}
function otherPlayer(a){if(a=="w"){return "b";}return "w";}
function max(a, b){if(a>b){return a;} return b;}
function min(a, b){if(a<b){return a;} return b;}
function minimax(player, depth, alpha, beta, playerMaxingfor){
  if(depth<1 || game.game_over()){
    //return getPieceScore(playerMaxingfor);
    return getLocScore(playerMaxingfor)+99*getPieceScore(playerMaxingfor);
  }
  var bestScore;
  var possMoves=game.moves();
  if(player==playerMaxingfor){
      bestScore=Number.NEGATIVE_INFINITY;
      for(var i=0; i<possMoves.length; i++){
          game.move(possMoves[i]);
          player=otherPlayer(player);
          var eval=minimax(player, depth-1, alpha, beta, playerMaxingfor);
          game.undo();
          bestScore=max(eval, bestScore);
          alpha=max(eval, alpha);
          if(beta<=alpha){
            break;
          }
      }
  }else{
    //other players turn minimize points that other player gets
    bestScore=Number.POSITIVE_INFINITY;
    for(var i=0; i<possMoves.length; i++){
      game.move(possMoves[i]);
      player=otherPlayer(player);
      var eval=minimax(player, depth-1, alpha, beta, playerMaxingfor);
      game.undo();
      bestScore=min(eval, bestScore);
      beta=min(eval, beta);
      if(beta<=alpha){
        break;
      }
    }
  }
  return bestScore;
}
//a1.................h1 white 
//a8.................h8 black location scoring for wTables
var wPawnTable={
'a1':0,'b1':0,'c1':0,'d1':0,'e1':0,'f1':0,'g1':0,'h1':0,
'a2':10,'b2':10,'c2':0,'d2':-10,'e2':-10,'f2':0,'g2':10,'h2':10,
'a3':5,'b3':0,'c3':0,'d3':5,'e3':5,'f3':0,'g3':0,'h3':5,
'a4':0,'b4':0,'c4':10,'d4':20,'e4':20,'f4':10,'g4':0,'h4':0,
'a5':5,'b5':5,'c5':5,'d5':10,'e5':10,'f5':5,'g5':5,'h5':5,
'a6':10,'b6':10,'c6':10,'d6':20,'e6':20,'f6':10,'g6':10,'h6':10,
'a7':20,'b7':20,'c7':20,'d7':30,'e7':30,'f7':20,'g7':20,'h7':20,
'a8':0,'b8':0,'c8':0,'d8':0,'e8':0,'f8':0,'g8':0,'h8':0};
var bPawnTable={
'a1':0,'b1':0,'c1':0,'d1':0,'e1':0,'f1':0,'g1':0,'h1':0,
'a2':20,'b2':20,'c2':20,'d2':30,'e2':30,'f2':20,'g2':20,'h2':20,
'a3':10,'b3':10,'c3':10,'d3':20,'e3':20,'f3':10,'g3':10,'h3':10, 
'a4':5,'b4':5,'c4':5,'d4':10,'e4':10,'f4':5,'g4':5,'h4':5,
'a5':0,'b5':0,'c5':10,'d5':20,'e5':20,'f5':10,'g5':0,'h5':0,
'a6':5,'b6':0,'c6':0,'d6':5,'e6':5,'f6':0,'g6':0,'h6':5,
'a7':10,'b7':10,'c7':0,'d7':-10,'e7':-10,'f7':0,'g7':10,'h7':10,
'a8':0,'b8':0,'c8':0,'d8':0,'e8':0,'f8':0,'g8':0,'h8':0};
var wBishopTable={
'a1':0,'b1':0,'c1':-10,'d1':0,'e1':0,'f1':-10,'g1':0,'h1':0,
'a2':0,'b2':0,'c2':0,'d2':10,'e2':10,'f2':0,'g2':0,'h2':0,
'a3':0,'b3':0,'c3':10,'d3':15,'e3':15,'f3':10,'g3':0,'h3':0, 
'a4':0,'b4':10,'c4':15,'d4':20,'e4':20, 'f4':15, 'g4':10, 'h4':0,
'a5':0,'b5':10,'c5':15,'d5':20,'e5':20,'f5':15,'g5':10,'h5':0,
'a6':0,'b6':0,'c6':10,'d6':15,'e6':15,'f6':10,'g6':0,'h6':0,
'a7':0,'b7':0,'c7':0,'d7':10,'e7':10,'f7':0,'g7':0,'h7':0,
'a8':0,'b8':0,'c8':0,'d8':0,'e8':0,'f8':0,'g8':0,'h8':0};
var bBishopTable={
'a1':0,'b1':0,'c1':0,'d1':0,'e1':0,'f1':0,'g1':0,'h1':0,
'a2':0,'b2':0,'c2':0,'d2':10,'e2':10,'f2':0,'g2':0,'h2':0,
'a3':0,'b3':0,'c3':10,'d3':15,'e3':15,'f3':10,'g3':0,'h3':0,
'a4':0,'b4':10,'c4':15,'d4':20,'e4':20,'f4':15,'g4':10,'h4':0,
'a5':0,'b5':10,'c5':15,'d5':20,'e5':20,'f5':15,'g5':10,'h5':0,
'a6':0,'b6':0, 'c6':10, 'd6':15,'e6':15,'f6':10,'g6':0,'h6':0,
'a7':0,'b7':0,'c7':0,'d7':10,'e7':10,'f7':0,'g7':0,'h7':0,
'a8':0,'b8':0,'c8':-10,'d8':0,'e8':0,'f8':-10,'g8':0,'h8':0};
var wRookTable={
'a1':0,'b1':0,'c1':5,'d1':10,'e1':10,'f1':5,'g1':0,'h1':0,
'a2':0,'b2':0,'c2':5,'d2':10,'e2':10,'f2':5,'g2':0,'h2':0,
'a3':0,'b3':0,'c3':5,'d3':10,'e3':10,'f3':5,'g3':0,'h3':0, 
'a4':0,'b4':0,'c4':5,'d4':10,'e4':10,'f4':5,'g4':0,'h4':0, 
'a5':0,'b5':0,'c5':5,'d5':10,'e5':10,'f5':5,'g5':0,'h5':0,
'a6':0,'b6':0,'c6':5,'d6':10,'e6':10,'f6':5,'g6':0,'h6':0,
'a7':25,'b7':25,'c7':25,'d7':25,'e7':25,'f7':25,'g7':25,'h7':25,
'a8':0,'b8':0,'c8':5,'d8':10,'e8':10,'f8':5,'g8':0,'h8':0};
var bRookTable={
'a1':0,'b1':0,'c1':5,'d1':10,'e1':10,'f1':5,'g1':0,'h1':0, 
'a2':25,'b2':25,'c2':25,'d2':25,'e2':25,'f2':25,'g2':25,'h2':25,
'a3':0,'b3':0,'c3':5,'d3':10,'e3':10,'f3':5,'g3':0,'h3':0,
'a4':0,'b4':0,'c4':5,'d4':10,'e4':10,'f4':5,'g4':0,'h4':0,
'a5':0,'b5':0,'c5':5,'d5':10,'e5':10,'f5':5,'g5':0,'h5':0,
'a6':0,'b6':0,'c6':5,'d6':10,'e6':10,'f6':5,'g6':0,'h6':0,
'a7':0,'b7':0,'c7':5,'d7':10,'e7':10,'f7':5,'g7':0,'h7':0,
'a8':0,'b8':0,'c8':5,'d8':10,'e8':10,'f8':5,'g8':0,'h8':0};
var wKnightTable={
'a1':0,'b1':-10,'c1':0,'d1':0,'e1':0,'f1':0,'g1':-10,'h1':0,
'a2':0,'b2':0,'c2':0,'d2':5,'e2':5,'f2':0,'g2':0,'h2':0,
'a3':0,'b3':0,'c3':10,'d3':10,'e3':10,'f3':10,'g3':0,'h3':0,
'a4':0,'b4':0,'c4':10,'d4':20,'e4':20,'f4':10,'g4':5,'h4':0,
'a5':5,'b5':10,'c5':15,'d5':20,'e5':20,'f5':15,'g5':10,'h5':5,
'a6':5,'b6':10,'c6':10,'d6':20,'e6':20,'f6':10,'g6':10,'h6':5,
'a7':0,'b7':0,'c7':5,'d7':10,'e7':10,'f7':5,'g7':0,'h7':0,
'a8':0,'b8':0,'c8':0,'d8':0,'e8':0,'f8':0,'g8':0, 'h8':0};
var bKnightTable={
'a1':0,'b1':0,'c1':0,'d1':0,'e1':0,'f1':0,'g1':0,'h1':0, 
'a2':0,'b2':0,'c2':5,'d2':10,'e2':10,'f2':5,'g2':0,'h2':0,
'a3':5,'b3':10,'c3':10,'d3':20,'e3':20,'f3':10,'g3':10,'h3':5,
'a4':5,'b4':10,'c4':15,'d4':20,'e4':20,'f4':15,'g4':10,'h4':5,
'a5':0,'b5':5,'c5':10,'d5':20,'e5':20,'f5':10,'g5':0,'h5':0, 
'a6':0,'b6':0,'c6':10,'d6':10,'e6':10,'f6':10,'g6':0,'h6':0,
'a7':0,'b7':0,'c7':0,'d7':5,'e7':5,'f7':0,'g7':0,'h7':0,
'a8':0,'b8':-10,'c8':0,'d8':0,'e8':0,'f8':0,'g8':-10,'h8':0};
var whiteTable={"p":wPawnTable, "n":wKnightTable, "b":wBishopTable, "r":wRookTable};
var blackTable={"p":bPawnTable, "n":bKnightTable, "b":bBishopTable, "r":bRookTable};
var pieceTables={"w":whiteTable, "b":blackTable};
var everySquare=['a1','b1','c1','d1','e1','f1','g1','h1',
'a2','b2','c2','d2','e2','f2','g2','h2','a3','b3','c3','d3','e3','f3',
'g3','h3','a4','b4','c4','d4','e4','f4','g4','h4',
'a5','b5','c5','d5','e5','f5','g5','h5','a6','b6','c6','d6','e6','f6',
'g6','h6','a7','b7','c7','d7','e7','f7','g7','h7','a8','b8','c8','d8','e8','f8','g8','h8'];
function getLocScore(player){
  var sum=0;
  var g;
  var sq;
  var arr=everySquare.filter(x=>game.get(x)!=null);
  //n^2 to n yay!(hardly helps)
  for(let i=0; i<arr.length; i++){
      sq=arr[i];
      g=game.get(sq);
      //if((g!=null && g!=null)){
        if("pnbr".includes(g.type)){
          sum+=pieceTables[g.color][g.type][sq];
        }
      //}
  }
  return sum;
}
function getPieceScore(player){
  var sum=0;
  var g;
  var sq;
  var arr=everySquare.filter(x=>game.get(x)!=null);
  for(let i=0; i<arr.length; i++){
    sq=arr[i];
    g=game.get(sq);
    if(g.color===player){
        switch(g.type){
          case "p":
            sum+=1;
            break;
          case "n":
            sum+=3;
            break;
          case "b":
            sum+=3;
            break;
          case "q":
            sum+=8;
            break;
          case "k":
            sum+=16;
            break;
          case "r":
            sum+=5;
            break;
          default:
            sum+=0;
        }
      }else{
        switch(g.type){
          case "p":
            sum-=1;
            break;
          case "n":
            sum-=3;
            break;
          case "b":
            sum-=3;
            break;
          case "q":
            sum-=8;
            break;
          case "k":
            sum-=16;
            break;
          case "r":
            sum-=5;
            break;
          default:
            sum-=0;
        }
    }
  }
  return sum;
}
/*var searchController={};
searchController.nodes;
searchController.fh;
searchController.fhf;
searchController.depth;
searchController.time;
searchController.start;
searchController.stop;
searchController.best;
searchController.thinking;
function searchPosition(){
  var bestMove;
  var bestScore=Number.NEGATIVE_INFINITY;
  var currentDepth=0;
  for(currentDepth=1; currentDepth<=searchController.depth; ++currentDepth){
    if(searchController.stop){
      break;
    }
  }
  searchController.best=bestMove;
  searchController.thinking=false;
}*/
// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
  board.position(game.fen())
}
function updateStatus () {
  var status = ''
  var moveColor = 'White'
  if (game.turn() === 'b') {
    moveColor = 'Black'
  }
  // checkmate?
  if (game.in_checkmate()) {
    status = 'Game over, ' + moveColor + ' is in checkmate.'
  }
  // draw?
  else if (game.in_draw()) {
    status = 'Game over, drawn position'
  }
  // game still on
  else {
    status = moveColor + ' to move'
    // check?
    if (game.in_check()) {
      status += ', ' + moveColor + ' is in check'
    }
  }
  $status.html(status)
  $fen.html(game.fen())
  $pgn.html(game.pgn())
}
var config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)
updateStatus()
function buttonPressed(){
  s=document.getElementById("fenIn").value;
  var board=Chessboard('myBoard', s);
};
function resetGame(){
  location.reload(); 
}