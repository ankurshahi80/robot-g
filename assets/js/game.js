// function to generate a random numeric value
const randomNumber = function(min, max){
    let value = Math.floor(Math.random()*(max-min+1)+min);
    return value;
};

let playerInfo = {
    name:window.prompt("What is your robot's name?"),
    health: 100,
    attack:10,
    money:10,
    reset: function() {
        this.health=100;
        this.money = 10;
        this.attack=10;
    },
    refillHealth: function () {
        if(this.money >=7){
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health+= 20;
            this.money -=7;
        }
        else {
            window.alert("you don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money>=7){
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack +=6;
            this.money -=7;
        }
        else {
            window.alert("you don't have enough money!");
        }
    }
};

console.log(playerInfo.name, playerInfo.health, playerInfo.attack);

let enemyInfo = [
    {
        name:"Roborto",
        attack:randomNumber(10,14)
    },
    {
        name:"Amy Android",
        attack:randomNumber(10,14)
    },
    {
        name:"Robo Trumble",
        attack:randomNumber(10,14)
    }
];

// create a function named "fight"
const fight = function(enemy) {
    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health>0){
        
        let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if(promptFight==="skip" || promptFight==="SKIP") {

            // confirm player wants to skip
            let confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes(true), leave fight
            if(confirmSkip){
                window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
                // subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }

        // Subtract the value of "playerInfo.attack" from the value of "enemy.health" and use that to update the value in the "enemy.health" variable
        var damage = randomNumber(playerInfo.attack-3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

        // check enemy's health
        if(enemy.health<=0){
            window.alert(enemy.name+ " has died!");

            // award player money for winning
            playerInfo.money +=20;
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.")
        }

        // Subtract the value of "enemy.attack" from the value of "playerInfo.health" and use that to update the value in the "playerInfo.health" variable
        var damage = randomNumber(enemy.attack -3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log a resulting message to the console so we know that it worked.
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

        // check player's health
        if(playerInfo.health<=0){
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has "+ playerInfo.health + " health left.");
        }
    }
};

// function to start a new game
const startGame = function(){
    // reset player stats
    playerInfo.reset();

    for(let i=0; i< enemyInfo.length; i++){
        if(playerInfo.health>0){
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));
            let pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            // if we are not at the last enemy in the array
            if (playerInfo.health>0 && i< enemyInfo.length - 1){
                // ask if player wants to use the store before next round
                let storeConfirm = window.confirm("This fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
                
            }
        } else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }   
    }
    endGame();
}

// function to end the entire game
const endGame = function() {
    window.alert("The game has now eneded. Let's see how you did!");

    // if player is still alive, player wins! 
    if(playerInfo.health >0){
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle!");
    }

    // ask player if they'd like to play again
    let playAgainConfirm = window.confirm("Would you like to play again?");

    if(playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

const shop = function() {
    //  ask player what they'd like to do
    let shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        
        case "UPGRADE":    
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        
        case "LEAVE":
        case "leave":
            window.alert("leaving the store");
            
            // do nothing, so function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            //  call shop() again to force player to pick a valid option
            shop();
            break;
    }
};
// start the game when the page loads
startGame();
