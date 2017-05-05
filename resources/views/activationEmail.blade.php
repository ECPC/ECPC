<!DOCTYPE html>
<html>
<head>
	<title>Activación de cuenta</title>
</head>
<body>
	<a target="_blank" href="http://localhost:8000/api/user/{{$user->id}}/activateAccount/{{$user->activation_token}}">
		Click aquí para activar tu cuenta
	</a>
</body>
</html>