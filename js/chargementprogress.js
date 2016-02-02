var progress = 0;
jQuery(document).ready(function(){
    $('body').css('overflow','hidden');
    $('body').append('<div id="test"></div>'); //Add the fade layer to bottom of the body tag.
    $('#test').css({'filter' : 'alpha(opacity=95)'}).fadeIn(); //Fade in the fade layer 
    $('#test').append('<div class=".col-md-4" style="text-align: center;clear: left;"><img id="imgintro" src="img/header_charg.jpg" /></div>');
    $('#test').append('<div id="container" class = "col-md-6 col-md-offset-3" style="margin-top:3%;test-align:center"></div>');  
    $('#container').append('<div id="saberhandlediv" style="text-align: center;"><img id="imgsaberhandle" src="img/saberhandle.png" /></div>');
    $('#container').append('<div class="progress" style="border-collapse: collapse;box-shadow: 0px 0px 15px 5px rgba(162, 249, 0, .75);">');
    $('.progress').append('<div class="progress-bar" role="progressbar" aria-valuenow="'+ progress +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ progress +'%;background-color: #A2F900;">');
     $('#test').append('<div class=".col-md-4" id="imgbarcont" style="text-align: center;clear: left;"><img id="imgbar" src="img/img_vador.gif" /></div>');
    $('#test').append('<div class=".col-md-4" id="imgbarcont" style="text-align: center;clear: left;"><p id="chargencour"> Chargement en cours ...</p></div>');
    ajoutcharg(10);
});

/*border-radius: 25px;*/

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
