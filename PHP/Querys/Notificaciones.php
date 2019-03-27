<?php
  include 'Database.php';
  $database = new Database;
  session_start();

  function getNumMensajes($nombre, $database){
    $sql = "SELECT count(Id_M) AS num FROM mensajes WHERE Id_Receptor = '".$nombre."' AND F_Lectura is NULL";
    $datos = $database->get_data($sql);
    return $datos;
  }

  function getPeticionesSeguimiento($nombre, $database){
    $sql = "SELECT count(Nombre_Usuario) AS num FROM seguir WHERE Nombre_seguido = '".$nombre."' AND F_Inicio is NULL";
    $datos = $database->get_data($sql);
    return $datos;
  }

  if (isset($_POST['adv'])) {
    $nombre = $_SESSION['N_Usuario'];
    $advanced = $_POST['adv'];
    $ok = $database->conexion();

    if($ok == "error"){
        echo "Error al conectar con la base de datos";
    }else {
      switch ($advanced) {
        case 'msg':
          $data = getNumMensajes($nombre, $database);
          echo $data['num'];
          break;
        case 'seg':
          $data = getPeticionesSeguimiento($nombre, $database);
          echo $data['num'];
          break;
        case 'total':
          $data1 = getPeticionesSeguimiento($nombre, $database);
          $data2 = getNumMensajes($nombre, $database);
          $data3 = $data1['num'] + $data2['num'];
          echo $data3;
          break;
      }
    }
  } else{
    echo "Error al hacer la peticion";
  }

?>
