
var bitcoins = 0;
var bitcoinsps = 0;
var build = new Array();
var elementBitcoins;
var elementPerSecond;
var elements = new Array();
//stats
var totalBitcoins = 0;
var totalBitcoinsElement;
//end of stats
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
    build[4] = new building(5000, 55, "Dedicated hardware");
    build[5] = new building(24000, 250, "Small cluster computer");
    build[6] = new building(100000, 900, "Medium cluster computer");
    build[7] = new building(2000000, 10000, "Large cluster computer");

    function init(){
        elementBitcoins=document.getElementById("bit");
        elementPerSecond = document.getElementById("perSecond");
	totalBitcoinsElement = document.getElementById("statsTotal");
    for(var i = 1; i<=7; i++){
    elements[i] = document.getElementById("build" + i);

	}
    }
function save() {
	localStorage["bitcoins"] = JSON.stringify(bitcoins);
	localStorage["bitcoinsps"] = JSON.stringify(bitcoinsps);
	localStorage["totalBitcoins"] = JSON.stringify(totalBitcoins);
	for(var i =1; i <= 7; i++){
		localStorage["buildinga" + i] = JSON.stringify(build[i].amount);
		localStorage["buildingp" + i] = JSON.stringify(build[i].price);

	}
}

function load(){
	bitcoins = JSON.parse(localStorage["bitcoins"]);
	bitcoinsps = JSON.parse(localStorage["bitcoinsps"]);

	if (totalBitcoins === 0) {
		totalBitcoins = bitcoins;
		localStorage["totalBitcoins"] = JSON.stringify(totalBitcoins);

	}
		totalBitcoins = JSON.parse(localStorage["totalBitcoins"]);
	
    	for(var i =1; i <= 7; i++){
		build[i].amount = JSON.parse(localStorage["buildinga" + i]);
		build[i].price = JSON.parse(localStorage["buildingp" + i]);
	}
}

load();

function addCoin(){

    bitcoins = Math.round(bitcoins + 1);
	elementBitcoins.innerHTML="Bitcoins: " + bitcoins;
	totalBitcoins++;

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
	    totalBitcoins += bitcoinsps/10;
	    var rounded = Math.round(bitcoins);
	    elementBitcoins.innerHTML = "Bitcoins: " + rounded;
	    elementPerSecond.innerHTML = "Per Second: " + bitcoinsps;
	    totalBitcoinsElement.innerHTML = "Total Bitcoins: " + Math.round(totalBitcoins);
	    for (var i = 1; i <= 7; i++) {
	        elements[i].innerHTML = build[i].name + " - " + build[i].price + " Bitcoins (" + build[i].amount + ")";
	    }

	}
//	setInterval(loop,100);
	setInterval(save,10000);

	var now, before = new Date();
setInterval(function() {
    now = new Date();
    var elapsedTime = (now.getTime() - before.getTime());
    if(elapsedTime > 100){

	for(var i =0; i< elapsedTime/100; i++){
		loop();
	}
	}else{
		loop();
	}
	
	
    before = new Date();    
}, 100);
	