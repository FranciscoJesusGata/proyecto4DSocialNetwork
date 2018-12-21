<?php
    include 'data.php';
    function conectar($servidor, $usuario, $clave, $BD){
        $conexion = mysqli_connect($servidor, $usuario, $clave, $BD);
        return $conexion;
    }

    function comprobarDatos ($nombre, $clave, $clave2){
        $ok = true;
        if ($nombre == "" || $nombre == " " || $clave == "" || $clave == " "){
            echo "LOS DATOS ESTÁN INCOMPLETOS";
            $ok = false;
            return $ok;
        }

        if ($clave != $clave2){
            echo "LAS CLAVES NO COINCIDEN";
            $ok = false;
        }
        return $ok;
    }
    
    function introducirDatos($nombre, $clave, $conexion){
        $nombre = mysqli_real_escape_string($conexion,$nombre);
        $clave = mysqli_real_escape_string($conexion,$clave);
        $clave = password_hash($clave, PASSWORD_DEFAULT);
        $sql = "INSERT INTO usuarios
                VALUES('".$nombre."','".$clave."')";
        $result = mysqli_query($conexion,$sql);
        if($result){
            echo "EL USUARIO SE HA REGISTRADO CORRECTAMENTE";
            echo $clave;
            header("Location: ./register.html");
            return;
        }
        else {
            echo "<h1>HUBO UN ERROR REGISTRANDO AL USUARIO</h1>";
            return;
        }
    }

    $nombre = $_POST['nombre'];
    $clave1 = $_POST['clave'];
    $clave2 = $_POST['clave2'];
    $conexion = conectar($servidor, $usuario, $clave, $BD);
    if(!$conexion){
           echo "Error al conectar con la base de datos <br/>";
           echo "error de depuración " . mysqli_connect_error() . "<br/>";
           echo "errorno de depuración " . mysqli_connect_errno() . "<br/>";
    }
    $datosOk = comprobarDatos ($nombre, $clave1, $clave2);
    if (!$datosOk){
        header("Location: ./register.html");
    }
    introducirDatos($nombre, $clave1, $conexion);
?>