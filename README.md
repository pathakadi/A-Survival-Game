# A-Survival-Game

A Project on MDG Problem Statement in which we have to Develop a survival-based runner game that utilizes an external food API to enable players to gain energy and continue running. The game will start with the player having a certain amount of energy in the form of calories, which will decrease as the player runs. The main goal of the game is to survive as long as possible by collecting food items that appear on the screen. The game will use images of various food items from the API as pickups and calorie values to determine the energy gained by the player. Additionally, if the player consumes more calories than a certain threshold, the player's speed will decrease, making it harder to collect food items and progress further in the game.

I have done this project using HTML , CSS and JavaScript and by fetching API from RapidAPI and storing the score in Firebase Database.I have created a basic Markup which contain a Nav Bar containing  game name, logo, High Score, Score, and Energy.Then a container containing A GIF of Running and A Different food Images and Foodname.Then a overEat part which pops out when energy is more than a certain threshold having opacity 0.7 .Then a result div which pops out when Game Ends and containing a "Game Over" message your current score and A Restart Button.I have included a External StyleSheet and JavaScript.

The stylesheet first imports 2 Google Fonts and then normal styling and adding a animation to food in which food will move from right to left in certain time and this animation is infinite and linear no delay and after some time food will change its position randomly at start and also at middle.result div display is set to none as we need that interface when player gets out.

The JavaScript code contain some element and Variables and food Array containing different food names.Then I fetched a API that gives you Calories if that Food is Eaten.And using Event Listner our character moves in upward or downward direction.
