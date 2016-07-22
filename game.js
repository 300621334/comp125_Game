var area = document.getElementById("area");
var target = document.getElementById("target");
var areaW = 600;
var areaH = 600;
var targetW = 30;
var targetH = 30;
var targetSpeed = 3000;
var score = 0;
var showScore = document.getElementById("score");
var showLevel = document.getElementById("level");
var level = 1;
var counter = 1;
var changeLevelAfterScore = 3;
var moveInterval;


function placeTarget() {
    clearInterval(moveInterval);
    var maxX = areaW - targetW; var maxY = areaH - targetH;
    var targetX, targetY;
    targetX = Math.floor(Math.random() * (maxX + 1));
    targetY = Math.floor(Math.random() * (maxY + 1));
    target.style.top = targetY + "px";
    target.style.left = targetX + "px";
    target.addEventListener("click", scoreUp, false);


    moveInterval = setInterval(placeTarget, targetSpeed);

    //Math.floor rounds "down". Math.random gives 0 to 0.99999 inclusive... NOT 1.
    //To get min-to-max "both inclusive" use following scheme:
    //Math.floor(Math.random() * (max-min+1)) + min;
}

function startTarget() {
    //initial target pos on load=left-upper corner.
    area.style.width = areaW + "px";
    area.style.height = areaH + "px";
    target.style.width = targetW + "px";
    target.style.height = targetH + "px";

    //move target to new random pos
    placeTarget();
}

function scoreUp() {
    ++score;
    showScore.innerHTML = "Score: " + score;
    target.removeEventListener("click", scoreUp, false);

    
    if (counter % changeLevelAfterScore == 0)
    {
        targetSpeed = targetSpeed - 500;
        showLevel.innerHTML = "Level: " + ++level;
    }
    counter++;
}




window.addEventListener("load", startTarget, false);

























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




