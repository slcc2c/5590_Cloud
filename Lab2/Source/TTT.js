/**
 * Created by spencer on 6/22/17.
 */
var board = new Array(3);
for(var i=0 ,i<3;i++){
    board[i]=new Array(3);
}

for(var i=0, i<3;i++){
    if(board[i][0]&&board[i][1]&&board[i][2]){
        print("WINNER")
    }
}
for(var i=0, i<3;i++){
    if(board[0][i]&&board[1][i]&&board[2][i]){
        print("WINNER")
    }
}
for(var i=0, i<3;i++){
    if(board[i][i]&&board[i][i]&&board[i][i]){
        print("WINNER")
    }
}
