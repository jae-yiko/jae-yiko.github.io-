var interval;
var bothKey = 0;
var landArray = [1,2,3,4,5,6,7,8,9,10];
var randomer = [];//store random1 numbers that we are going to be generating in our forloop
var platform1 = 0;//keeps track of what landarray character1 is on 
var platform2 = 0;//keeps track of what landarray character2 is on
var checkforFall = false;
var checknextRound = false;
var totalSquare = 0;//stores the score for the square
var totalCircle = 0;//stores the score for the circle

//everything in parseInt turns into a string
//character1 comupted style is grabed by window.getComputedStyle 
//nextround function means after round1 when character 1 or 2 reaches the last land it will recreate the characters to the top of the land
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

        fallgame();//this is hadded here so that the land and hole is recreated in the upcoming rounds
    }
}

score();//calling the score function
function score()
{
//if platform1 meaning that character1 is on 10 then
    if (platform1 == 10)
    {//character1 gets 1 point
        totalSquare++
        document.getElementById("square").innerHTML = "Square: " + totalSquare;
        checknextRound = true//when character1 gets 1 point then 
        if(checknextRound == true)
        {
            console.log("blah");//this is to check on the console of the webpage to see if it is working
            nextRound();//after a point is given to character1 the round restarts for round2
            if(totalSquare == 2)//because this is a 3 round game. If character1 wins 2 points then they win
            {
                document.getElementById("square").innerHTML = "SQUARE YOU WIN!";
            
                if (platform1 == 10)//this is for some reason needed in order for line 58 to work
                {
                    console.log("blah1");
                }
            }
        }
    }    
    
    //if platform2 meaning that character2 is on 10 then
    if (platform2 == 10)
    {
        totalCircle++
        document.getElementById("circle").innerHTML = "Circle: " + totalCircle;
        checknextRound = true
        if(checknextRound == true)
        {
            console.log("blah3");
            nextRound();
            if(totalCircle == 2)
            {
                document.getElementById("circle").innerHTML = "CIRCLE YOU WIN!";

                if (platform1 == 10)
                {
                    console.log("blah4");
                }
            }
        }
    }
}

//falling1 function is for character1 to fall through the holes of the lands
function falling1(left,character)
{
    var topCheck = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    for(let j=0; j<landArray.length; j++)//from land 0-9
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
                score();//then give the point to that character
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


function moveLeft1()//moves character1 to the left
{
    let character1 = document.getElementById("character1");
    let left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));
    if(left>0)
    {
        character1.style.left = left - 2 + "px";
    }
    falling1(left, character1);//makes character1 fall when using the right key over a hole
}

function moveRight1()//moves character1 to the right
{
    let character1 = document.getElementById("character1");
    let left = parseInt(window.getComputedStyle(character1).getPropertyValue("left"));
    if(left<380)
    {
        character1.style.left = left + 2 + "px";
    }
    falling1(left,character1);//makes character1 fall when using the left key over a hole
}

function moveLeft2()//move character2 to the left
{
    let character2 = document.getElementById("character2");
    let left = parseInt(window.getComputedStyle(character2).getPropertyValue("left"));
    if(left>0)
    {
        character2.style.left = left - 2 + "px";
    }
    falling2(left,character2);//makes character2 fall when using the A key over a hole
}

function moveRight2()//moves character2 to the right
{
    let character2 = document.getElementById("character2");
    let left = parseInt(window.getComputedStyle(character2).getPropertyValue("left"));
    if(left<380)//400=width of the game and 20=width of the character 400-20=380 so that the character does not go past the end 
    {
        character2.style.left = left + 2 + "px";
    }
    falling2(left,character2);//makes character2 fall when using the D key over a hole
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


























