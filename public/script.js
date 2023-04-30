
// prints "hi" in the browser's dev tools console
console.log("Hello from the tango project!");

const greenbtn = document.querySelector(".green");

greenbtn &&
  greenbtn.addEventListener("click", () => alert("Thank you for your appreciation!"));

const bluebtn = document.querySelector(".blue");

bluebtn &&
  bluebtn.addEventListener("click", () => {
    let infoDiv = document.querySelector("#info");
    //infoDiv.style.color = "green";
    if (infoDiv.style.display === "block") {
      infoDiv.style.display = "none";
    } else {
      infoDiv.style.display = "block";
    }
  });

const redbtn = document.querySelector(".red");

const introductionDiv = document.querySelector("#introduction");

redbtn &&
  redbtn.addEventListener("click", () => {
    let intro = prompt("What is your name tanguero?");
    //introductionDiv.style.color = "darkred";
    introductionDiv.style.display = "block";
    document.querySelector("#introduction").innerHTML = `<p> Hello, ${intro}, 
    I can't wait to hearing your tango playlists! Click this message to close it.</p>`;
    introductionDiv.style.cursor = "pointer";
  });

introductionDiv &&
  introductionDiv.addEventListener("click", (evt) => {
   // evt.currentTarget.style.display = "none";
    introductionDiv.style.display = "none";
  });

const ratebtn  = document.querySelector("#rateit");

ratebtn &&
  ratebtn.addEventListener("click", () => {
   let userRating = parseInt(prompt("Rate this Tango Collection (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("One more time, with a number between 1 and 5!");
  }
  else{

    document.querySelector("#rating").innerHTML = "You gave a rating of: ";
  
   // document.getElementById("#theRating").innerHTML = userRating;
    for (let i=0; i < userRating; i++){
        document.querySelector("#rating").innerHTML +="<i class='yellow star icon'></i>";
    }
  }
});

$(".delmelody").click(() => confirm('Really delete this tango?'))

$(".deltanda").click(() => confirm('Really delete this tango playlist?'))

$(document).ready(function(){
  var imageIndex = 0;
  var images = $("#photo-slider img");
  
  // Hide all images except the first one
  images.not(":first").hide();
  
  // Set interval for changing the displayed image
  setInterval(function(){
    images.eq(imageIndex).fadeOut(550, function(){
      // Move to the next image in the sequence
      imageIndex = (imageIndex + 1) % images.length;
      // Fade in the new image
      images.eq(imageIndex).fadeIn(550);
    });
  }, 3000);
});
