<?php
  include 'Database.php';
  $database = new Database;
  session_start();

  function getLastMessages($nombre, $database){
    $return = array();
    $sql="SELECT * FROM mensajes WHERE F_Lectura IS NULL AND Id_Receptor = '".$nombre."'";
    $data = $database->get_data($sql);
    for ($i=0; $i <= 3 && $i < count($data); $i++) {
      array_push($return, $data[$i]);
    }

    return $return;
  }

  function getLastPeticiones($nombre, $database)
  {
    $return = array();
    $sql = "SELECT * FROM seguir WHERE Nombre_Seguido = '".$nombre."' AND F_Inicio IS NULL";
    $data = $database->get_data($sql);
    for ($i=0; $i <= 3 && $i < count($data); $i++) {
      array_push($return, $data[$i]);
    }
    return $return;
  }

  function getUserImg($nombre, $database)
  {
    $user = $_POST['user'];
    $return = array();
    $sql = "SELECT Foto FROM usuarios WHERE Nombre_Usuario = '".$nombre."'";
    $data = $database->get_data($sql);
    return $data;
  }

  function getLastPublicaciones($nombre, $database)
  {
    $return = array();
    $sql = "SELECT * FROM seguir WHERE Nombre_Seguido = '".$nombre."' AND F_Inidio IS NULL";
    $data = $database->get_data($sql);
    for ($i=0; $i <= 10 && $i < count($data); $i++) {
      array_push($return, $data[$i]);
    }
    return $return;
  }

  function getCountPeticiones($nombre, $database){
    $sql = "SELECT count(Nombre_Usuario) AS num FROM seguir WHERE Nombre_seguido = '".$nombre."' AND F_Inicio is NULL";
    $data = $database->get_data($sql);

    return $data['num'];
  }

  function getCountMensajes($nombre, $database){
    $sql = "SELECT count(Id_M) AS num FROM mensajes WHERE Id_Receptor = '".$nombre."' AND F_Lectura is NULL";
    $data = $database->get_data($sql);

    return $return;
  }

  function getCountMeGusta($nombre, $database){
    $sql1 = "SELECT count(Nombre_Usuario) AS num FROM me_gusta_p WHERE Nombre_seguido = '".$nombre."'";
    $sql2 = "SELECT count(Nombre_Usuario) AS num FROM me_gusta_c WHERE Nombre_seguido = '".$nombre."'";
    $data1 = $database->get_data($sql1);
    $data2 = $database->get_data($sql2);

    $return = $data1['num'] + $data2['num'];

    return $data['num'];
  }

  function getCountPublicaciones($nombre, $database){
    $sql = "SELECT count(Id_P) AS num FROM publicaciones WHERE Nombre_seguido = '".$nombre."'";
    $data = $database->get_data($sql);

    return $data['num'];
  }

  function getCountComentarios($nombre, $database){
    $sql = "SELECT count(Id_C) AS num FROM seguir WHERE Nombre_seguido = '".$nombre."'";
    $data = $database->get_data($sql);

    return $data['num'];
  }

  function controller($nombre, $database, $type){
    switch ($type) {
      case 'AdvMsg':
        $data = getLastMessages($nombre, $database);
        break;
      case 'AdvSeg':
        $data = getLastPeticiones($nombre, $database);
        break;
      case 'AdvPub':
        $data = getLastPublicaciones($nombre, $database);
        break;
      case 'Pet':
        $data = getCountPeticiones($nombre, $database);
        break;
      case 'ImgUsr':
        $data = getUserImg($nombre, $database);
        break;
      case 'mg':
        $data = getCountMeGusta($nombre, $database);
        break;
      case 'Msg':
        $data = getCountMensajes($nombre, $database);
        break;
      case 'Com':
        $data = getCountComentarios($nombre, $database);
        break;
      case 'Pub':
        $data = getCountPublicaciones($nombre, $database);
        break;
    }

    return $data;
  }

//----------------------------------------------------------------------------//

  if (isset($_POST['type']) && isset($_SESSION['N_Usuario'])) {
    $nombre = $_SESSION['N_Usuario'];
    $type = $_POST['type'];
    $ok = $database->conexion();

    if($ok == "error"){
        echo "Error al conectar con la base de datos";
    }else {
      $result = controller($nombre, $database, $type);
      echo json_encode($result);
    }

  } else{
    echo "Error al hacer la peticion";
  }

  $database->end_of_connection();
?>
