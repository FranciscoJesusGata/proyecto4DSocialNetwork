<?php
    include 'Database.php';
    session_start();

    function dataForNavbar($database){
      $nombre = $_SESSION['N_Usuario'];
      $sql = "SELECT Foto, Alias FROM usuarios where nombre_usuario = '".$nombre."'";
      return $database->get_unknow_data($sql);
    }
    
    function checkUser($conexion, $database, $user){
        $user = mysqli_real_escape_string($conexion, $user);
        $nombre = $_SESSION['N_Usuario'];
        if ($nombre == $user){
            return "same user";
        }
        $queryCheck = "SELECT CASE WHEN EXISTS (
              SELECT * 
              FROM seguir 
              WHERE Nombre_Usuario = '".$nombre."' 
              AND Nombre_Seguido = '".$user."' 
              AND F_Inicio IS NOT NULL 
              AND F_Fin IS NULL 
          ) 
          THEN 'YES' 
          ELSE 'NO' END as existe";
        $checkSeguido = $database->get_unknow_data($queryCheck);
        if($checkSeguido[0]["existe"] == "YES"){
          return "sigue";
        } else{
          return "no sigue";
        }
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
    
    function getDataFromUser($conexion, $database, $user){
        $queryBasicData = "SELECT * 
        FROM usuarios 
        WHERE Nombre_Usuario = '".$user."'";
        $queryFollowers = "SELECT COUNT(Nombre_Usuario) AS Seguidores
        FROM seguir
        WHERE Nombre_Seguido = '".$user."'
        AND F_Fin IS NOT NULL";
        $queryFollowing="SELECT COUNT(Nombre_Usuario) AS Seguidos
        FROM seguir
        WHERE Nombre_Usuario = '".$user."'
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
    
    function dataForUser ($conexion, $database, $user){
      $user = mysqli_real_escape_string($conexion, $user);
      $nombre = $_SESSION['N_Usuario'];
      if($user == null){
        /****** Si el usuario es nulo ******/
        return dataForMain($conexion, $database);
      } else {
        if($nombre == $user){
          /****** Si se está buscando a si mismo ******/
          return dataForMain($conexion, $database);
        } else {
          $queryUser = "SELECT * FROM usuarios where Nombre_Usuario = '".$user."'";
          $userObject = $database->get_unknow_data($queryUser);
          if (!isset($userObject[0]["Privacidad"])) {
            /****** Si el usuario que busca no existe ******/
            return "No Existe";
          }
          if($userObject[0]["Privacidad"] == "PUBLICO"){
            /****** Si el usuario es público lo devolvemos ******/
            return getDataFromUser($conexion, $database, $user);
          } else{
            /****** Comprobamos si sigue al usuario ******/
            $queryCheck = "SELECT CASE WHEN EXISTS (
                  SELECT * 
                  FROM seguir 
                  WHERE Nombre_Usuario = '".$nombre."' 
                  AND Nombre_Seguido = '".$user."' 
                  AND F_Inicio IS NOT NULL 
                  AND F_Fin IS NULL 
              ) 
              THEN 'YES' 
              ELSE 'NO' END as existe";
            $checkSeguido = $database->get_unknow_data($queryCheck);
            if($checkSeguido[0]['existe'] == "YES"){
              return getDataFromUser($conexion, $database, $user);
            } else{
              return "Forbidden";
            }
          }
        }
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
    if ($opcion == "user") {
      $user = $_POST['user'];
      $datos = dataForUser($conexion, $database, $user);
      if ($datos == "Forbidden" || $datos == "No Existe") {
        echo $datos;
      } else {
        $enviar = json_encode($datos);
        echo $enviar;
      }
    }
    if ($opcion == "checkUser") {
      $user = $_POST['user'];
      $datos = checkUser($conexion, $database, $user);
      echo $datos;
    }
    $database->end_of_connection()
?>
