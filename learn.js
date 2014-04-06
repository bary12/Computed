
var bitcoins = 0;
var bitcoinsps = 0;
var build = new Array();
var elementBitcoins;
var elementPerSecond;
var elements = new Array();

init();

function building(price, bps, name) {
    this.price = price;
    this.bps = bps;
    this.name = name;
    this.amount = 0;

}
building.prototype.buy = function () {

    if (bitcoins >= this.price) {
        this.amount++;
        bitcoins -= this.price;
        this.price *= 1.15;
        bitcoinsps += this.bps;
        this.price = Math.round(this.price);
        return "Succes!";
    }
};
    build[1] = new building(70, 1, "Junky laptop");
    build[2] = new building(300, 4, "Average PC");
    build[3] = new building(1000, 15, "Gaming PC");
    build[4] = new building(5000, 70, "Dedicated hardware");
    build[5] = new building(24000, 300, "Small cluster computer");
    build[6] = new building(100000, 1000, "Medium cluster computer");
    build[7] = new building(500000, 4500, "Large cluster computer");

    function init(){
        elementBitcoins=document.getElementById("bit");
        elementPerSecond = document.getElementById("perSecond");
    for(var i = 1; i<=7; i++){
    elements[i] = document.getElementById("build" + i);

	}
    }
function save() {
	localStorage["bitcoins"] = JSON.stringify(bitcoins);
	localStorage["bitcoinsps"] = JSON.stringify(bitcoinsps);
	for(var i =1; i <= 7; i++){
		localStorage["buildinga" + i] = JSON.stringify(build[i].amount);
		localStorage["buildingp" + i] = JSON.stringify(build[i].price);

	}
}

function load(){
	bitcoins = JSON.parse(localStorage["bitcoins"]);
	bitcoinsps = JSON.parse(localStorage["bitcoinsps"]);

    	for(var i =1; i <= 7; i++){
		build[i].amount = JSON.parse(localStorage["buildinga" + i]);
		build[i].price = JSON.parse(localStorage["buildingp" + i]);

	}
}

load();

function addCoin(){

    bitcoins = Math.round(bitcoins + 1);
elementBitcoins.innerHTML="Bitcoins: " + bitcoins;


}

	function bitcoinImg(id) {
		var element = document.getElementById("bitcoins");
		element.src="http://i.imgur.com/xjjPWK2.png";
	}
	
		function bitcoinImg2(id) {
		var element = document.getElementById("bitcoins");
		element.src="http://i.imgur.com/WxpuJtY.png";
	}


	var loop = function () {

	    bitcoins += bitcoinsps / 10;
	    var rounded = Math.round(bitcoins);
	    elementBitcoins.innerHTML = "Bitcoins: " + rounded;
	    elementPerSecond.innerHTML = "Per Second: " + bitcoinsps;
	    for (var i = 1; i <= 7; i++) {
	        elements[i].innerHTML = build[i].name + " - " + build[i].price + " Bitcoins (" + build[i].amount + ")";
	    }

	}

    setInterval(loop,100);
	setInterval(save,30000);