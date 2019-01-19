<?php

    include '../Querys/Conectar.php';
	
	if(!isset($_POST['Nom_User']) || !isset($_POST['passwd']) || !isset($_POST['email'])){
		header('Location: ../../HTML/html/register.html');
		return;
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

    //Comprobación de que el usuario que intenta registrarse ya existe. En caso de que exista devolverá true y
    //creará un parámetro de sesión para indiciar que mensaje de error debe mostrarse.
    function usuarioExiste ($nombre,$email,$conexion){
        $nombre = mysqli_real_escape_string($conexion,$nombre);
        $email = mysqli_real_escape_string($conexion,$email);
        $query= "SELECT Nombre_Usuario, Correo
                    FROM usuarios
                    WHERE Nombre_Usuario = '".$nombre."'
                    OR Correo = '".$email."'";
        $resultado = mysqli_query($conexion, $query);
        $datos = mysqli_fetch_array($resultado);
        
        if($datos == $nombre){
            $_SESSION['errorRegistro'] = "usuario";
            return true;
        }else if{
            $_SESSION['errorRegistro'] = "usuario";
            return true;
        }else{
            return false;
        }
        
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
                VALUES('".$nombre."','prueba',NULL,NULL,'PUBLICO','".$email."',NULL,0);";
        $sql1 = mysqli_query($conexion,$query1);
		$sql2 = mysqli_query($conexion,$query2);
        $ok = usuarioExiste($nombre,$email,$conexion);
        if(!$ok){
            $sql1 = mysqli_query($conexion,$query1);
            $sql2 = mysqli_query($conexion,$query2);
            if($sql1 && $sql2){
                header("Location: ../../HTML/html/login.html");
                return;
            }
            else{
                //En caso de que los datos no se hayan grabado en las dos tablas los elimina
                $destruirCambios = "DELETE *
                                    FROM usuarios, personas
                                    WHERE Nombre_Usuario = '".$nombre."'";
                $ok2 = mysqli_query($destruirCambios);
            }
        }
        else {
            //echo "<h1>HUBO UN ERROR REGISTRANDO AL USUARIO</h1>"."<br/>".mysqli_error($conexion); <~ Solo para pruebas
            echo "<h1>¡Hubo un fallo!</h1> <br/> <h3>No te preocupes, estamos trabajando en ello</h3>";
            //Mensaje de error para el usuario
            return;
        }
    }

    $nombre = $_POST['Nom_User'];
    $clave = $_POST['passwd'];
	$email = $_POST['email'];
    $conexion = conectar($servidor, $usuario, $clave, $BD);
    if(!$conexion){
            /* echo "Error al conectar con la base de datos <br/>";
            echo "error de depuración " . mysqli_connect_error() . "<br/>";
            echo "errorno de depuración " . mysqli_connect_errno() . "<br/>"; <~ Solo para pruebas */
            echo "<h1>Lo sentimos</h1> <br/> <h3>Nuestros servicios estan caídos, intentá registrarte más tarde.</h3>"
    }
    $datosOk = comprobarDatos ($nombre, $clave, $email);
    if (!$datosOk){
        header("Location: ../../HTML/html/register.html");
    }
    introducirDatos($nombre, $clave, $email, $conexion);
?>