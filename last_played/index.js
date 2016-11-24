window.onload = function() {

	if (typeof(GetURLParameter("search")) == "string" && GetURLParameter("search").length > 1) {
		window.summoner = decodeURIComponent(GetURLParameter("search"));
		if (typeof(GetURLParameter("region")) == "string" && GetURLParameter("region").length > 1) {
			if (typeof(GetURLParameter("champ")) == "string" && GetURLParameter("champ").length > 1) {
				window.champ = decodeURIComponent(GetURLParameter("champ"));

			}
			window.rg = decodeURIComponent(GetURLParameter("region"));
		}

		setData();

	}
	
	$(window).scrollTop(0);

	window.odometerOptions = {
		auto: false,
		selector: '.my-numbers',
		format: '(,ddd).dd',
		duration: 30030,
		theme: 'minimal',
		animation: 'ease-in'
	};

	if (windowID.innerHTML == "main") {
		document.getElementById('summoner').addEventListener('keypress', function(event) {
			if (event.keyCode == 13) {
				$(window).scrollTop(0);
				document.body.style.overflow = "hidden";
				window.history.pushState("object or string", "Title", window.location.pathname + "?search=" + summoner.value + "&region=" + regionSelector.value);
				rg = regionSelector.value;
				localStorage.region = regionSelector.value;
				setData();
			}
	    	});

	    	document.getElementById('champinp').addEventListener('keypress', function(event) {
			if (event.keyCode == 13) {
				searchChamp();
			}
	    	});
    	}



    	function parallax(){
		var img = $('.parallax-04').position();
	    	var scrolled = $(window).scrollTop();
	    	$('.parallax-04').css('top', ((scrolled*-1*0.4)) + 'px');

	    	var img = $('.parallax-11').position();
	    	$('.parallax-11').css('top', ((scrolled*-1*0.8)) + 'px');
	}

	$(window).scroll(function(e){
		var scrolled = $(window).scrollTop();
		if (scrolled > 20 & !jumped) {
			jumped = true;
		} else if (scrolled < 5) {

			faders = document.getElementsByClassName("fade");

			for (var i = faders.length - 1; i >= 0; i--) {
			};
			jumped = false;
		}
    		parallax();
	});
}



$(document).ready(function() {

	jumped = true;

	if (windowID.innerHTML == "main") {
		if (localStorage.region) {
			regionSelector.value = localStorage.region;
		} else {
			regionSelector.value = "br";
		}

		cont = document.getElementById("main-container");
		toSet = window.innerHeight;
		if (toSet < 850) {
			toSet = 850;
		}


		cont.setAttribute("style", "height:"+toSet+"px");
	}


	function myFunction() {
		document.body.style.opacity = 1;

		tips = document.getElementsByClassName("tip");
		for (var i = tips.length - 1; i >= 0; i--) {
			tips[i].style["animation-duration"] = "0.5s";
		};
	}

	regions = {
		br: {flat:"br", num:"br1"},
		eune: {flat:"eune", num:"eun1"},
		euw: {flat:"euw", num:"euw1"},
		jp: {flat:"jp", num:"jp1"},
		kr: {flat:"kr", num:"kr"},
		lan: {flat:"lan", num:"la1"},
		las: {flat:"las", num:"la2"},
		na: {flat:"na", num:"na1"},
		oce: {flat:"oce", num:"oc1"},
		ru: {flat:"ru", num:"ru"},
		tr: {flat:"tr", num:"tr1"},

	};

	setTimeout(myFunction, 500)

})


function GetURLParameter(sParam) {
    var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == sParam){return pair[1];}
       }
       return(false);
}
