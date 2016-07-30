var area = document.getElementById("area");
var target = document.getElementById("target");
var aim = document.getElementById("aim");
var areaW = 500, areaH = 720;
var targetW = 145, targetH = 90; //fly.gif aspect ratio is 1.605 width/height
var aimW = 50, aimH = 50, aimL = 0, aimT = 0;
var targetSpeed = 3000;
var score = 0;
var showScore = document.getElementById("score");
var showLevel = document.getElementById("level");
var level = 1;
var counter = 1;
var changeLevelAfterScore = 3;
var moveInterval;


var canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 720;
area.appendChild(canvas);
var ctx = canvas.getContext("2d");
canvas.style.marginLeft= "auto";
canvas.style.marginRight = "auto";
canvas.style.position = "absolute";
canvas.style.top = "0";


function placeTarget() {
    clearInterval(moveInterval);
    var maxX = areaW - targetW; var maxY = areaH - targetH;
    var targetX, targetY;
    targetX = Math.floor(Math.random() * (maxX + 1));
    targetY = Math.floor(Math.random() * (maxY + 1));
    target.style.top = targetY + "px";
    target.style.left = targetX + "px";
    target.addEventListener("click", scoreUp, false);//ONLY if successful click then goes to scoreUp.


    moveInterval = setInterval(placeTarget, targetSpeed);

    //Math.floor rounds "down". Math.random gives 0 to 0.99999 inclusive... NOT 1.
    //To get min-to-max "both inclusive" use following scheme:
    //Math.floor(Math.random() * (max-min+1)) + min;
}

function startTarget() {
    //initial target pos on load=left-upper corner.
    area.style.width = areaW + "px";
    area.style.height = areaH + "px";
   
}

function scoreUp() {
    clearInterval(moveInterval);//on successful click, stop movement of target. To show fireworks.
    showFirework();
    ++score;
    showScore.innerHTML = "Score: " + score;
    target.removeEventListener("click", scoreUp, false);//cannot 2nd click till target moves

    
    if (counter % changeLevelAfterScore == 0)
    {
        targetSpeed = targetSpeed - 500;
        showLevel.innerHTML = "Level: " + ++level;
    }
    counter++;
}

function showFirework()
{
    var targetEle = document.getElementById("target");
    targetEle.style.backgroundImage = "url(firework.gif)";
    //targetEle.style.backgroundImage = "url(splash.gif)";
    //http://gifduration.konstochvanligasaker.se/ to see duration of firework.GIF w is 2480 millisec. 
    setTimeout(function () { moveInterval = setInterval(placeTarget, targetSpeed); loadSelectedImg(); placeTarget(); }, 1600);
    
}

function speedReset()
{
    targetSpeed = 3000;
    level = 1; showLevel.innerHTML = "Level: " + level;
    startTarget();
}

function gameReset()
{
    targetSpeed = 3000;
    score = 0; showScore.innerHTML = "Score: " + score;
    level = 1; showLevel.innerHTML = "Level: " + level;
    startTarget();

}

function startGame()
{
    target.style.width = targetW + "px";
    target.style.height = targetH + "px";
    

    var targetEle = document.getElementById("target");
    var targetImageSelected = document.querySelectorAll("aside input");
    if(targetImageSelected[0].checked)
        targetEle.style.backgroundImage = "url(monkey.gif)";
    else if (targetImageSelected[1].checked)
        targetEle.style.backgroundImage = "url(fly.gif)";

    loadSelectedImg();//load selected target img

    //move target to new random pos
    placeTarget();
    drawAim();
}
function drawAim() {
    aim.style.width = aimW + "px";
    aim.style.height = aimH + "px";
    aim.style.backgroundColor = "red";
    aim.style.borderRadius = (aimH * 0.5) + "px";
    aim.style.position = "absolute";
    aim.style.left = aimL + "px";
    aim.style.top = aimT + "px";
    //aim.style.zIndex = "9";
}


function loadSelectedImg()
{
    var targetEle = document.getElementById("target");
    var targetImageSelected = document.querySelectorAll("aside input");
    if (targetImageSelected[0].checked)
        targetEle.style.backgroundImage = "url(monkey.gif)";
    else if (targetImageSelected[1].checked)
        targetEle.style.backgroundImage = "url(fly.gif)";
}


addEventListener("keydown", function (e) {
    if(e.keyCode == 40)
    {
        e.preventDefault(); //prevent downarrow from scrolling scroll-bar.
        drawAim(); //re-draw aim
        aimT = aimT + 5; //move aim
    }
}, false);


window.addEventListener("load", startTarget, false);
document.getElementById("btnSpeedReset").addEventListener("click", speedReset ,false);
document.getElementById("btnGameReset").addEventListener("click", gameReset, false);

document.getElementById("startGame").addEventListener("click", startGame, false);




























//how to access obj prop http://www.w3schools.com/js/js_objects.asp ---&--- http://www.w3schools.com/jS/js_properties.asp


////create canvas:
//var canvas = document.createElement("canvas");
////add context to canvas. Context is then used to channel functionality to canvas:
//var ctx = canvas.getContext("2d");
//canvas.width = 600;
//canvas.height = 600;
//canvas.style.background  = "green"; //not working
//document.body.appendChild(canvas);

////create target:
//var target = document.createElement("div");
//target.style.width = "300px";
//target.style.height = "300px";
//target.style.background = "red";
//target.style.display = "block";
//target.style.zIndex = "10";
//canvas.appendChild(target);




