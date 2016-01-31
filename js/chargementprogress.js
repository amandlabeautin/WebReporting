var progress = 0;
jQuery(document).ready(function(){
    $('body').css('overflow','hidden');
    $('body').append('<div id="test"></div>'); //Add the fade layer to bottom of the body tag.
    $('#test').css({'filter' : 'alpha(opacity=95)'}).fadeIn(); //Fade in the fade layer 
    $('#test').append('<div class=".col-md-4" style="text-align: center;clear: left;"><img id="imgintro" src="img/header_charg.jpg" /></div>');
    $('#test').append('<div id="container" class = "col-md-6 col-md-offset-3" style="margin-top:3%;"></div>');  
    console.log("test");
    $('#container').append('<div class="progress" style="border-radius: 25px;box-shadow: 0px 0px 15px 5px rgba(162, 249, 0, .75);">');
    $('.progress').append('<div class="progress-bar" role="progressbar" aria-valuenow="'+ progress +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ progress +'%;background-color: #A2F900;border-style: solid;">');
    //$('.progress-bar').append('<span id="span class="sr-only">60% Complete</span>');
     $('#test').append('<div class=".col-md-4" id="imgbarcont" style="text-align: center;clear: left;"><img id="imgbar" src="img/img_vador.gif" /></div>');
    $('#test').append('<div class=".col-md-4" id="imgbarcont" style="text-align: center;clear: left;"><p id="chargencour"> Chargement en cours ...</p></div>');
    ajoutcharg(10);
});



function ajoutcharg(pourcentage){
    var resultat = progress + pourcentage;
    progress = resultat;
    $('.progress-bar').css("width",resultat+"%");
}

function fadeoutintro(){
    $('#test').fadeOut(function() {
			$('#test').remove();  
            $('body').css('overflow','auto');
	});
    
}

