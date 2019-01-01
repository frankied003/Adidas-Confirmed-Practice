//animation
var app = angular.module('app', ['ngTouch']);

app.controller('MyCtrl', ['$scope', function($scope) {
  //Initial duration
  $scope.duration = 3;
}]);

app.directive('countdownNumber', ['$interval', function($interval){
  return{
    link: function(scope,element,attr){
      var timeout = $interval(function(){
        if(scope.duration>=1){
          scope.duration--;
        } else {
          $interval.cancel(timeout);
          // $state.go(...)
          element.addClass("hide");
        }        
      },1000);
      
      element.on('$destroy', function() {
        $interval.cancel(timeout);
      });
    }
  }
  
  
}]);

//my code
var display = document.querySelector("#main-captcha");
var images = document.querySelectorAll(".captcha-image img");
var captchaBox = document.querySelectorAll(".captcha-image");
var instructions = document.querySelector("#instruction-text span");
var button = document.querySelector(".btn-light");
var countdown = document.querySelector("div:not([class]):not([id])");
var confirming = document.querySelector(".loading-spinner");
var confirmedPage = document.querySelector("#confirmedPage");
var wrongImage = document.querySelector("#wrongImage");
var nonConfirmedPage = document.querySelector("#nonConfirmedPage");
var bottom = document.querySelector(".bottom");

var imagePool =["http://static5.businessinsider.com/image/58daad672dfbdb01028b4b26/adidas-is-launching-biodegradable-shoes-that-can-be-dissolved-in-36-hours.jpg",
				"https://s23705.pcdn.co/wp-content/uploads/2017/08/Membership-9.99.png",
				"http://laac.com/wp-content/uploads/RUNCA_20141210_08191.jpg",
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-EGeJhFCyQsFdO-ISS_og0F174faF6MIbYmfx-1FBWvUKeFB5",
				"https://mk0slamonlinensgt39k.kinstacdn.com/wp-content/uploads/gallery/adidas-confirmed/adidasconfirmed_1_openscreen.jpg",
				"https://www.mensjournal.com/wp-content/uploads/mf/jumprope-1280.jpg?w=1200&h=1200&crop=1",
				"https://i.pinimg.com/736x/85/63/56/8563561885d75cff78eeeef1121524f2--shoes-for-men-women-nike-shoes.jpg",
				"http://static3.businessinsider.com/image/58e7a9398af578032f8b63bb/adidas-is-finally-bringing-3d-printed-shoes-into-the-mainstream.jpg",
				"https://images.unsplash.com/photo-1520096459084-096fcc53fa43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
				];

var numbersUsed = [];
//create the code for the correct images
var randomm = Math.floor(Math.random() * imagePool.length);
var correctImage = imagePool[randomm];
//ends here ---

//to start the code
var interval2 = setInterval(function() {
	display.style.display = "";
	countdown.style.display = "none";
	clearTimeout(interval2);

	var startTime = Date.now();
	var interval = setInterval(function() {
	    var elapsedTime = Date.now() - startTime;
	    document.getElementsByClassName("timer").innerHTML = ((elapsedTime / 1000) - .35).toFixed(2);
	}, 10);

}, 4100);

generateImages();
correctImageTextGenerated();
correctImageCalc();

//create the text for the question that has to be paired with the image
function correctImageTextGenerated(){
	switch(correctImage){
		case imagePool[0]:
		instructions.textContent = " with the road";
		break;

		case imagePool[1]:
		instructions.textContent = " with the bicycle";
		break;

		case imagePool[2]:
		instructions.textContent = " with the green sneakers";
		break;

		case imagePool[3]:
		instructions.textContent = " with yellow sneakers";
		break;
		
		case imagePool[4]:
		instructions.textContent = " with the bench.";
		break;

		case imagePool[5]:
		instructions.textContent = " of jump roping";
		break;

		case imagePool[6]:
		instructions.textContent = " with the bed.";
		break;

		case imagePool[7]:
		instructions.textContent = " with the rocks";
		break;

		case imagePool[8]:
		instructions.textContent = " with the water";
		break;

		default: 
		instructions.textContent = " something went wrong...";
	}
}
	
function generateImages(){
	numbersUsed = [];
	for (var i = 0; i < imagePool.length + 100; i++){
		var random = Math.floor(Math.random() * imagePool.length);
		numbersUsed.push(random);
	}
		numbersUsed = Array.from(new Set(numbersUsed));

	for (var i = 0; i < imagePool.length; i++) {
		images[i].src = imagePool[numbersUsed[i]];
	}
}

//correct image calculation
function correctImageCalc(){
	for (var i = 0; i < imagePool.length; i++) {
	images[i].addEventListener("click", function clicks(){
		display.style.display = "none";

		if(this.src == correctImage){ 
			ConfirmingProcess();
		}
		else{
			wrongImage.style.display = "";
		}
		
		this.style.opacity = ".1";
	});
}
}

function ConfirmingProcess(){

	var start = Date.now();
	var end = start + 3000;

	var timer = setInterval(function spinning(){
		start = Date.now();
		confirming.style.display = "";
		
		if(start > end){
			clearTimeout(timer);
			confirming.style.display = "none";
		}

	}, 100);

	var timer2 = setInterval(function winChance(){
		if(document.getElementsByClassName("timer").innerHTML < 3.7){
			confirmedPage.style.display = "";
			clearTimeout(timer2);
		}
		else if(document.getElementsByClassName("timer").innerHTML > 3.7){ // 4.5 - 3.5 = 1.5 seconds to click the picture
			nonConfirmedPage.style.display = "";
			clearTimeout(timer2);
		}
	}, 3000);

}

//
//
//
//
//
//what happens when button gets clicked
// button.addEventListener("click", function(){
// 	var randomm = Math.floor(Math.random() * imagePool.length);
// 	var correctImage = imagePool[randomm];
// 	document.getElementById("timer").innerHTML = 0;
// 	generateImages();

// 	//correct images
// 	switch(correctImage){
// 		case imagePool[0]:
// 		instructions.textContent = " with the road.";
// 		break;

// 		case imagePool[1]:
// 		instructions.textContent = " on the tree.";
// 		break;

// 		case imagePool[2]:
// 		instructions.textContent = " on the beach.";
// 		break;

// 		case imagePool[3]:
// 		instructions.textContent = " with the city.";
// 		break;
		
// 		case imagePool[4]:
// 		instructions.textContent = " with the bench.";
// 		break;

// 		case imagePool[5]:
// 		instructions.textContent = " with the sign.";
// 		break;

// 		case imagePool[6]:
// 		instructions.textContent = " with the bed.";
// 		break;

// 		case imagePool[7]:
// 		instructions.textContent = " with the rocks";
// 		break;

// 		case imagePool[8]:
// 		instructions.textContent = " with the rug.";
// 		break;

// 		default: 
// 		instructions.textContent = " something went wrong...";
// 	}

// 	//correctImageCalc();
// 	for (var i = 0; i < imagePool.length; i++) {
// 	images[i].addEventListener("click", function(){
// 		clearTimeout(interval);
// 		if(this.src == correctImage){
// 			instructions.textContent = " Correct";	
// 		}
// 		else{
// 			instructions.textContent = " Wrong";
// 		}
// 	});
// 	}

// 	//timer
// 	var startTime = Date.now();
// 	var interval = setInterval(function() {
// 	    var elapsedTime = Date.now() - startTime;
// 	    document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
// 	}, 10);
// });
