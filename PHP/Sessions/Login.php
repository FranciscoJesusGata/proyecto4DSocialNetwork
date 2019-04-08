<?php
    include '../Querys/Database.php';
    $database = new Database;

  	if(!isset($_POST['Nom_User']) || !isset($_POST['passwd'])){
  		//header('Location: ../../HTML/html/index.html');
        echo "El nombre de usuario o la contraseña están en blanco";
  		exit;
  	}

    function recibirDatos($nombre, $database){
        $nombre = mysqli_real_escape_string($database->db_conection,$nombre);
        $sql = "SELECT *
                FROM personas
                WHERE Nombre_Usuario = '".$nombre."'";
        $result = $database->get_data($sql);
        if(!$result || $result == ""){
            echo "Usuario o contraseña incorrectas";
            return false;
        }
        else{
            return $result;
        }
    }

    function validar($pass, $pass_Crypted, $nombre, $database){
        $acceso = password_verify($pass, $pass_Crypted);
        if ($acceso){
            iniciarSesion($nombre);
            //header('Location: ../../html/html/inicio.html');
            echo "correct";
            $database->end_of_connection();
            return;
        }
        else{
            echo "Usuario o contraseña incorrectas";
        }
    }

    function iniciarSesion($nombre){
        session_start();
        $_SESSION['N_Usuario'] = $nombre;
        setcookie("Sesion_4D",$nombre, strtotime( '+1 year' ),"/");
    }

    $nombre = $_POST['Nom_User'];
    $pass = $_POST['passwd'];
    $recordar = $_POST['remember'];
    $ok = $database->conexion();

    if($ok == "error"){
        /*echo "Error al conectar con la base de datos <br/>";
        echo "error de depuración " . mysqli_connect_error() . "<br/>";
        echo "errorno de depuración " . mysqli_connect_errno() . "<br/>";*/
        echo "Error al conectar con la base de datos";
        exit;
    }
    $resultado = recibirDatos($nombre, $database);
    if ($resultado){
        $pass_Crypted = $resultado["Contrasenia"];
        validar($pass, $pass_Crypted, $nombre, $database);
    }
?>
