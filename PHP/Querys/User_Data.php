<?php
    function datosUsuario(){
        $nombre = $_SESSION['N_Usuario'];
        $query = 'SELECT Alias, Biografia, Cabecera, Correo, Foto
                  FROM usuarios
                  WHERE Nombre_Usuario = "'.$nombre.'"';
    }
?>