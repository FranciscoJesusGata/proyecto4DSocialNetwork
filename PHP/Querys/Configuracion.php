<?php
  include 'Database.php';
  include '../Sessions/Handle_Files.php';
  $database = new Database;
  $database->conexion();
  session_start();
  
  function saveImg($database, $nombre){
    $saveFoto = $_POST["saveFoto"];
    $saveCab = $_POST["saveCab"];
    $saveTema = $_POST["saveTema"];
    if ($saveFoto == "true") {
      if($_FILES["foto"]["error"] > 0){
        $sqlFoto = "UPDATE usuarios SET Foto = '' WHERE Nombre_Usuario = '".$nombre."'";
      } else{
        
        $ruta = guardarFoto($nombre);
        $sqlFoto = "UPDATE usuarios SET Foto = '".$ruta."' WHERE Nombre_Usuario = '".$nombre."'";
      }
      $database->send_data($sqlFoto);
    }
    
    if ($saveCab == "true") {
      if($_FILES["encabezado"]["error"] > 0){
        $sqlCab = "UPDATE usuarios SET Cabecera = '' WHERE Nombre_Usuario = '".$nombre."'";
      } else{
        $ruta = guardarCabecera($nombre);
        $sqlCab = "UPDATE usuarios SET Cabecera = '".$ruta."' WHERE Nombre_Usuario = '".$nombre."'";
      }
      $database->send_data($sqlCab);
    }
    
    if ($saveTema == "true") {
      if($_FILES["tema"]["error"] > 0){
        $sqlTema = "UPDATE usuarios SET Tema = '' WHERE Nombre_Usuario = '".$nombre."'";
      } else{
        $ruta = guardarTema($nombre);
        $sqlTema = "UPDATE usuarios SET Tema = '".$ruta."' WHERE Nombre_Usuario = '".$nombre."'";
      }
      $database->send_data($sqlTema);
    }
  }

//----------------------------------------------------------------------------//
  
  $nombre = $_SESSION["N_Usuario"];
  $biografia = $_POST["biografia"];
  $alias = $_POST["Alias"];
  $conexion = $database->db_conection;
  
  if($alias != "" && $alias != " " && $alias != null){
    $alias = mysqli_real_escape_string($conexion,$alias);
    $sqlAlias = "UPDATE usuarios SET Alias = '".$alias."' WHERE Nombre_Usuario = '".$nombre."'";
    $database->send_data($sqlAlias);
  }
  $biografia = mysqli_real_escape_string($conexion,$biografia);
  $sqlBio = "UPDATE usuarios SET Biografia = '".$biografia."' WHERE Nombre_Usuario = '".$nombre."'";
  $database->send_data($sqlBio);
  
  saveImg($database, $nombre);
  header("Location: ../../HTML/html/main.html");
  
?>
