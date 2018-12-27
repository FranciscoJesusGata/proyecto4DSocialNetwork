<?php
    include 'data.php';
	
	if(!isset($_POST['Nom_User']) || !isset($_POST['passwd']) || !isset($_POST['email'])){
		header('Location: ../../HTML/html/register.html');
		return;
	}
	
	//Conexión con la base de datos
    function conectar($servidor, $usuario, $clave, $BD){
        $conexion = mysqli_connect($servidor, $usuario, "", $BD);
        return $conexion;
    }
	
	//Comprobación de que los datos no estan vacios
    function comprobarDatos ($nombre, $clave, $email){
        $ok = true;
        if ($nombre == "" || $nombre == " " || $clave == "" || $email == " "){
            echo "LOS DATOS ESTÁN INCOMPLETOS";
            $ok = false;
            return $ok;
        }
        return $ok;
    }
    //Introducción de los datos en la base de datos
    function introducirDatos($nombre, $clave, $email, $conexion){
		//Escape de caracteres para evitar una inyección SQL
        $nombre = mysqli_real_escape_string($conexion,$nombre);
        $clave = mysqli_real_escape_string($conexion,$clave);
		//Encriptación de la clave
        $clave = password_hash($clave, PASSWORD_DEFAULT);
		//Instrucción para introducir los datos en la tabla personas y usuarios
        $query1 = "INSERT INTO personas
                VALUES('".$nombre."','".$clave."');";
		$query2 = "INSERT INTO usuarios
                VALUES('".$nombre."','prueba','".$clave."',NULL,'Pub','".$email."',NULL,0);";
        $sql1 = mysqli_query($conexion,$query1);
		$sql2 = mysqli_query($conexion,$query2);
        if($sql1 && $sql2){
            echo "EL USUARIO SE HA REGISTRADO CORRECTAMENTE";
            header("Location: ../../HTML/html/login.html");
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