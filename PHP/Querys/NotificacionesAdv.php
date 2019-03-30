<?php
  include 'Database.php';
  $database = new Database;
  // TODO: query para obtener los ultimos 3 Mensajes
  function get3LastMessages($nombre, $database){
    $sql="SELECT * FROM mensajes WHERE F_Lectura IS NULL AND Id_Receptor = '".$nombre."'";
  }
  // TODO: query para obtener las ultimas peticiones de seguimiento
  // TODO: query para obtener las 5 ultimas publicaciones
  // TODO: query para automatizar lista(Amonestaciones, peticiones, mensajes,
  //       publicaciones con denuncias)
?>
