#Masters Of The Rift

##About
**Masters of the rift** is a web app that uses the Riot API to get data from the Riot servers. It's part of the [Riot API Challenge - 2016](https://developer.riotgames.com/discussion/announcements/show/eoq3tZd1). This year's theme is Champion Mastery. I decided to get a simple and clean website to display the info on the player Champion Mastery data. It was tricky to get something different than just "you have 159 points. yay..", i wanted something more impressive. The website makes use of Javascript and PHP to send the requests to the servers, if you wish to find more about the code read the **Documentation** topic below. You can try the web app [here](http://masters-of-the-rift.com).

##Documentation
You may love to see how stuff works without even knowing how to code. Or you may also be a programmer yourself. Either way you came to the right place, i will explain how the website works from the HTML to the PHP.

#####HTML
The html part is easy and does not really need anything but this:
````html
<h1 id="champName">placeholder</h1>
````
The id is what makes Javascript able to access the data on that element (h1 in this case);
The "placeholder" is a temporary value given to that element.

#####Javascript
The core of the whole app is JS. I use it to change the placeholders to the downloaded data.
````javascript
function getScore(id) {

  	function logic(score) {
  		score = JSON.parse(score); // Need to convert the raw data into an object (Actually this request returns a simple string, but the others return a JSON table)
  		setAll(totalMastery, "innerHTML", score); // I will explain this more ahead
  	}

  	$.ajax({
  		type: "GET",
  		url: "php/request.php", // The php file that handles the requests
  		data:  {mode: "getScore", id: id, region_flat: regions[rg].flat, region_num: regions[rg].num},
  		success: function(data){
  			logic(data); // When the php returns the data, run the logic function
  		}
   	});
}
````

So basically i have a function that does the request, and when the request is successful it runs another function. Check the comments on the code above for more info.

````javascript
function setAll(obj, key, value) {
  if ( obj.length > 1 ) { // If the object has more than one entry then
		for (var i = obj.length - 1; i >= 0; i--) { // Iterate through the object
			obj[i][key] = value; // Set the object number.key to the given value
		};
	} else {
		obj[key] = value;
	}
}
````

This function above was a funny way i created to give all the HTML elements variables. if i set the object to ```champName```, the key to "innerHTML" and the value to "Teemo" then ALL of the HTML elements with an ID of ```champName``` will have their inner HTML value changed to "Teemo".

The only thing that complicated this process was the fact that the Champion Mastery API region parameter is different from the rest of the API.
For example to select EUW i would just place "euw" on the parameters, but the Champion mastery API needs to be "EUW1" instead. I don't really know why, but i had to deal with it. (Rito pls) The way i found arround this was ok, but i could have done something more organized. Here is what i did:
Using EUW as example.

1. Set a ```region``` variable to "euw"
2. Made this table:
 ````Javascript
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
````
3. Sent ````regions[region].flat```` and ````regions[region].num```` to the PHP
4. Used the flat version or the num version depending on the API category

#####PHP
The PHP just gets the content from the API url. Pretty simple. The key is set in a separate file called ````var.php````. If you wish to see the app working and tweak with it in your own machine then:
1. Install apache or another server software.
2. Download the repository.
3. Create a file in the php folder and name it ````var.php````.
4. Place this in that file and edit the variable to your key:
````PHP
<?php
	$api_key = "your_key_here";
?>
````
5. Open the browser on localhost and the port number configured by the apache server, and you should see the app.

You may also just create a variable in the ````request.php```` file called ````$api_key````.

##My widget
I also made a simple widget that displays for how long you haven't played with a champion. It's so easy to use. You simply place the following code into your html page:
````HTML

<iframe src="http://www.masters-of-the-rift.com/last_played/?search=NAME&region=REGION&champ=CHAMPION"></iframe>

````

In the ````search```` field you place the summoner name.
In the ````region```` field you place the region that summoner is in.
And in the ````champ```` field you place the champion.

It will display a counter that you are free to use on your website. (Actually i do encourage you to use it and make something cool!)

That's pretty much it, the basics are set and explained. Of course you can ask me anything about the project.

![Jinx](http://vignette3.wikia.nocookie.net/leagueoflegends/images/7/71/Get_Excited%21.png) Got excited? Head up to the [Riot API forums](https://developer.riotgames.com/), learn about the API and start your own project! 

GL & HF


