/**
 * Created by spencer on 6/16/17.
 */
var player1 = Math.random()
var player2 = Math.random()

var player1_choice
var player2_choice

if (player1 < .3333){
    player1_choice = "Rock"
}
else if (.3333 <player1 < .66666){
    player1_choice = "Paper"
}
else{
    player1_choice = "Scissors"
}

if (player2 < .3333){
    player2_choice = "Rock"
}
else if (.3333 <player2 < .66666){
    player2_choice = "Paper"
}
else{
    player2_choice = "Scissors"
}

switch (player1_choice){
    case "Rock":
        if (player2_choice === "Paper"){
            print("Player 2 Wins")
        }
        else if (player2_choice === "Scissors"){
            print("Player 1 Wins")
        }
        else {
            print("TIE")
        }
        break;
    case "Paper":
        if (player2_choice === "Scissors"){
            print("Player 2 Wins")
        }
        else if (player2_choice === "Rock"){
            print("Player 1 Wins")
        }
        else {
            print("TIE")
        }
        break;
    default:
        if (player2_choice === "Paper"){
            print("Player 1 Wins")
        }
        else if (player2_choice === "Rock"){
            print("Player 2 Wins")
        }
        else {
            print("TIE")
        }
        break;
}
