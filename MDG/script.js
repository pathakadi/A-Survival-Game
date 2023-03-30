// Elements
const score = document.getElementById("score") ;
const energy = document.getElementById("energy") ;
const runner = document.getElementById("runner") ;
const food = document.getElementById("food") ;
const foodName = document.getElementById("foodName") ;
const over = document.getElementById("result") ;
const overEat = document.getElementById("overEat") ;

food.classList.remove("move") ;

// Variables
var gameStart = false ;
var scoreValue = 0 ;
var energyValue = 0 ;
var mainEnergy = 500 ;
var topChange = 40 ;
var saveScore = 0 ;


// Food Array
const foodArr = ["Milk" ,"Bread","Butter","Cheese","Yogurt","Sandwich","Pancake","Pie","Honey","Waffle","Donuts",
"Salad","Meatball","Grilled chicken","Burger","Tuna","Noodles","Egg","Bacon","Pizza","French Fries","Biryani",
"Pasta","Smoked salmon","Mayonnaise","Taco","Hotdog","Dosa","Chocolate","Ice cream"]

// Fetch API
const options = {
    method: 'GET',
	headers: {
        'X-RapidAPI-Key': '99dba92fa9msh59584bf60de1c7dp1ee596jsn5899dd9dffdd',
		'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
	}
};

const getFood = (food)=>{
    foodName.innerHTML = food ;
    fetch('https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + food, options)
    .then(response => response.json())
    .then(response => energyValue = Math.round(response[0].calories) )
    .catch(err => console.error(err));
}

// Game Start
window.addEventListener("keydown" , (e)=>{
    if(e.code === "Space" && !gameStart){
        console.log("Game Started!") ;
        food.classList.add("move") ;
        gameStart = true ;
        // Random Image and Food Generating
        var CallName = setInterval(function(){
            var foodNO = Math.round(Math.random()*29) ;
            var foodImgNO = Math.round(Math.random()*11 + 1) ;
            document.getElementById("imgF").src = `Images/${foodImgNO}.jpeg` ;
            getFood(foodArr[foodNO]) ;
            food.style.top = Math.random()*(500+120) - 110  + "px";
        } , 2000)
    }
    //Checking for Game Over
    if(gameStart){
        var check = setInterval(function(){
            var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top")) ;
            if(runnerTop < 2 || runnerTop > 665 || mainEnergy <= 0){
                if(gameStart){
                    saveScore = scoreValue ;
                    console.log(saveScore) ;
                }
                var Fscore = document.getElementById("finalScore") ;
                Fscore.innerHTML = "Score : " + saveScore ;
                energy.innerHTML = "Energy : 0cal" ;

                over.style.display = "flex" ;
                runner.style.display = "none" ;
                food.style.display = "none" ;
                scoreValue = 0 ;
                gameStart = false ;
            }
        } , 1 )
        var Game = setInterval(function(){
            var foodTop = parseInt(window.getComputedStyle(food).getPropertyValue("top"));
            foodTop+=85 ;
            var foodLeft = parseInt(window.getComputedStyle(food).getPropertyValue("left")) ;
            var foodBottom = foodTop + 105 ;
            var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top")) ;
            var runnerBottom = runnerTop + 80 ;
            //If Food Grabed then Increase Score
            if(foodLeft < 290 && foodLeft > 130 && ((runnerTop < foodTop && runnerBottom > foodTop ) 
                    || (runnerTop < foodBottom && runnerBottom  > foodBottom ))){
                scoreValue++ ;
                // Check Score > High Score or not
                if(scoreValue>hiscoreval){
                    hiscoreval = scoreValue;
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                    hiscoreBox.innerHTML = "Highest Score: " + hiscoreval;
                }
                food.style.display = "none" ;
                setTimeout(function(){
                    food.style.display = "block" ;
                } , 1)
                score.innerHTML = "Score : " + scoreValue ; 
                // If food Grabed then Increase Energy
                mainEnergy = mainEnergy + energyValue ;
                energy.innerHTML = "Energy : " + mainEnergy + "cal" ;
            }
            // Decrease Energy if <= 1000 
            if(mainEnergy <= 1000){
                mainEnergy = mainEnergy - 2 ;
                overEat.style.display = "none" ;
                topChange = 40 ;
                energy.innerHTML = "Energy : " + mainEnergy + "cal" ;
            }
            // Decrease Energy if > 1000 
            else if(mainEnergy > 1000){
                mainEnergy = mainEnergy - 10 ;
                energy.innerHTML = "Energy : " + mainEnergy + "cal" ;
                topChange = 10 ;
                overEat.style.display = "flex" ;
            }
        } , 1000)
    }
    })

// Movement in Up and Down Direction
window.addEventListener("keydown" , (e)=>{
    var runnerTop = parseInt(window.getComputedStyle(runner).getPropertyValue("top")) ;
    if(e.code === "ArrowUp" && gameStart){
        runner.style.top = (runnerTop - topChange) + "px" ;
    }
    else if(e.code === "ArrowDown" && gameStart){
        runner.style.top = (runnerTop + topChange) + "px" ;
    }
})

// High Score
// To remove Highest Score -> click inspect and go in console and write 'localStorage.clear()' .
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest Score: " + hiscore;
}

// First Food
getFood("Salad") ;
