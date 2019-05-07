<?php
  include 'Database.php';
  $database = new Database;
  session_start();

//----------------------------------------------------------------------------//

  function getLastMessages($nombre, $database){
    $return = array();
    $sql="SELECT * FROM mensajes WHERE F_Lectura IS NULL AND Id_Receptor = '".$nombre."' ORDER BY Id_Emisor desc";
    $data = $database->get_unknow_data($sql);
    for ($i=0; $i <= 3 && $i < count($data); $i++) {
      array_push($return, $data[$i]);
    }

    return $return;
  }

  function getLastPeticiones($nombre, $database){
    $return = array();
    $sql = "SELECT * FROM seguir WHERE Nombre_Seguido = '".$nombre."' AND F_Inicio IS NULL ORDER BY Nombre_Usuario desc";
    $data = $database->get_unknow_data($sql);
    for ($i=0; $i <= 3 && $i < count($data); $i++) {
      array_push($return, $data[$i]);
    }

    return $return;
  }

  function getLastPublicaciones($nombre, $database){
    $return = array();
    $sql = "SELECT p.Id_P, p.Texto, count(m.Nombre_Usuario) as num_mg FROM publicaciones p INNER JOIN me_gusta_p m on p.id_P = m.Id_P where p.Nombre_Usuario = '".$nombre."' AND m.F_Inicio < now() GROUP BY p.id_P";
    $data = $database->get_unknow_data($sql);
    for ($i=0; $i <= 3 && $i < count($data); $i++) {
      array_push($return, $data[$i]);
    }

    return $return;
  }

  function getCountPeticiones($nombre, $database){
    $sql = "SELECT count(Nombre_Usuario) AS num FROM seguir WHERE Nombre_seguido = '".$nombre."' AND F_Inicio is NULL";
    $data = $database->get_data($sql);

    return $data;
  }

  function getCountMensajes($nombre, $database){
    $sql = "SELECT count(Id_M) AS num FROM mensajes WHERE Id_Receptor = '".$nombre."' AND F_Lectura is NULL";
    $data = $database->get_data($sql);

    return $data;
  }

  function getCountMeGusta($nombre, $database){
    $sql1 = "SELECT count(mg.Id_P) AS num FROM me_gusta_p mg INNER JOIN publicaciones p ON p.id_P = mg.Id_P WHERE p.Nombre_Usuario = '".$nombre."'";
    $sql2 = "SELECT count(mg.Id_C) AS num FROM me_gusta_c mg INNER JOIN comentarios c ON c.id_C = mg.Id_C WHERE c.Nombre_Usuario = '".$nombre."'";
    $data1 = $database->get_data($sql1);
    $data2 = $database->get_data($sql2);

    $return = $data1['num'] + $data2['num'];

    return $return;
  }

  function getCountPublicaciones($nombre, $database){
    $sql = "SELECT count(Id_P) AS num FROM publicaciones WHERE Nombre_Usuario = '".$nombre."'";
    $data = $database->get_data($sql);

    return $data;
  }

  function getCountComentarios($nombre, $database){
    $sql = "SELECT count(Id_C) AS num FROM comentarios WHERE Nombre_Usuario = '".$nombre."'";
    $data = $database->get_data($sql);

    return $data;
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
