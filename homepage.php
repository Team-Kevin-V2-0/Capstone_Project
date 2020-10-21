<?php
session_start();

$con = mysqli_connect('localhost', 'root', '', 'capstoneDb');

$result = mysqli_query($con, "SELECT * FROM mem");

echo "<h1> Memory List </h1>";

while($i = mysqli_fetch_array($result)){
	echo $i['id'] . ' ' . $i['des'];
	echo "<br>";
}

mysqli_close($con);

echo "homepage\n";
?>