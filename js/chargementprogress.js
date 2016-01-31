$('body').append('<div id="test"></div>'); //Add the fade layer to bottom of the body tag.
		 $( "#test" ).fadeIn( "slow", function() {
    console.log("test");
  });

/*setTimeout(function(){
     $('#fade').remove();  
}, 10000);*/