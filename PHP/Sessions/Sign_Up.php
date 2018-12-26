<?php
    include 'data.php';
    function conectar($servidor, $usuario, $clave, $BD){
        $conexion = mysqli_connect($servidor, $usuario, "", $BD);
        return $conexion;
    }

    function comprobarDatos ($nombre, $clave, $email){
        $ok = true;
        if ($nombre == "" || $nombre == " " || $clave == "" || $email == " "){
            echo "LOS DATOS ESTÁN INCOMPLETOS";
            $ok = false;
            return $ok;
        }
        return $ok;
    }
    
    function introducirDatos($nombre, $clave, $email, $conexion){
        $nombre = mysqli_real_escape_string($conexion,$nombre);
        $clave = mysqli_real_escape_string($conexion,$clave);
        $clave = password_hash($clave, PASSWORD_DEFAULT);
        $query1 = "INSERT INTO personas
                VALUES('".$nombre."','".$clave."');";
		$query2 = "INSERT INTO usuarios
                VALUES('".$nombre."','prueba','".$clave."',NULL,'Pub','".$email."',NULL,0);";
        $sql1 = mysqli_query($conexion,$query1);
		$sql2 = mysqli_query($conexion,$query2);
        if($sql1 && $sql2){
            echo "EL USUARIO SE HA REGISTRADO CORRECTAMENTE";
            header("Location: ../../HTML/html/register.html");
            return;
        }
        else {
            echo "<h1>HUBO UN ERROR REGISTRANDO AL USUARIO</h1>";
            return;
        }
    }

    $nombre = $_POST['Nom_User'];
    $clave = $_POST['passwd'];
	$email = $_POST['email'];
    $conexion = conectar($servidor, $usuario, $clave, $BD);
    if(!$conexion){
           echo "Error al conectar con la base de datos <br/>";
           echo "error de depuración " . mysqli_connect_error() . "<br/>";
           echo "errorno de depuración " . mysqli_connect_errno() . "<br/>";
    }
    $datosOk = comprobarDatos ($nombre, $clave, $email);
    if (!$datosOk){
        header("Location: ../../HTML/html/register.html");
    }
    introducirDatos($nombre, $clave, $email, $conexion);
?>