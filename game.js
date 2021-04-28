//https://www.youtube.com/watch?v=gX3gSJ43f7I      1.24     https://www.youtube.com/watch?v=bG2BmmYr9NQ 

var interval;
var bothKey = 0;
var landArray = [1,2,3,4,5,6,7,8,9,10];
var randomer = [];//store random1 numbers that we are going to be generating in our forloop
var platform1 = 0;//keeps track of what landarray character is on 
var platform2 = 0;
var checkforFall = false;
var checknextRound = false;
var totalSquare = 0;
var totalCircle = 0;

//everything in parseInt turns into a string
//character1 comupted style is grabed by window.getComputedStyle 

function nextRound()
{//if square or circle square =1 then reset the game but save the score
    if (platform1 == 10 || platform2 == 10)
    console.log("nextroundplatform10");
    for(let i=0; i<landArray.length; i++)
    {
        let game = document.getElementById("game");
        game.innerHTML="";
        let character1 = document.createElement("div");
        let character2 = document.createElement("div");
        //var topCheck1 = parseInt(window.getComputedStyle(character1).getPropertyValue("top"));
        //var topCheck2 = parseInt(window.getComputedStyle(character2).getPropertyValue("top"));
        character1.setAttribute("id", "character1");
        character2.setAttribute("id", "character2");
        game.append(character2);
        game.append(character1);
        //character1.style.top = topCheck1;
        //character2.style.top= topCheck2;
        
        platform1 = 0;
        platform2 = 0;

        checknextRound = false;

        fallgame();
    }
}

score();
function score()
{
    //var circleScore = 0;
    if (platform1 == 10)
    {
        totalSquare++
        document.getElementById("square").innerHTML = "Square: " + totalSquare;
        checknextRound = true
        //if this is true then change the hole arragment
        if(checknextRound == true)
        {
            console.log("balh");
            nextRound();
            if(totalSquare == 2)
            {
                document.getElementById("square").innerHTML = "SQUARE YOU WIN!";
            
                if (platform1 == 10)
                {
                    console.log("balh1");
                }
            }
        }
    }    
    
    if (platform2 == 10)
    {
        totalCircle++
        document.getElementById("circle").innerHTML = "Circle: " + totalCircle;
        checknextRound = true
        if(checknextRound == true)
        {
            console.log("asdg");
            nextRound();
            if(totalCircle == 2)
            {
                document.getElementById("circle").innerHTML = "CIRCLE YOU WIN!";

                if (platform1 == 10)
                {
                    console.log("balh2");
                }
            }
        }
    }
}


function falling1(left,character)
{
    var topCheck = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    for(let j=0; j<landArray.length; j++)
    {
        if(left >= randomer[platform1] && left <= randomer[platform1] + 50)//is left more than random1
        {
            character.style.top = topCheck + 2 + "px";
            checkforFall = true;//checks if character is falling or not
        }
        else//if character is not in the hole then
        {
            if(checkforFall == true)
            {
                platform1++;
                checkforFall= false;//stops character from falling because I am now on a new platform
                score();
            }
        }
    }
}

function falling2(left,character)
{
    var topCheck = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    for(let j=0; j<landArray.length; j++)
    {
        if(left >= randomer[platform2] && left <= randomer[platform2] + 50)//is left more than random1
        {
            character.style.top = topCheck + 2 + "px";
            checkforFall = true;//checks if character is falling or not
        }
        else//if character is not in the hole then
        {
            if(checkforFall == true)
            {
                platform2++;
                checkforFall= false;//stops character from falling because I am now on a new platform
                score();
            }
        } 
    }
}


function moveLeft1()
{
    let character1 = document.getElementById("character1");
    let left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));
    if(left>0)
    {
        character1.style.left = left - 2 + "px";
    }
    falling1(left, character1);
}

function moveRight1()
{
    let character1 = document.getElementById("character1");
    let left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));
    if(left<380)
    {
        character1.style.left = left + 2 + "px";
    }
    falling1(left,character1);
}

function moveLeft2()
{
    let character2 = document.getElementById("character2");
    let left = parseInt(window.getComputedStyle(character2).getPropertyValue("left"));
    if(left>0)
    {
        character2.style.left = left - 2 + "px";
    }
    falling2(left,character2);
}

function moveRight2()
{
    let character2 = document.getElementById("character2");
    let left = parseInt(window.getComputedStyle(character2).getPropertyValue("left"));
    if(left<380)//400=width of the game and 20=width of the character 400-20=380 so that the character does not go past the end 
    {
        character2.style.left = left + 2 + "px";
    }
    falling2(left,character2);
}
document.addEventListener("keydown", event => 
{
    if(bothKey == 0)//if both key left and right arrow keys are pressed at the time time it wil not make the character1 go to the left and to the right
    {
        bothKey++;

        if (event.code === "ArrowLeft")
        {
            interval = setInterval(moveLeft1, 1);//the 1 here means 1 second and because once the interval start it will consitantly keep going to the left 
        }
        if (event.code === "ArrowRight")
        {
            interval = setInterval(moveRight1, 1);
        }

        if (event.code === "KeyA")
        {
            interval = setInterval(moveLeft2, 1);//the 1 here means 1 second and because once the interval start it will consitantly keep going to the left 
        }
        if (event.code === "KeyD")
        {
            interval = setInterval(moveRight2, 1);
        }
    }
});



document.addEventListener("keyup", event =>//when we unclick the arrow keys it will stop moving the character
{
    clearInterval(interval);
    bothKey = 0;
});

fallgame();//this calls the line and makes the level1 function work
function fallgame()
{
    let game = document.getElementById("game");

    for (let i=0; i<landArray.length; i++)
    {
        //let fallgame = document.createElement("div");
        let land = document.createElement("div");
        let hole1 = document.createElement("div");

        land.setAttribute("class", "land");
        land.setAttribute("id", "land");//count here will give different ids to lines 102,104,106
        hole1.setAttribute("class", "hole1");
        hole1.setAttribute("id", "hole1");

        //random1 starting point of
        let random1 = Math.floor(Math.random() * 330);//width of the game =400 minus width of hole 40=360-30 so that the hole will not go all the way to the right otherwise the character seems to just slide all the way down
        randomer.push(random1);
        hole1.style.left = random1 + "px";

        game.append(land);
        land.append(hole1);
        console.log("fallgame");

    }
}


























