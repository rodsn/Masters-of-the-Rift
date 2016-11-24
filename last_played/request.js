function unpack(str) {
	obj = JSON.parse(str);
	for (inner in obj) break;
	return obj[inner];
}

function isBlank(str) {
	rep = str.replace(" ", "");
	var str = rep;
	bytes = [];

	for (var i = 0; i < str.length; ++i) {
	    bytes.push(str.charCodeAt(i));
	}
	if (bytes[0] == 13) {
		return true;
	} else {
		return false;
	}
}

function secondsToString(seconds) {
	var numyears = Math.floor(seconds / 31536000);
	var numdays = Math.floor((seconds % 31536000) / 86400);
	var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
	var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
	var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
	toReturn = "";

	if (numyears > 0) {
		toReturn = toReturn + numyears + " years, ";
		return numyears + " years " +  numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
	} else if (numdays > 0) {
		return numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
	} else if (numhours > 0) {
		return numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
	} else if (numminutes > 0) {
		return numminutes + " minutes " + numseconds + " seconds";
	} else {
		return numseconds + " seconds";
	}

	return toReturn


}



function getIdByName(name) {

	function logic(player) {
		if (isBlank(player)) {
			error_name.innerHTML = "Summoner name not found";
			$("#error_name").fadeIn();
			setTimeout( function() {
				$("#error_name").fadeOut();
			}, 3000);

		} else {
			player = unpack(player);
			window.player = player;
			getTopChamps(window.player.id);
		}
	}

	$.ajax({
		type: "GET",
		url: "../php/request.php",
		data:  {mode: "getIdByName", name: name, region_flat: regions[rg].flat, region_num: regions[rg].num}, //MAKE REGION A VARIABLE
		success: function(data){
			logic(data);
		}
     	});
}

function getTopChamps(id) {

	function logic(champs) {
		champs = JSON.parse(champs);
		window.champs = champs;
		champ1 = champs[0];
		window.champ1 = champ1;
		if (typeof(champ1) == "undefined") {
			error_name.innerHTML = "No Mastery data";
			$("#error_name").fadeIn();
			setTimeout( function() {
				$("#error_name").fadeOut();
			}, 3000);
		} else {
			searchChamp(player.id, window.champ, window.rg);
		}
	}

	$.ajax({
		type: "GET",
		url: "../php/request.php",
		data:  {mode: "getTopChamps", id: id, region_flat: regions[rg].flat, region_num: regions[rg].num},
		success: function(data){
			logic(data);
		}
     	});
}

function getChampionData(id) {
	function logic(champ1_data) {
		champ1_data = JSON.parse(champ1_data);
		window.champ1_data = champ1_data;

		setAll(lore, "innerHTML", champ1_data.lore)
		setAll(champName, "innerHTML", window.champ1_data.name);
		setAll(champName_search, "innerHTML", window.champ1_data.name)
		$("#scrolldowntip").fadeIn("slow");

		setAll(champImage, "src", "http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + window.champ1_data.key + "_0.jpg");
		setAll(champImageLoading_search, "src", "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + window.champ1_data.key + "_0.jpg");
		document.body.style.overflow = "visible";
	}

	$.ajax({
		type: "GET",
		url: "../php/request.php",
		data:  {mode: "getChampData", id: id, region_flat: regions[rg].flat, region_num: regions[rg].num},
		success: function(data){
			logic(data);
		}
     	});
}

function resetPageAnimations() {
	smoothScroll.animateScroll( anchor = "#head");
	jumped = true;
	icon.style.opacity = "0";
	document.body.style.overflow = "hidden";
}

function setAll(obj, key, value) {
	if (typeof(value) == "undefined") {
		value = "N/A";
	}
	if ( obj.length > 1 ) {
		for (var i = obj.length - 1; i >= 0; i--) {
			obj[i][key] = value;
		};
	} else {
		obj[key] = value;
	}
}

function setData() {
	sum = window.summoner;
	getIdByName(sum);
}

function searchChamp(id, champ, server) {

	function logic(champs) {

		champs = JSON.parse(champs);
		localStorage.champs = JSON.stringify(champs);
		champs = champs.data
		window.champs_all = champs;
		champID = null;
		for (key in champs) {
			if (champs[key].name.toLowerCase() == champ) {

				champID = champs[key].id;
				champName = champs[key].name;
				champKey = champs[key].key;
			}
		};

		if (typeof(champID) != "number") {
			error_search.innerHTML = "Champion not found";
			$("#error_search").animate({opacity: 1});
			setTimeout( function() {
				$("#error_search").animate({opacity: 0});
			}, 3000);
		} else {
			found = false;
			for (key in window.champs) {

				if (window.champs[key].championId == champID) {
					found = true;
					data = window.champs[key];
					window.lastPlayTime = data.lastPlayTime;
				}
			}
		}
	}


		$.ajax({
			type: "GET",
			url: "php/request.php",
			data: {mode: "getAllChamps", region_flat: regions[rg].flat, region_num: regions[rg].num},
			success: function(data){
				logic(data);
			},
		})

}

	window.setInterval(function(){
		date = new Date();
		now  = date.getTime();
		dif  = now - window.lastPlayTime;
		dif = dif.toString();
		dif = dif.substring(0, dif.length-3);
		dif = Number(dif);
		setAll(last_played_search, "innerHTML", secondsToString(dif));
	}, 1000);
