<?php
    include 'Database.php';
    session_start();
    
    function getData($conexion, $database){
      $nombre = $_SESSION['N_Usuario'];
      
      $sql1 = "SELECT * FROM seguir WHERE Nombre_Seguido = '".$nombre."' AND F_Inicio is null";
      $sql2 = "SELECT * FROM seguir WHERE Nombre_Usuario = '".$nombre."' AND F_Inicio is not null";
      $sql3 = "SELECT * FROM seguir WHERE Nombre_Seguido = '".$nombre."' AND F_Inicio is not null";
      
      $data1 = $database->get_unknow_data($sql1);
      $data2 = $database->get_unknow_data($sql2);
      $data3 = $database->get_unknow_data($sql3);
      
      $responseObject = [];
      $responseObject['peticiones'] = $data1;
      $responseObject['sigues'] = $data2;
      $responseObject['siguen'] = $data3;
      
      return $responseObject;
    }

    function crearPeticion($conexion, $database, $user){
        $user = mysqli_real_escape_string($conexion, $user);
        $nombre = $_SESSION['N_Usuario'];
        $checkQuery = "SELECT CASE WHEN EXISTS (
              SELECT * 
              FROM seguir 
              WHERE Nombre_Usuario = '".$nombre."' 
              AND Nombre_Seguido = '".$user."' 
          ) 
          THEN 'YES' 
          ELSE 'NO' END as existe";
        $check = $database->get_unknow_data($checkQuery);
        if($check[0]["existe"] == "NO"){
            $sql = "INSERT into seguir (`Nombre_Usuario`, `Nombre_Seguido`) values ('".$nombre."', '".$user."')";
            return $database->send_data($sql);
        } else {
            return "Bad Request";
        }
    }
    
    function acceptPeticion($conexion, $database, $user){
      $user = mysqli_real_escape_string($conexion, $user);
      $nombre = $_SESSION['N_Usuario'];
      $checkQuery = "SELECT CASE WHEN EXISTS (
            SELECT * 
            FROM seguir 
            WHERE Nombre_Usuario = '".$user."' 
            AND Nombre_Seguido = '".$nombre."' 
            AND F_Inicio is null
        ) 
        THEN 'YES' 
        ELSE 'NO' END as existe";
      $check = $database->get_unknow_data($checkQuery);
      if($check[0]["existe"] == "YES"){
          $date = date("Y-m-d");
          $sql = "UPDATE seguir set F_Inicio = '".$date."' 
              WHERE Nombre_Seguido = '".$nombre."' AND Nombre_Usuario = '".$user."'";
          return $database->send_data($sql);
      } else {
          return "Bad Request";
      }
    }
    
    function denyPeticion($conexion, $database, $nombre1, $nombre2){
      $nombre1 = mysqli_real_escape_string($conexion, $nombre1);
      $nombre2 = mysqli_real_escape_string($conexion, $nombre2);
      $checkQuery = "SELECT CASE WHEN EXISTS (
            SELECT * 
            FROM seguir 
            WHERE Nombre_Usuario = '".$nombre1."' 
            AND Nombre_Seguido = '".$nombre2."' 
        ) 
        THEN 'YES' 
        ELSE 'NO' END as existe";
      $check = $database->get_unknow_data($checkQuery);
      if($check[0]["existe"] == "YES"){
          $sql = "DELETE FROM seguir WHERE Nombre_Usuario = '".$nombre1."' AND Nombre_Seguido = '".$nombre2."'";
          return $database->send_data($sql);
      } else {
          return "Bad Request";
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
    if($opcion == "aceptar"){
      $user = $_POST['user'];
      $datos = acceptPeticion($conexion, $database, $user);
      echo json_encode($datos);
    }
    if($opcion == "eliminar"){
      $nombre1 = $_POST['nombre1'];
      $nombre2 = $_POST['nombre2'];
      $usuario = $_SESSION['N_Usuario'];
      if ($nombre1 == $usuario || $nombre2 == $usuario) {
          $datos = denyPeticion($conexion, $database, $nombre1, $nombre2);
          echo json_encode($datos);
      }
    }
    if($opcion == "getData"){
      $datos = getData($conexion, $database);
      echo json_encode($datos);
    }
    $database->end_of_connection()
?>