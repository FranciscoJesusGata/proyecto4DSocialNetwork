<?php
  include 'Database.php';
  $database = new Database;
  $database->conexion();
  session_start();

//----------------------------------------------------------------------------//

  function getUsuario($user, $database){
    $sql = "SELECT * from usuarios where nombre_usuario = '".$user."'";
    $return = $database->get_unknow_data($sql);

    echo json_encode($return);
  }

  if (isset($_SESSION['N_Usuario'])) {
    $user = $_SESSION['N_Usuario'];
    getUsuario($user, $database);
  }

?>
