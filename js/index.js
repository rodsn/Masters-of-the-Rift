window.onload = function() {
	if (typeof(GetURLParameter("search")) == "string" && GetURLParameter("search").length > 1) {
		summoner.value = decodeURIComponent(GetURLParameter("search"));
		if (typeof(GetURLParameter("region")) == "string" && GetURLParameter("region").length > 1) {
			regionSelector.value = decodeURIComponent(GetURLParameter("region"));
			rg = regionSelector.value;
			localStorage.region = regionSelector.value;
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

	smoothScroll.init({speed: 2000, easing: "easeOutQuint"});

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

	grades = {
		"S+": 0,
		"S": 1,
		"S-": 2,
		"A+": 3,
		"A": 4,
		"A-": 5,
	 	"B+": 6,
		"B": 7,
		"B-": 8,
		"C+": 9,
		"C": 10,
		"C-": 11,
		"D+": 12,
		"D": 13,
		"D-": 14,
	}

	gradesNUM = {
		0: "S+",
		1: "S",
		2: "S-",
		3: "A+",
		4: "A",
		5: "A-",
	 	6: "B+",
		7: "B",
		8: "B-",
		9: "C+",
		10: "C" ,
		11: "C-",
		12: "D+",
		13: "D",
		14: "D-",
	}

	setTimeout(myFunction, 500)

})

function configChart(lvl1, lvl2, lvl3, lvl4, lvl5) {
	var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    lvl1,
                    lvl2,
                    lvl3,
                    lvl4,
                    lvl5,
                ],

                backgroundColor: [
                    "#CBB046",
                    "#CBB046",
                    "#CBB046",
                    "#CBB046",
                    "#CBB046",
                ],

                hoverBackgroundColor: [
                    "#A08A33",
                    "#A08A33",
                    "#A08A33",
                    "#A08A33",
                    "#A08A33",
            	],

            	 borderColor: [
                    "#1D1D35",
                    "#1D1D35",
                    "#1D1D35",
                    "#1D1D35",
                    "#1D1D35",
            	],
            }],
            labels: [
                "Champions at level 1: ",
                "Champions at level 2: ",
                "Champions at level 3: ",
                "Champions at level 4: ",
                "Champions at level 5: ",
            ]
        },
        options: {
            responsive: false
        }
    };

    	Chart.defaults.global.legend = false;
       var ctx = document.getElementById("chart-area").getContext("2d");
       window.myPie = new Chart(ctx, config);
}

function GetURLParameter(sParam) {
    var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == sParam){return pair[1];}
       }
       return(false);
}


function style_mouseleave(obj) {
	obj.blur();

}

function update_pie() {
	(function ($, document) {
	$.fn.easyaspie = function () {

		var	size	= parseInt(this.data('size')),
			radius	= size / 2,
			value	= champPercentage_pie.attributes[3]["nodeValue"];

		if (this.length > 1){
			this.each( function() {
				$(this).easyaspie();
			});
			return this;
		}

		if (isNaN(value)) {
			return this;
		}

		this.css({
			height: size,
			width: size
		}).addClass('pie-sliced');

		value = Math.min(Math.max(value, 0), 100);

		this.pie = document.createElementNS("http://www.w3.org/2000/svg", "svg");

		if (value >= 100) {
			this.pie.slice = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			this.pie.slice.setAttribute('r', radius);
			this.pie.slice.setAttribute('cx', radius);
			this.pie.slice.setAttribute('cy', radius);

		} else {
			this.pie.slice = document.createElementNS("http://www.w3.org/2000/svg", "path");

			var x = Math.cos((2 * Math.PI)/(100/value));
			var y = Math.sin((2 * Math.PI)/(100/value));

			var longArc = (value <= 50) ? 0 : 1;

			var d = "M" + radius + "," + radius + " L" + radius + "," + 0 + ", A" + radius + "," + radius + " 0 " + longArc + ",1 " + (radius + y*radius) + "," + (radius - x*radius) + " z";
			this.pie.slice.setAttribute('d', d);
		}

        $(this.pie.slice).appendTo(this.pie);

		$(this.pie).appendTo(this);

		return this;
	};

    $('.pie').easyaspie();
})(jQuery, document);
}

window.update_pie = update_pie;
