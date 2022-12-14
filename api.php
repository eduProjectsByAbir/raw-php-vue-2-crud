<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli('localhost', 'root', 'abir', 'vuephp');

$conn->connect_error ? die('Could not connect to database') : '';

$res = array('error' => false);

$action =  isset($_GET['action']) ? $_GET['action'] : 'read';

if($action == 'read'){
	$result = $conn->query("SELECT * FROM `users`");
	$users = array();

	while($row = $result->fetch_assoc()){
		array_push($users, $row);
	}

	$res['users'] = $users;
}

if($action == 'create'){
	$username = validate_input($_POST['username']);
	$email = validate_input($_POST['email']);
	$mobile = validate_input($_POST['mobile']);

	$result = $conn->query("INSERT INTO `users` (`username`, `email`, `mobile`) VALUES ('$username', '$email', '$mobile') ");

	if($result){
		$res['message'] = "User added successfully";
	} else {
		$res['error'] = true;
		$res['message'] = "Could not insert user";
	}
}

if($action == 'update'){
	$id = validate_input($_POST['id']);
	$username = validate_input($_POST['username']);
	$email = validate_input($_POST['email']);
	$mobile = validate_input($_POST['mobile']);

	$result = $conn->query("UPDATE `users` SET `username` = '$username', `email` = '$email', `mobile` = '$mobile' WHERE `id` = '$id'");

	if($result){
		$res['message'] = "User updated successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "Could not update user";
	}

}

if($action == 'delete'){
	$id = validate_input($_POST['id']);
	$result = $conn->query("DELETE FROM `users` WHERE `id` = '$id'");

	if($result){
		$res['message'] = "User deleted successfully";
	} else {
		$res['error'] = true;
		$res['message'] = "Could not delete user";
	}

}


function validate_input($data) {
	global $conn;
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	$data = $conn->real_escape_string($data);
	return $data;
}

$conn->close();
header("Content-type: application/json");
echo json_encode($res);
die();
