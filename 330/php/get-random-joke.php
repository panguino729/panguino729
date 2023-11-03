<?php
	/*
	Name: get-random-joke.php
	Description: Returns a single random joke in JSON format
	Author: 
	Last Modified: 2021.04.06
	*/
	
	// $jokes contains our data
	// this is an indexed array of associative arrays
	// the associative arrays are jokes -  they have an 'q' key and an 'a' key
	$jokes = [
		["q"=>"What do you call a very small valentine?","a"=>"A valen-tiny!"],
		["q"=>"What did the dog say when he rubbed his tail on the sandpaper?","a"=>"Ruff, Ruff!"],
		["q"=>"Why don't sharks like to eat clowns?","a"=>"Because they taste funny!"],
		["q"=>"What did the fish say when be bumped his head?","a"=>"Dam!"],
		["q"=>"How do you know that you have been in college too long?","a"=>"Your parents are running out of money!"],
		["q"=>"What do you call hiking U.S. college students?","a"=>"The walking debt."],
		["q"=>"Why did the music note drop out of college?","a"=>"Because it couldn't pick a major."],
		["q"=>"How many graduate students does it take to change a light bulb?","a"=>"Only one, but it may take them more than five years to do it."],
		["q"=>"What is the definition of an optimist?","a"=>"A college student who opens their wallet and expects to find money"],
		["q"=>"What form of art is very popular among college students?","a"=>"Ramen doodles!"]
	];
	
	
	//	// Debugging - comment all these `echo()` statements out after you verify that everything works
	//	// print the first joke
	//	echo $jokes[0]["q"] . " " . $jokes[0]["a"]; 
	//	// print a blank line
	//	echo "\n\n"; 
	//	// print the entire array to the window
	//	print_r($jokes); 
	
	// get a random element of the $jokes array
	// https://www.php.net/manual/en/function.array-rand.php
	// there are a bunch more PHP array functions at: http://php.net/manual/en/ref.array.php
	$randomKey = array_rand($jokes, 1);
	//$randomJoke = $jokes[$randomKey]["q"] . " " . $jokes[$randomKey]["a"];
	$randomJoke = $jokes[$randomKey];
	
	// json_encode() turns an associative array into a string of well-formed JSON
	// https://www.php.net/manual/en/function.json-encode.php
	$string = json_encode($randomJoke);
	
	// Send HTTP headers
	// https://www.php.net/manual/en/function.header.php
	// DO THIS **BEFORE** you `echo()` the content!
	header('content-type:application/json');      // tell the requestor that this is JSON
	header("Access-Control-Allow-Origin: *");     // turn on CORS
	header("X-this-330-service-is-kinda-lame: true");   // a custom header - by convention they begin with 'X'
	
	echo $string;
?>