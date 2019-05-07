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
        if(!isset($posts['id_P'])){
            for($i = 0; $i < count($posts); $i++){
                $multimedia = recopilarMultimedia($conexion, $database, $posts[$i]['id_P'],"post");
                $feed = recopilarFeed($conexion, $database, $posts[$i]['id_P'],"post");
                if($multimedia){
                    $posts[$i] += ["Multimedia" => $multimedia[0]];
                }
                $posts[$i] += ["Likes" => $feed['Likes']];
                $posts[$i] += ["Comments" => $feed['Comments']];
            }
        }else{
            $multimedia = recopilarMultimedia($conexion, $database, $posts['id_P'],"post");
            $feed = recopilarFeed($conexion, $database, $posts['id_P'],"post");
            if($multimedia){
                $posts += ["multimedia" => $multimedia[0]];
            }
            $posts += ["Likes" => $feed['Likes']];
            $posts += ["Comments" => $feed['Comments']];
        }
        return $posts;
    }

    function recopilarMultimedia($conexion,$database,$id_P,$target){
        $query_M = "SELECT Ruta AS Multimedia
                    FROM multimedia
                    WHERE Id_I IN (
                        SELECT Id_I 
                        FROM contenido_publicaciones
                        WHERE Id_P = ".$id_P.")";
        $multimedia = $database->get_data($query_M);
        return $multimedia;
    }

    function recopilarFeed($conexion,$database,$id_P,$target){
        $query_F = "SELECT COUNT(M.Id_P) AS Likes, COUNT(C.Id_P) AS Comments
                    FROM me_gusta_p M
                    INNER JOIN comentarios C 
                    ON M.Id_P = C.Id_P
                    WHERE M.Id_P = ".$id_P;
        $feed = $database->get_data($query_F);
        return $feed;
    }

    $database = new Database;
    $ok = $database->conexion();
    $conexion = $database->db_conection;
    $ejecutar = utf8_encode($_POST['ejecutar']);
    if($ejecutar == "onload"){
        $posts = recopilarPosts($conexion, $database);
        $enviar = json_encode($posts);
        echo $enviar;
    }
?>