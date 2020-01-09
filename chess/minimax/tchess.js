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
  updateStatus()
  window.setTimeout(makeMove, 250)
  //console.log(game.moves());
}
function makeMove(){
  var possMoves=game.moves();
  //no more possible moves->game over
  if(possMoves.length===0) return 
  //only one possible move
  if (possMoves.length===1) x=possMoves[0];
  var x=generateMove(possMoves);
  //make move
  game.move(x);
  //update board
  board.position(game.fen());
}
function generateMove(possMoves){
  var maxMove=possMoves[Math.floor(Math.random() * possMoves.length)];
  for(var i=0; i<game.moves().length; i++){
    game.move(possMoves[i]);
    if(getScore(board)>maxMove){
     maxMove=possMoves[i];
    }
    game.undo();
  }
  return maxMove;
}
function getScore(){
  var sum=0;
  var g=game.board();
  for(let i=0; i<8; i++){
    for(let j=0; j<8; j++){
    if(g[i][j]!=null){
      if(g[i][j].color==="w"){
        switch(g[i][j]){
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
            sum-=9;
            break;
          case "k":
            sum-=18;
            break;
          case "r":
            sum-=5;
            break;
          default:
            sum-=0;
        }
      }
      if(g[i][j].color==="b"){
        switch(g[i][j]){
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
            sum+=9;
            break;
          case "k":
            sum+=18;
            break;
          case "r":
            sum+=5;
            break;
          default:
            sum+=0;
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