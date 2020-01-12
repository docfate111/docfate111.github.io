//file:///Users/thwilliams/Documents/Code/JS/chess/index.html
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
  window.setTimeout(makeMove, 500);
}
function makeMove(){
  var possMoves=game.moves();
  //no more possible moves->game over
  if(possMoves.length===0) return 
  //only one possible move
  if (possMoves.length===1) x=possMoves[0];
  //make move
  game.move(generateMove("b"));
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
    return getScore(playerMaxingfor);
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
function getScore(player){
  var sum=0;
  var g=game.board();
  for(let i=0; i<8; i++){
    for(let j=0; j<8; j++){
    if(g[i][j]!=null){
      if(g[i][j].color===player){
        switch(g[i][j].type){
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
        switch(g[i][j].type){
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
  }}
  return sum;
}
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