<?php
    include 'Database.php';
    session_start();

    function dataForNavbar($database){
      $nombre = $_SESSION['N_Usuario'];
      $sql = "SELECT Foto, Alias FROM usuarios where nombre_usuario = '".$nombre."'";
      return $database->get_unknow_data($sql);
    }

    function dataForMain ($conexion, $database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $queryBasicData = "SELECT * 
        FROM usuarios 
        WHERE Nombre_Usuario = '".$nombre."'";
        $queryFollowers = "SELECT COUNT(Nombre_Usuario) AS Seguidores
        FROM seguir
        WHERE Nombre_Seguido = '".$nombre."'
        AND F_Fin IS NOT NULL";
        $queryFollowing="SELECT COUNT(Nombre_Usuario) AS Seguidos
        FROM seguir
        WHERE Nombre_Usuario = '".$nombre."'
        AND F_Fin IS NOT NULL";
        $datos = $database->get_data($queryBasicData);
        $followers = $database->get_data($queryFollowers);
        $following = $database->get_data($queryFollowing);
        if($datos == "error" || $followers == "error" || $following == "error"){
            return null;
            exit("Error al recoger los datos de usuario ".mysqli_errno($conexion)." ".mysqli_error($conexion));
        }else{
            $follow=array_merge($followers,$following);
            $finaldata=array_merge($datos,$follow);

            return $finaldata;
        }
    }

    function dataComplete ($conexion, $database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $queryBasicData = "SELECT * FROM usuarios WHERE Nombre_Usuario = '".$nombre."'";
        $datos = $database->get_data($queryBasicData);
        if(count($datos) <= 0 || $datos == "error"){
            return null;
            exit("Error al recoger los datos de usuario ".mysqli_errno($conexion)." ".mysqli_error($conexion));
        }else{
            return $datos;
        }
    }

    $database = new Database;
    $ok = $database->conexion();
    $conexion=$database->db_conection;
    $opcion=$_POST['opcion'];
    if($opcion == "main"){
        $datos = dataForMain($conexion, $database);
        if($datos != null){
            $enviar=json_encode($datos);
            echo $enviar;
        }
    }
    if ($opcion == "navbar") {
        $datos = dataForNavbar($database);
        echo json_encode($datos);
    }
?>
