// function to generate a random numeric value
const randomNumber = function(min, max){
    let value = Math.floor(Math.random()*(max-min+1)+min);
    return value;
};

// function to set name

const getPlayerName = function() {
    let name="";
    while(name==="" || name === null){
        name=prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}
let playerInfo = {
    name:getPlayerName(),
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

const fightOrSkip = function() {
    // ask player if they'd like to fight or skip using fightOrSkip function

    let promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    

    // Conditional recursive function call
    if (promptFight==="" || promptFight===null){
        window.alert("You need to provide a valid answer! Please try again");
        return fightOrSkip();
    }

    promptFight=promptFight.toLowerCase();
    // if player picks "skip" confirm and then stop the loop
    if(promptFight==="skip") {

        // confirm player wants to skip
        let confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes(true), leave fight
        if(confirmSkip){
            window.alert(playerInfo.name + " has decided to skip the fight. Goodbye!");
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            
            // return true if player wants to leave
            return true;
        }
    }
    return false;
}

// create a function named "fight"
const fight = function(enemy) {
    // keep track of who goes first
    let isPlayerTurn = true;

    if(Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health>0){

        if(isPlayerTurn){
            // ask player if they'd like to fight or skip using fightOrSkip function
            if(fightOrSkip()){
            // if true, leave fight by breaking loop
            break;
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

                // leave while()loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.")
            }
            // player gets attacked first
        } else {
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
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
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

    // check localStorage for high score, if it's not there, use 0
    let highScore = window.localStorage.getItem("highScore");
    if(highScore===null){
        highScore=0;
    }

    // if player has more money than the high score, player has new high score! 
    if(playerInfo.money>highScore) {
        localStorage.setItem("highScore",playerInfo.money);
        localStorage.setItem("name",playerInfo.name)

        window.alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!")
    } else {
        window.alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE."
    );
    shopOptionPrompt=parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        
        case 2:
            playerInfo.upgradeAttack();
            break;
        
        case 3:
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
