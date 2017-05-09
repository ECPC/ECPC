<!DOCTYPE html>
<html>
<head>
	<title>Bienvenido a EZPC</title>
</head>
<body>
    <table style="width:100%; font-family: sans-serif;">
        <thead></thead>
        <tbody>
            <tr>
                <td style="text-align:center;">
                    <img src="https://preview.ibb.co/cSEET5/dark_logo.png" style="width: 200px" alt="EZPC">
                </td>
            </tr>
            <tr>
                <td>
                    <h2>¡Hola!</h2>
                    <p>
                        Te damos la bienvenida a EZPC, la red de hardware más grande de Latino América.
                    </p>
                    <p>
                        Estamos muy felices de que formes parte del equipo y que comiences a crear tu red y negocio lo antes posible.
                    </p>
                    <p>
                        Haz sido invitado por {{$parent->name}} para formar parte de EZPC, usa tu dirección de correo eléctronico y la siguiente contraseña para iniciar sesión.
                    </p>
					<p>Contraseña: {{$password}}</p>
                    <p>
                        ¡Buena suerte!
                        <br>
                        - EZPC
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>