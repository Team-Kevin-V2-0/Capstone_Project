<?php
	include('login.php');
?>

<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<div class="login-box">
		<h1> Login </h1>
		<form action="" method="post">
		<label>username :</label>
		<input id="name" name="username" placeholder="username" type="text">
		<br>
		<label>Password :</label>
		<input id="password" name="password" placeholder="**********" type="password"><br><br>
		<input name="submit" type="submit" value="login">
		<span><?php echo $error; ?></span>
		</form>
	</div>
</body>
</html>