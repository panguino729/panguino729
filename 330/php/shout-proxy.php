<?php
	// 1) The URL to the web service
	$URL = "HTTP://API.SHOUTCLOUD.IO/V1/SHOUT";
	
	// 2) The text we'll be "SHOUTIFYING"
	// this is hard-coded for now, but we'll pass it in as a query string parameter soon
	$text = "IGME-330 sure is a cool class!"; 
	
	// 3) The name of the parameter shoutify expects is "INPUT"
	$params = ["INPUT" => $text];
	
	// 4) Convert it to JSON, because Shoutify wants data passed to it as JSON
	$jsonToSend = json_encode($params);
	
	// 5) The `stream_context_create()` function is where we can specify the POST method
	// https://www.php.net/manual/en/context.http.php
	
	$opts = array('http' =>
		array(
			'method'  => 'POST',
			'header'  => 'Content-Type: application/json',
			'content' => $jsonToSend
		)
	);
	$context = stream_context_create($opts);
	
	
	// 6) Call the web service
	$result = file_get_contents($URL, false, $context);
	
	// 7) Echo results 
	header('content-type:application/json'); // tell the requestor that this is JSON
	header("Access-Control-Allow-Origin: *"); // turn on CORS for that shout-client.html can use this service
	echo $result;
?>