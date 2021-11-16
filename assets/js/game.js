// create a function named "fight"
let playerName = window.prompt("What is your robot's name?");
let playerHealth = 100;
let playerAttack = 10;
let playerMoney = 10;

console.log(playerName, playerHealth, playerAttack);

let enemyNames = ["Roborto","Amy Android", "Robo Trumble"];
let enemyHealth = 50;
let enemyAttack = 12;

const fight = function(enemyName) {
    // repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth>0){
        // Alert players that they are starting the round
        // window.alert("Welcome to Robot Gladiators!");

        let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if(promptFight==="skip" || promptFight==="SKIP") {

            // confirm player wants to skip
            let confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes(true), leave fight
            if(confirmSkip){
                window.alert(playerName + " has decided to skip the fight. Goodbye!");
                // subtract money from playerMoney for skipping
                playerMoney -=10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        // Subtract the value of "playerAttack" from the value of "enemyHealth" and use that to update the value in the "enemyHealth" variable
        enemyHealth -=playerAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

        // check enemy's health
        if(enemyHealth<=0){
            window.alert(enemyName+ " has died!");

            // award player money for winning
            playerMoney +=20;
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.")
        }

        // Subtract the value of "enemyAttack" from the value of "playerHealth" and use that to update the value in the "playerHealth" variable
        playerHealth -=enemyAttack;

        // Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

        // check player's health
        if(playerHealth<=0){
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has "+ playerHealth + " health left.");
        }
    }
};

for(var i=0; i< enemyNames.length; i++){
    let pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}