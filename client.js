// variable tracks movement through carousel
var index = 0;
// variable track how large carousel is
var numLittleSquares = 1 + peopleArray.length;
// array of Person Display Banners
var arrayPersonBanners = [];
// array of little squares
var arrayLittleSquares = [];
// interval variable
var int;

$(document).ready(function(){
  console.log("I'm Here For You");
//Builds array of people objects from data.js and images.css
  addImageToPeopleArray(peopleArray);

// Adds event listeners
  addEventListeners();

// Builds the DOM on the based on information from data.js and images.css
  appendDOM(peopleArray);

  int = setInterval(advanceForward,10000);


});

// object constructor for People object with name, shoutout, img as properties
function Person(name,shoutout,image){
  console.log("Building a Person Object");
  this.name = name;
  this.shoutout = shoutout;
  this.image = image;
}

// Takes information from data.js and builds an array of objects
function addImageToPeopleArray(array){
  console.log("addImageToPeopleArray");
  for(i=0;i<array.length;i++){
    var name = array[i].name;
    var nameNoSpaces = name.replace(/\s+/g,'');
    var imageName = 'images/'+nameNoSpaces+'.jpg';
    var imageTag = "<img src="+"'"+imageName+"'"+" alt="+"'"+ name+"'"+">";
    array[i].image = imageTag;
  }
}

// Builds event listeners for the two buttons prev and next
function addEventListeners(){
  console.log("addEventListeners");
  $("#prev").on("click","button",function(){
    console.log("you clicked the prev button");
    clearInterval(int);
    advanceBackward();
    int = setInterval(advanceForward,10000);

  });

  $("#next").on("click","button",function(){
    console.log("you clicked the next button");
    clearInterval(int);
    advanceForward();
    int = setInterval(advanceForward,10000);
  });

}

function advanceForward(){
  if(index === 0){
    $("#chiYakBanner").hide();
    $("#firstSquare").removeClass("highlight");
    $("#numOutOfTotal").show();
  }
  index++;

  for(var i = 0; i < arrayLittleSquares.length; i++){
    $(arrayLittleSquares[i]).removeClass("highlight");
    $(arrayPersonBanners[i]).hide();
    if(arrayLittleSquares[i].data("order") === index){
      arrayLittleSquares[i].addClass("highlight");
      arrayPersonBanners[i].show();
      var total = peopleArray.length;
      console.log(index);
      console.log(total);
      $("#numOutOfTotal").text("Chi-Yak "+index+" of "+total);
    }
  }

  console.log("advanceForward middle", index);
  if (index === numLittleSquares){
    index = 0;
    $("#chiYakBanner").show();
    $("#firstSquare").addClass("highlight");
    $("#numOutOfTotal").hide();
  }
}


function advanceBackward(){
  console.log("advanceBackward");
  console.log("beginning", index);
  if (index === 1){
    $("#chiYakBanner").show();
    $("#firstSquare").addClass("highlight");
    $("#numOutOfTotal").hide();
  }
  index --;

  if(index === -1){
    index = (numLittleSquares-1);
    $("#chiYakBanner").hide();
    $("#firstSquare").removeClass("highlight");
    $("#numOutOfTotal").show();
  }

  for(var i = 0; i < arrayLittleSquares.length; i++){
    $(arrayLittleSquares[i]).removeClass("highlight");
    $(arrayPersonBanners[i]).hide();
    if(arrayLittleSquares[i].data("order") === index){
      arrayLittleSquares[i].addClass("highlight");
      arrayPersonBanners[i].show();
      var total = peopleArray.length;
      console.log(index);
      console.log(total);
      $("#numOutOfTotal").text("Chi-Yak "+index+" of "+total);
    }
  }
}

function showNextBanner(){

}

function appendDOM(array){
  console.log("appendDOM");
  appendPersonContainers(array);
  appendLocationDisplay();
}

function appendPersonContainers(array){
  // remember to add data tags
  console.log("appendPersonContainers");
  for(var i = 0; i < numLittleSquares-1 ; i++){
    console.log("I'm adding a new person");

    $("#carouselContainer").append("<div id='personDisplayBanner'"+
      " class='banner'></div>");
    var $el1 = $("#carouselContainer").children().last();
    $el1.data("idNum",i+1);
    $el1.hide();
    arrayPersonBanners.push($el1);

    $el1.append("<div id='picture' class='person-containers'></div>");
    var $el2 = $el1.children().last();

    $el2.append(array[i].image);

    $el1.append("<div id='nameAndShoutout' class='person-containers'></div>");
    var $el3 = $el1.children().last();

    $el3.append("<div id='nameDisplay' class='name-shoutout-containers'></div>");
    var $el4= $el3.children().last();

    $el4.append("<p class='name name-shoutout-text'>"+array[i].name+"</p>");

    $el3.append("<div id='shoutoutDisplay' class='name-shoutout-containers'></div>");
    var $el5 = $el3.children().last();

    $el5.append("<p class='shoutout name-shoutout-text'>"+array[i].shoutout+"</p>");

  }
}

function appendLocationDisplay(){

 for(var i = 0; i < (numLittleSquares)-1 ;i++){
   $("#locationDisplay").append("<div class='littleSquares'></div>");
   var $el = $("#locationDisplay").children().last();
   $el.data("order",i+1);
   arrayLittleSquares.push($el);
 }
}
