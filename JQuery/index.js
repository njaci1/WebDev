$("h1").text("Hoyee!");

$(document).keydown(function(event){

  $("h1").text(event.key);
  $("h1").addClass("h1-color");
  // setTimeout(function(){$("h1").addClass("h1-color2");},500);

})


$("#test").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

$("h1").on("mouseover",function(){
  $("h1").addClass("h1-color");
})

$("h1").on("mouseout",function(){
  $("h1").removeClass("h1-color");
})
