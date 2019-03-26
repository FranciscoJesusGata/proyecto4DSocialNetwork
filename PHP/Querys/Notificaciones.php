<?php
  include 'Database.php';
  $database = new Database;
  session_start();

  function getNumMensajes($nombre, $database){
    $sql = "SELECT count(Id_M) FROM mensajes WHERE Id_Receptor = '".$nombre."'";
    $datos = $database->get_data($sql);
    return $datos;
  }

  $nombre = $_SESSION['N_Usuario'];
  $advanced = $_POST['adv'];
  $ok = $database->conexion();

  if(!$advanced){
    $field = $_POST['field']
    switch ($field) {
      case 'msg':
        // code...
        break;
    }
  }

  if($ok == "error"){
      echo "Error al conectar con la base de datos";
      exit;
  }
  if ($nombre == null) {
    return null;
  } else {
    $data = getNumMensajes($nombre, $database);
    echo $data[0];
  }
?>
