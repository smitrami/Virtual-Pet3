class Food {
    constructor() {
        this.foodStock = 90;
        this.image = loadImage('milk.png');
        this.lastFed;
    }
    updateFoodStock(foodStocke) {
        this.foodStock = foodStocke;
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }
    getFedTime(lastFeed) {
        this.lastFed = lastFeed;
    }
    getFoodStock() {
        return this.foodStock;
    }

    display() {
        background("red");
        fill(255, 255, 254);
        textSize(15);
        fill("white")
        stroke("black");
        if (lastFeed >= 12) {
            text("Last Feed : " + lastFeed % 12 + "PM", 20, 50);
        }
        else if (lastFeed === 0) {
            text("Last Feed : 12 AM", 20, 50)
        }
        else {
            text("Last Feed : " + lastFeed + "AM", 20, 50);
        }
        var x = 80, y = 170;
        imageMode(CENTER);
        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }


        }

    }
    bedroom() {
        background(bedroom_img, 1000, 800);
    }
    garden() {
        background(garden_img, 1000, 800);
    }
    washroom() {
        background(washroom_img, 500, 800)
    }

}