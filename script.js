


let diceNum=6;
let diceAng=0;
let allowDiceRoll=true;
let playerScore=0;
let aiScore=0;
let playerTurn = true;
let playerScoreHeld=0;
let aiScoreHeld=0;
let playerWins=0;
let aiWins=0;

let remainingAiTurns = 3;




document.getElementById("dots").setAttribute('draggable', false);
document.getElementById("dots").addEventListener("click",rollDice);
document.getElementById("hold").addEventListener("click", hold);
document.getElementById("newGame").addEventListener("click", newGame);
document.getElementById("ok").addEventListener("click", hideHowTo);
document.getElementById("howToTrigger").addEventListener("click", showHowTo);


enableHoldButton(false);



newGame();


function newGame()
{
    playerScore=0;
    aiScore=0;
    playerTurn=true;
    playerScoreHeld=0;
    aiScoreHeld=0;
    remainingAiTurns = 3;

    document.getElementById("playerBox").style.scale=1.1;
    document.getElementById("aiBox").style.scale=1;

    document.getElementById("playerHeldValue").textContent= `Held: ${playerScoreHeld}`;
    document.getElementById("aiHeldValue").textContent=`Held: ${aiScoreHeld}`;

    document.getElementById("playerScore").textContent=playerScore;
    document.getElementById("aiScore").textContent=aiScore;

    document.getElementById("playerBox").style.color=null;
    document.getElementById("aiBox").style.color="rgb(90,90,90)";

    document.getElementById("playerBanner").style.backgroundColor = null;
    document.getElementById("aiBanner").style.backgroundColor = "rgb(50,50,50)";

    enableHoldButton(false);

    document.getElementById("winScreen").style.visibility = "hidden";
}



function enableHoldButton(enable)
{
    if (enable == false) 
    {
        document.getElementById("hold").style.scale = 1;
        document.getElementById("hold").style.backgroundColor = "rgb(112, 112, 112)";
        document.getElementById("hold").style.color = "rgb(151, 151, 151)";
    }
    else
    {
        document.getElementById("hold").style.scale = null;
        document.getElementById("hold").style.backgroundColor = null;
        document.getElementById("hold").style.color = null;
    }
}


function showHowTo()
{
    document.getElementById("howTo").style.visibility = "visible";
}
function hideHowTo()
{
    document.getElementById("howTo").style.visibility = "hidden";
}



function triggerAiRoll()
{
    if (!playerTurn)
    {
        if (remainingAiTurns>0)
        {
            remainingAiTurns -= 1;
            rollDice();
        }
        else
        {
            hold();
        }
    }
}


function hold()
{
    if (allowDiceRoll && (!playerTurn || (playerTurn && playerScore>playerScoreHeld)))
    {
        if (playerTurn) 
        {
            playerScoreHeld=playerScore;
        }
        if (!playerTurn) aiScoreHeld=aiScore;

        document.getElementById("playerHeldValue").textContent= `Held: ${playerScoreHeld}`;
        document.getElementById("aiHeldValue").textContent=`Held: ${aiScoreHeld}`;

        swapTurns();
    }
}


function rollDice()
{
    if (allowDiceRoll)
    {
        let rng = 6 + Math.ceil(Math.random()*6);
        let root = document.querySelector(':root');


        root.style.setProperty('--prevDiceAng', `${diceAng}deg`);
        diceAng+=rng*41;
        root.style.setProperty('--diceAng', `${diceAng}deg`);


        document.getElementById("dots").style.animation = "resetSpin 0s forwards";
        setTimeout(delaySpinAnim, 1);



        for (let i = 0; i < rng; i++)
        {
            setTimeout(dicePlusOne, 180*i);
        }

        allowDiceRoll=false;
        setTimeout(diceRollCoolDown, (230*rng)+220);
    }
}




function diceRollCoolDown()
{
    allowDiceRoll=true;

    let rollFail = false;
    let hasWon = false;
    let winValue = 20;
    if(diceNum==1 || diceNum==2) rollFail=true;

    if (!rollFail)
    {
        if (playerTurn)
        {
            playerScore+=(diceNum);
            if (playerScore>=winValue) hasWon=true;

            enableHoldButton(true);
        }
        else
        {
            aiScore+=(diceNum);
            if (aiScore>=winValue) hasWon=true;
        }
    }
    else
    {
        playerScore=playerScoreHeld;
        aiScore=aiScoreHeld;
    }


    document.getElementById("playerScore").textContent=playerScore;
    document.getElementById("aiScore").textContent=aiScore;


    if (hasWon)
    {
        winScreen();
    }
    else
    {
        if (rollFail) swapTurns();
        if (!playerTurn) triggerAiRoll();
    }
}



function winScreen()
{
    if (playerTurn) 
    {
        playerWins+=1;
        document.getElementById("winText").textContent = "PLAYER WINS";
    }
    else 
    {
        aiWins+=1;
        document.getElementById("winText").textContent = "AI WINS";
    }
    document.getElementById("playerWins").textContent=`Wins: ${playerWins}`;
    document.getElementById("aiWins").textContent=`Wins: ${aiWins}`;


    document.getElementById("aiCrown").style.visibility = "hidden";
    document.getElementById("playerCrown").style.visibility = "hidden";
    if (playerWins>aiWins) document.getElementById("playerCrown").style.visibility = "visible";
    if (playerWins<aiWins) document.getElementById("aiCrown").style.visibility = "visible";

    document.getElementById("winScreen").style.visibility = "visible";
}


function swapTurns()
{
    playerTurn=!playerTurn;

    remainingAiTurns = Math.ceil(Math.random()*3);

    if (playerTurn)
    {
        document.getElementById("playerBox").style.scale=1.1;
        document.getElementById("aiBox").style.scale=1;

        document.getElementById("playerBox").style.color=null;
        document.getElementById("aiBox").style.color="rgb(90,90,90)";

        document.getElementById("playerBanner").style.backgroundColor = null;
        document.getElementById("aiBanner").style.backgroundColor = "rgb(50,50,50)";
    }
    else
    {
        triggerAiRoll();

        document.getElementById("playerBox").style.scale=1;
        document.getElementById("aiBox").style.scale=1.1;

        document.getElementById("playerBox").style.color="rgb(90,90,90)";
        document.getElementById("aiBox").style.color=null;

        document.getElementById("playerBanner").style.backgroundColor = "rgb(50,50,50)";
        document.getElementById("aiBanner").style.backgroundColor = null;
    }

    enableHoldButton(false);
}



function delaySpinAnim()
{
    document.getElementById("dots").style.animation = "spin 2s forwards";
}




function dicePlusOne()
{
    diceNum+=1;
    if (diceNum>6)diceNum -= 6;

    document.getElementById("dots").src = `images/d${diceNum}.png`;
}

