//Create variables here
var dog, happyDog;
var Foodobj, foodStock;
var dogImg, happyDogImg;
var feed, AddFood, position;
var database;
var feedTime, lastFeed = 0;
var bg_img;
var currentTime;
var FoodRemaining;
var changegameState, readgameState;
var gameState = "hungry";
var bedroom_img, garden_img, washroom_img, saddog_img;
function preload() {
  //load images here;
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("Happy.png");
  //bedroom_img = loadImage("Bed Room.png");
  garden_img = loadImage("Garden.png");
  washroom_img = loadImage("Wash Room.png");
  saddog_img = loadImage("Lazy.png");
}

function setup() {
  createCanvas(1000, 800);
  database = firebase.database();
  //take foodStock value from database.
  foodStoke = database.ref('foodReamining');
  foodStoke.on("value", readStoke);
  //take lastfed time from database.
  feedTime = database.ref('feedTime');
  feedTime.on("value", function (data) {
    lastFeed = data.val();
  })
  console.log(lastFeed);
  //create feed button.
  feed = createButton("FEED THE DOG");
  feed.position(500, 50);
  feed.mousePressed(FeedDog);
  //create addFood button.
  AddFood = createButton("ADD FOOD");
  AddFood.position(610, 50);
  AddFood.mousePressed(Addfood);
  //create dog sprite.
  dog = createSprite(800, 300, 50, 50);
  dog.addImage("dg", dogImg);
  dog.scale = 0.3;
  //create foodobject.
  Foodobj = new Food();
  //read gameState from the database.
  readgameState = database.ref('gameState');
  readgameState.on("value", function (data) {
    gameState = data.val();
  })
}



function draw() {
  //set bg color.
  // background(color(46, 139, 87));

  //set the game.
  if (gameState != "hungry") {
    feed.hide();
    AddFood.hide();
    dog.remove();
  } else {
    feed.show();
    AddFood.show();
    dog.addImage("dg", dogImg);
  }
  //change the bg.
  currentTime = hour();
  if (currentTime === (lastFeed + 1)) {
    update("playing");
    Foodobj.garden();
  } else if (currentTime > (lastFeed + 2) && currentTime <= (lastFeed + 4)) {
    update("bathing");
    Foodobj.washroom();
  } else {
    update("hungry");
    Foodobj.display();
  }

  drawSprites();
  //text lastfed time.

  //text foodremaining,
  fill("white");
  textSize(15);
  text("Food Remaining : " + FoodRemaining, 20, 35);



}
//read stock function.
function readStoke(data) {
  position = data.val();
  Foodobj.updateFoodStock(position);
}
//write stock
function writeStoke(x) {
  if (x > 0) {
    x = x - 1;
  }
  else {
    x = 0;
  }
  database.ref('/').set(
    { 'foodReamining': x })
}
//function to feed the dog.
function FeedDog() {
  dog.addImage("dg", happyDogImg);
  FoodRemaining = FoodRemaining - 1;
  Foodobj.updateFoodStock(Foodobj.getFoodStock() - 1);
  database.ref('/').update({
    foodReamining: Foodobj.getFoodStock(),
    feedTime: hour(),
    gameState: "hungry"
  })
}
//function to addFood.
function Addfood() {
  console.log(FoodRemaining);
  FoodRemaining = FoodRemaining + 1;
  database.ref('/').update({
    foodReamining: FoodRemaining


  })
}
//function to update gaemState.
function update(state) {
  database.ref('/').update({
    gameState: state
  })
}
