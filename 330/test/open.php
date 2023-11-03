<?php
	$data = file_get_contents("https://www.google.com"); // or any other URL you want to use
	echo "<h1 style='padding-top:30px;'>Here's your data!!</h1>";
	echo $data;
?>