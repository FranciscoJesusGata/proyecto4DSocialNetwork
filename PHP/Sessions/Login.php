<?php
    include 'data.php';
	
	if(!isset($_POST['Nom_User']) || !isset($_POST['passwd'])){
		header('Location: ../../HTML/html/login.html');
		return;
	}
	
    function conectar($servidor, $usuario, $clave = "", $BD){
        $conexion = mysqli_connect($servidor, $usuario, $clave, $BD);
        return $conexion;
    }

    function recibirDatos($nombre, $conexion){
        $nombre = mysqli_real_escape_string($conexion,$nombre);
        $sql = "SELECT *
                FROM personas
                WHERE Nombre_Usuario = '".$nombre."'";
        $result = mysqli_query($conexion,$sql);
        if(!$result || $result == ""){
            echo "NO SE ENCUENTRA A ESTE USUARIO";
            return false;
        }
        else{
            return $result;
        }
    }
    
    function validar($pass, $pass_Crypted){
        $acceso = password_verify($pass, $pass_Crypted);
        if ($acceso){
            header('Location: ../../html/html/index.html');
            return;
        }
        else{
            echo "CONTRASEÑA INCORRECTA";
        }
    }
    
    $nombre = $_POST['Nom_User'];
    $pass = $_POST['passwd'];
    $conexion = conectar($servidor, $usuario, $clave, $BD);
    if(!$conexion){
           echo "Error al conectar con la base de datos <br/>";
           echo "error de depuración " . mysqli_connect_error() . "<br/>";
           echo "errorno de depuración " . mysqli_connect_errno() . "<br/>";
           exit;
    }
    $resultado = recibirDatos($nombre, $conexion);
    if ($resultado){
        $datos = mysqli_fetch_array($resultado);
        $pass_Crypted = $datos['Contrasenia'];
        validar($pass, $pass_Crypted);
    }
?>