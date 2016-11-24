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
			setAll(summonerName, "innerHTML", window.player.name);
			icon.src = "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/profileicon/" + window.player.profileIconId + ".png";
			getScore(window.player.id);
		}
	}

	$.ajax({
		type: "GET",
		url: "php/request.php",
		data:  {mode: "getIdByName", name: name, region_flat: regions[rg].flat, region_num: regions[rg].num},
		success: function(data){
			logic(data);
		}
     	});
}

function getScore(id) {

	function logic(score) {
		score = JSON.parse(score);
		window.score = score;
		setAll(totalMastery, "innerHTML", window.score);
		getTopChamps(window.player.id);
	}

	$.ajax({
		type: "GET",
		url: "php/request.php",
		data:  {mode: "getScore", id: id, region_flat: regions[rg].flat, region_num: regions[rg].num},
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
			setAll(champ1_mastery, "innerHTML", window.champ1.championPoints);
			totalPoints_VAR = 0;
			totalGradeAVG_VAR = 0;
			lvl_5 = 0;
			lvl_4 = 0;
			lvl_3 = 0;
			lvl_2 = 0;
			lvl_1 = 0;
			lvl_0 = 0;
			for (var i = champs.length - 1; i >= 0; i--) {
				totalPoints_VAR = totalPoints_VAR + champs[i].championPoints;

				if (grades[champs[i].highestGrade] != null) {
					totalGradeAVG_VAR = totalGradeAVG_VAR + grades[champs[i].highestGrade];
				}

				l = champs[i].championLevel;
				if (l == 5) {
					lvl_5 = lvl_5 + 1;
				} else if (l == 4) {
					lvl_4 = lvl_4 + 1;
				} else if (l == 3) {
					lvl_3 = lvl_3 + 1;
				} else if (l == 2) {
					lvl_2 = lvl_2 + 1;
				} else if (l == 1) {
					lvl_1 = lvl_1 + 1;
				}
			};

			configChart(lvl_1, lvl_2, lvl_3, lvl_4, lvl_5);


			totalGradeAVG_VAR = Math.round(totalGradeAVG_VAR / champs.length);
			perc = Math.round((window.champ1.championPoints * 100) / totalPoints_VAR);

			setAll(champsPlayed, "innerHTML", champs.length);
			setAll(totalPoints, "innerHTML", totalPoints_VAR);
			setAll(gradeAVG, "innerHTML", gradesNUM[totalGradeAVG_VAR]);
			setAll(lvl_search, "innerHTML", champ1.championLevel);
			setAll(points_search, "innerHTML", champ1.championPoints);
			setAll(points_percentage_search, "innerHTML", perc);
			setAll(grade_search, "innerHTML", champ1.highestGrade);
			window.lastPlayTime = champ1.lastPlayTime;
			setAll(pointsNextLvl_search, "innerHTML", champ1.championPoints);
			setAll(lvlProg_search, "value", champ1.championPoints);
			setAll(nextLvlcap_search, "innerHTML", champ1.championPoints + champ1.championPointsUntilNextLevel);
			setAll(lvlProg_search, "max", champ1.championPoints + champ1.championPointsUntilNextLevel);
			if (champ1.chestGranted) {
				suffix = "ok";
			} else {
				suffix = "remove";
			}
			setAll(chest_search, "innerHTML", '<span class="glyphicon glyphicon-' + suffix + '">');
			setAll(champPercentage, "innerHTML", perc);
			if (typeof champPercentage_pie.remove == 'function') { 
				champPercentage_pie.remove(); 
			} else {
			 	champPercentage_pie.removeNode();
			}
			pie_container.innerHTML = '<div id="champPercentage_pie" class="pie" data-size="100" data-value="' + perc +'"></div>'
			window.update_pie()
			getChampionData(window.champ1.championId);
		}
	}

	$.ajax({
		type: "GET",
		url: "php/request.php",
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
		url: "php/request.php",
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
	sum = summoner.value;
	getIdByName(sum);
}

function searchChamp() {

	function logic(champs) {
		champs = JSON.parse(champs);
		localStorage.champs = JSON.stringify(champs);
		champs = champs.data;
		champID = null;
		for (key in champs) {
			if (champs[key].name.toLowerCase() == champinp.value.toLowerCase()) {
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
					perc = Math.round((data.championPoints * 100) / totalPoints_VAR);

				  	$("#champImageLoading_search").animate({opacity: 0});
					$("#lvl_search").animate({opacity: 0});
					$("#points_search").animate({opacity: 0});
					$("#pt_prc_anim").animate({opacity: 0});
					$("#grade_search").animate({opacity: 0});
					$("#chest_search").animate({opacity: 0});
					$("#lvlProg_search").animate({opacity: 0});
					$("#last_played_search").animate({opacity: 0});
					$("#champName_search_div").animate({opacity: 0});
					



					setTimeout( function() {
						setAll(lvl_search, "innerHTML", data.championLevel);
						setAll(points_search, "innerHTML", data.championPoints);
						setAll(points_percentage_search, "innerHTML", perc);
						setAll(grade_search, "innerHTML", data.highestGrade);
						window.lastPlayTime = data.lastPlayTime;
						setAll(pointsNextLvl_search, "innerHTML", data.championPoints);
						setAll(lvlProg_search, "value", data.championPoints);
						setAll(nextLvlcap_search, "innerHTML", data.championPoints + data.championPointsUntilNextLevel);
						setAll(lvlProg_search, "max", data.championPoints + data.championPointsUntilNextLevel);

						setAll(champName_search, "innerHTML", champName);
						setAll(champImageLoading_search, "src", "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champKey + "_0.jpg");
						setTimeout ( function() {
							$("#champImageLoading_search").animate({opacity: 1});
							$("#lvl_search").animate({opacity: 1});
							$("#points_search").animate({opacity: 1});
							$("#pt_prc_anim").animate({opacity: 1});
							$("#grade_search").animate({opacity: 1});
							$("#chest_search").animate({opacity: 1});
							$("#lvlProg_search").animate({opacity: 1});
							$("#last_played_search").animate({opacity: 1});
							$("#champName_search_div").animate({opacity: 1});
						}, 500);
					}, 500);



				}
			}

			if (!found) {
				error_search.innerHTML = "No Mastery data on this champion";
				$("#error_search").animate({opacity: 1});
				setTimeout( function() {
					$("#error_search").animate({opacity: 0});
				}, 3000);
			}
		}
	}


	if (localStorage.champs == "null" || typeof(localStorage.champs) == "undefined" || localStorage.champs == "undefined") {

		$.ajax({
			type: "GET",
			url: "php/request.php",
			data: {mode: "getAllChamps", region_flat: regions[rg].flat, region_num: regions[rg].num},
			success: function(data){
				logic(data);
			},
		})

	} else {
		logic(localStorage.champs);
	}
}

if (windowID.innerHTML == "main") {
	window.setInterval(function(){
		date = new Date();
		now  = date.getTime();
		dif  = now - window.lastPlayTime;
		dif = dif.toString();
		dif = dif.substring(0, dif.length-3);
		dif = Number(dif);
		setAll(last_played_search, "innerHTML", secondsToString(dif));
	}, 1000);
}
