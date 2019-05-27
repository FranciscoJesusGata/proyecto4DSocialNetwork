<?php
    include 'Database.php';
    session_start();

    function crearPeticion($conexion, $database, $user){
        $user = mysqli_real_escape_string($conexion, $user);
        $nombre = $_SESSION['N_Usuario'];
        $checkQuery = "SELECT CASE WHEN EXISTS (
              SELECT * 
              FROM seguir 
              WHERE Nombre_Usuario = '".$nombre."' 
              AND Nombre_Seguido = '".$user."' 
              AND F_Fin IS NOT NULL 
          ) 
          THEN 'YES' 
          ELSE 'NO' END as existe";
        $check = $database->get_unknow_data($checkQuery);
        if($check[0]["existe"] == "NO"){
            $sql = "INSERT into seguir (`Nombre_Usuario`, `Nombre_Seguido`) values ('".$nombre."', '".$user."')";
            return $database->send_data($sql);
        } else {
            
        }
    }

    $database = new Database;
    $ok = $database->conexion();
    $conexion=$database->db_conection;
    $opcion=$_POST['ejecutar'];
    if($opcion == "seguir"){
      $user = $_POST['user'];
      $datos = crearPeticion($conexion, $database, $user);
      echo json_encode($datos);
    }
    $database->end_of_connection()
?>