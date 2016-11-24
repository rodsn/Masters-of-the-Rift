<?php

include "var.php";



$mode   = $_GET["mode"];
$region_flat = $_GET["region_flat"];
$region_num = $_GET["region_num"];

if (isset($_GET["name"])) {
	$name     = $_GET["name"];
}

if (isset($_GET["id"])) {
	$id     = $_GET["id"];
}

if (isset($_GET["champID"])) {
	$champID     = $_GET["champID"];
}

$base_url  = "https://" . rawurlencode($region_flat) . ".api.pvp.net/";

$valid_arg = true;

if ($mode == "getIdByName") {
	$ext_url = "api/lol/" . rawurlencode($region_flat) . "/v1.4/summoner/by-name/" . rawurlencode($name) . "?";
} elseif ($mode == "getScore") {
	$ext_url = "championmastery/location/" . rawurlencode($region_num) . "/player/" . rawurlencode($id) . "/score?";
} elseif ($mode == "getTopChamps") {
	$ext_url = "championmastery/location/" . rawurlencode($region_num) . "/player/" . rawurlencode($id) . "/topchampions?count=20000&";
} elseif ($mode == "getChampData") {
	$base_url  = "https://global.api.pvp.net/";
	$ext_url = "api/lol/static-data/" . rawurlencode($region_flat) . "/v1.2/champion/" . rawurldecode($id) . "?champData=altimages,image,info,tags,lore&";
} elseif ($mode == "getAllChamps") {
	$base_url = "https://global.api.pvp.net/";
	$ext_url = "api/lol/static-data/" . rawurlencode($region_flat) . "/v1.2/champion?champData=info&";
} elseif ( $mode == "getSpecificChamp") {
	$ext_url = "championmastery/location/" . rawurlencode($region_num) . "/player/" . rawurldecode($id) . "/champion/" . rawurldecode($champID) . "?";
} else {
	$valid_arg = false;
}


if ($valid_arg) {
	$res = file_get_contents($base_url . $ext_url . "api_key=" . $api_key);
	echo $res;
} else {
	echo '{"error":{"msg":"Invalid argument"}}';
}


?>
