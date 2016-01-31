
jQuery(document).ready(function(){
    $('body').append('<div id="test"></div>'); //Add the fade layer to bottom of the body tag.
    $('#test').css({'filter' : 'alpha(opacity=95)'}).fadeIn(); //Fade in the fade layer 
    $('#test').append('<div id="container" class = "col-md-6 col-md-offset-3" style="margin-top:15%;"></div>');  
    console.log("test");
    $('#container').append('<div class="progress" style="border-radius: 25px;box-shadow: 0px 0px 15px 5px rgba(162, 249, 0, .75);">');
    $('.progress').append('<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;background-color: #A2F900;border-style: solid;">');
    //$('.progress-bar').append('<span id="span class="sr-only">60% Complete</span>');
     $('#test').append('<div class=".col-md-4" id="imgbarcont" style="text-align: center;clear: left;"><img id="imgbar" src="img/img_vador.png" /></div>');
    $('#test').append('<div class=".col-md-4" id="imgbarcont" style="text-align: center;clear: left;"><p id="chargencour"> Chargement en cours ...</p></div>');
});


/*<div class="progress">
  
    <span class="sr-only">60% Complete</span>
  </div>
</div>*/

