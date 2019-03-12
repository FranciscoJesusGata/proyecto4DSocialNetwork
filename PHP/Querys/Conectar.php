<?php

include 'data.php';

//Conexión con la base de datos
function conectar($servidor, $usuario, $clave, $BD){
    $conexion = mysqli_connect($servidor, $usuario, "", $BD);
    mysqli_set_charset($conexion,"utf8");
    return $conexion;
}
?>