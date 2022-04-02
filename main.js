/*

Kosbie Clicker

- Cookie = circular Kosbie face image
- Clicking on it makes it smaller, 0.05 seconds later it becomes larger
- Counter of # of kosbies you have so far at top
- You can name your XXXX by clicking on the banner

- Items:
    - TAs (image of Sean)
    - Axolotls
    - Freddies
    - Tetronimos
    - Tomatoes

Steps:
1. When you click on Kosbie, counter goes up
2. When you click on banner, prompt to rename appears
3. Onload, create the divs for each item type
4. For each item type, create an object (put in array)
5. When you click on them, another one is purchased (changes price)
6. Purchasing objects affects rate of Kosbie generation
*/

var kosbies = 0;
var rate = 0;
var lecHall = document.getElementById("lec-hall");
var kozImage = document.getElementById("koz");
var kozCount = document.getElementById("kosbies");
var kozRate = document.getElementById("kps");
var purchases = document.getElementById("purchases");

function updateStats() {
    kozRate.innerHTML = rate;
    kozCount.innerHTML = kosbies;
}

function rename() {
    var name = prompt("What is your name?", "Mellon");
    lecHall.innerHTML = `${name}'s Lecture Hall`
}

// Called when you click on the giant kosbie face
function clickKoz() {

    // Add one to the count
    kosbies += 1;
    kozCount.innerHTML = kosbies;

    // Shrink the face, then unshrink it 0.05 sec later
    kozImage.style.width = "95%";
    var callback = () => {kozImage.style.width = "100%";}
    setTimeout(callback, 50);
}

// Class to store each purchase type
class Purchase {
    constructor (name, imageURL, cost, rate) {
        this.name = name;
        this.imageURL = imageURL;
        this.count = 0;
        this.cost = cost;
        this.rate = rate;
        this.createDiv();
    }
    
    // Creates a div tag in the HTML associated with this object
    createDiv() {
        var result = `
        <a id="${this.name}" href="#" class="list-group-item list-group-item-action"></a>`
        // This is stupid as well
        purchases.insertAdjacentHTML("beforeend", result);
        this.updateHTML();
        var wrapper = document.getElementById(this.name);
        console.log(wrapper)
        // this is super dumb
        var _this = this;
        wrapper.onclick = function() {
            console.log("test" + _this.name);
            _this.purchase()
        }
    }

    // Updates the inner HTML of the div tag to reflect an updated count/cost
    updateHTML() {
        var wrapper = document.getElementById(this.name);
        var result = `                        
        <div class="row">
            <div class="col-4">
                <img src="${this.imageURL}" class="store-img">
            </div>
            <div class="col">
                <h5 class="mb-1">${this.name}</h5>
                <p class="mb-1">${this.count} purchased</p>
                <p class="mb-1">${this.rate} kosbies per second</p>
                <small>${this.cost.toFixed(2)} kosbies</small>    
            </div>
        </div>`
        wrapper.innerHTML = result;
    }

    // Purchases one of the item (if there are enough Kosbies), increasing
    // the cost in the process.
    purchase() {
        if (kosbies >= this.cost) {
            kosbies -= this.cost;
            kosbies = Math.floor(kosbies)
            kozCount.innerHTML = kosbies;
            rate += this.rate;
            kozRate.innerHTML = rate;
            this.count += 1;
            this.cost *= 1.15;
            this.updateHTML();
            updateStats();
        }
    }
}

// Initialize the purchase objects and put in an array
var purchaseArr = [];
purchaseArr.push(new Purchase("TA", "https://www.cs.cmu.edu/~112/staff-photos/yizes.jpg", 10, 1));
purchaseArr.push(new Purchase("Axolotl", "https://i.pinimg.com/originals/7f/77/c3/7f77c3fd38277c083977522b6ce532e0.jpg", 100, 10));
purchaseArr.push(new Purchase("Freddy", "https://www.kosbie.net/cmu/fall-20/15-112/notes/hw11-teddyFractal.png", 1000, 100));
purchaseArr.push(new Purchase("Tetronimo", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/All_5_free_tetrominoes.svg/640px-All_5_free_tetrominoes.svg.png", 10000, 1000));
purchaseArr.push(new Purchase("Tomato", "https://media.istockphoto.com/vectors/splashes-of-red-tomatoes-on-the-wall-vector-id480491853?k=20&m=480491853&s=612x612&w=0&h=ZrGFvQ38KcVsvxFka2SQW0vEipVgNqOFwf21PTOz0v0=", 10000, 1000));

function tick() {
    kosbies += rate;
    updateStats();
}

setInterval(tick, 1000);