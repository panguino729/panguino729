<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>About you!</title>
</head>
<body>
<h1>About you!</h1>
<?PHP
	$server =  $_SERVER["SERVER_NAME"];
	$ip =  $_SERVER["REMOTE_ADDR"];
    $ua =  $_SERVER["HTTP_USER_AGENT"];
    $sip = $_SERVER["SERVER_ADDR"];
    $ss = $_SERVER["SERVER_SOFTWARE"];
    $sdate = date ('l jS \of F Y h:i:s A', $timestamp = $_SERVER["REQUEST_TIME"]);
	echo "<p>The server is: $server</p>";
	echo "<p>Your IP address is: $ip</p>";
    echo "<p>Your browser is: $ua</p>";
    echo "<p>The server IP address is: $sip</p>";
    echo "<p>The server software is: $ss</p>";
    echo "<p>The server time is: $sdate</p>";
?>
</body>
</html>