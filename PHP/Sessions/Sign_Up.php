<?php

	if(!isset($_POST['nombre_user']) || !isset($_POST['clave']) || !isset($_POST['email'])){
        header('Location: ../../HTML/html/register.html');
		return;
    }

    include '../Querys/Conectar.php';
    include 'Handle_Files.php';

    session_start();

	//Comprobación de que los datos no estan vacios
    function comprobarDatos ($nombre, $clave, $email){
        $ok = true;
        if ($nombre == "" || $clave == "" || $email == ""){
            $ok = false;
        }
        return $ok;
    }

    //Comprobación de que el usuario que intenta registrarse ya existe. En caso de que exista devolverá true y
    //devolverá un para indiciar que mensaje de error debe mostrarse.
    function usuarioExiste ($nombre,$email,$conexion){
        $nombre = mysqli_real_escape_string($conexion,$nombre);
        $email = mysqli_real_escape_string($conexion,$email);
        $query= "SELECT Nombre_Usuario, Correo
                    FROM usuarios
                    WHERE Nombre_Usuario = '".$nombre."'
                    OR Correo = '".$email."'";
        $resultado = mysqli_query($conexion, $query);
        $tupla = mysqli_fetch_array($resultado);
        if($tupla['Nombre_Usuario'] == $nombre){
            $_SESSION['errorRegistro'] = "usuario";
            return true;
        }else if($tupla['Correo'] == $email){
            $_SESSION['errorRegistro'] = "email";
            return true;
        }
    }

    //Introducción de los datos en la base de datos
    function introducirDatos($alias, $nombre, $clave, $email, $biografia, $privacidad, $conexion){
		//Escape de caracteres para evitar una inyección SQL
        $nombre = mysqli_real_escape_string($conexion,$nombre);
        $clave = mysqli_real_escape_string($conexion,$clave);
				$biografia = mysqli_real_escape_string($conexion,$biografia);
		//Encriptación de la clave
        $clave = password_hash($clave, PASSWORD_DEFAULT);
        //Creación de las carpetas de las fotos y vídeos que subirán los usuarios
        crearCarpetaDeUsuario($nombre);
        $foto = NULL;
        $cabecera = NULL;
        $tema = NULL;
        if(count($_FILES['foto']) > 0){
            $foto = guardarFoto($nombre);
        }else if(count($_FILES['encabezado']) > 0){
            $cabecera = guardarCabecera($nombre);
        }else if (count($_FILES['tema'])  > 0){
            $tema = guardarTema($nombre);
        }

        //Instrucción para introducir los datos en la tabla personas y usuarios
        $query1 = "INSERT INTO personas VALUES('".$nombre."','".$clave."');";
				$query2 = "INSERT INTO usuarios VALUES('".$nombre."','".$alias."','".$biografia."','".$cabecera."','".$privacidad."','".$email."','".$foto."','".$tema."',0,NULL);";
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
                echo mysqli_errno($conexion)." ".mysqli_error($conexion)."<br>";
                $destruirCambios1 = "DELETE
                                    FROM usuarios
                                    WHERE Nombre_Usuario = '".$nombre."'";
                $destruirCambios2 = "DELETE
                                    FROM usuarios
                                    WHERE Nombre_Usuario = '".$nombre."'";
                if($sql1){
                    $ok2 = mysqli_query($conexion, $destruirCambios1);
                }else if($sql2){
                    $ok3 = mysqli_query($conexion, $destruirCambios2);
                }
                echo mysqli_errno($conexion)." ".mysqli_error($conexion);
            }
            //header("Location: ../../HTML/html/register.html");
        }
        else {
            echo "<h1>HUBO UN ERROR REGISTRANDO AL USUARIO</h1>"."<br/>".mysqli_error($conexion); //<~ Solo para pruebas
            //header("Location: ../../HTML/html/register.html");
            //$_SESSION['errorRegistro'] = "<h1>¡Hubo un fallo!</h1> <br/> <h3>No te preocupes, estamos trabajando en ello</h3>";
            //Mensaje de error para el usuario
            return;
        }
    }

    $datos = $_POST;
    $alias = $datos['alias'];
    if($alias == ""){
        $alias = $nombre;
    }
    $nombre = $datos['nombre_user'];
    $clave = $datos['clave'];
    $email = $datos['email'];
    $biografia = $datos['biografia'];
    $privacidad = 'PUBLICO';
    if(isset($datos['privacidad'])){
        $privacidad = 'PRIVADO';
    }
    $conexion = conectar($servidor, $usuario, $clave, $BD);
    if(!$conexion){
        /*echo "Error al conectar con la base de datos <br/>";
        echo "error de depuración " . mysqli_connect_error() . "<br/>";
        echo "errorno de depuración " . mysqli_connect_errno() . "<br/>"; <~ Solo para pruebas */
        $_SESSION['errorRegistro'] = "conexion";
        header('Location: ../../HTML/html/register.html');
        return;
    }
    $datosOk = comprobarDatos ($nombre, $clave, $email);
    $existe = usuarioExiste ($nombre,$email,$conexion);
    if (!$datosOk){
        $_SESSION['errorRegistro'] = "Los datos están vacios";
        header('Location: ../../HTML/html/register.html');
        return;
    }else if($existe){
        header('Location: ../../HTML/html/register.html');
    }else if(!$existe){
        introducirDatos($alias, $nombre, $clave, $email, $biografia, $privacidad, $conexion);
    }
?>
