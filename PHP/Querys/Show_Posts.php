<?php
    include 'Database.php';
    session_start();

    function recopilarPosts($conexion, $database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $query = "SELECT id_P, Alias, P.Nombre_Usuario, Texto, F_Publicacion, F_Borrado, Foto
                    FROM publicaciones P
                    INNER JOIN usuarios U
                    ON P.Nombre_Usuario = U.Nombre_Usuario
                    WHERE P.Nombre_Usuario = '".$nombre."'
                    UNION
                    SELECT id_P, Alias, Nombre_Seguido, Texto, F_Publicacion, F_Borrado, Foto
                    FROM publicaciones P
                    INNER JOIN usuarios U
                    ON P.Nombre_Usuario = U.Nombre_Usuario
                    INNER JOIN seguir S
                    ON S.Nombre_Seguido = U.Nombre_Usuario
                    WHERE S.Nombre_Usuario = '".$nombre."'
                    LIMIT 10";
        $posts = $database->get_data($query);
        return $posts;
    }

    $database = new Database;
    $ok = $database->conexion();
    $conexion = $database->db_conection;
    $ejecutar = $_POST['ejecutar'];
    if($ejecutar == "onload"){
        $posts = recopilarPosts($conexion, $database);
        $enviar = json_encode($posts);
        echo $enviar;
    }
?>