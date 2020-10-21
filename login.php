<?php
session_start();
$error = 'test';
	
	if (isset($_POST['submit'])){
	if (empty($_POST['username']) || empty($_POST['password'])){
		$error = 'please enter a username or password';
	}
	else{
		$username = $_POST['username'];
		$password = $_POST['password'];
	
		$c = mysqli_connect('localhost', 'root', '', 'capstoneDb');
	
		$querey = 'SELECT username, password FROM users WHERE username=? AND password=?';
		$stmt = $c->prepare($querey);
		$stmt->bind_param("ss", $username, $password);
		$stmt->execute();
		$stmt->bind_result($username, $password);
		$stmt->store_result();
		if($stmt->fetch()){
			$error = "login successfull";
			header('location: homepage.php');
		}
		else{
			$error = "user not found";
		}
	}
	}