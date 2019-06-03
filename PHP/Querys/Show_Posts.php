<?php
    include 'Database.php';
    session_start();

    function recopilarPosts($conexion, $database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $query = "";
        $query .= "SELECT id_P, Alias, P.Nombre_Usuario, Texto, F_Publicacion, F_Borrado, Foto
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

    function recopilarComentarios($conexion, $database, $id_P){
      $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
      $query = "";
      $query .= "SELECT id_C, id_P, Alias, U.Nombre_Usuario AS Nombre_Usuario, Texto, Fecha, Foto
              FROM Comentarios C
              INNER JOIN usuarios U
              ON C.Nombre_Usuario = U.Nombre_Usuario
              WHERE C.Id_P = '".$id_P."'";
      $comentarios = $database->get_data($query);
      return $comentarios;
  }

    function recopilarPostsUser($conexion, $database, $user){
        $user = mysqli_real_escape_string($conexion, $user);
        $nombre = $_SESSION['N_Usuario'];
        $queryUser = "SELECT * FROM usuarios where Nombre_Usuario = '".$user."'";
        $userObject = $database->get_unknow_data($queryUser);
        if ($user == NULL) {
          /****** Si el nombre es nulo devolvemos al usuario logado ******/
          $query = "SELECT id_P, Alias, p.Nombre_Usuario, Texto, F_Publicacion, F_Borrado, Foto 
            FROM publicaciones p INNER JOIN usuarios u 
            ON p.Nombre_Usuario = u.Nombre_Usuario 
            WHERE u.Nombre_Usuario = '".$nombre."' 
            LIMIT 10";
          $posts = $database->get_unknow_data($query);
        } else{
          if (!isset($userObject[0]["Nombre_Usuario"])) {
            /****** Si el usuario que busca no existe ******/
            return "No Existe";
          }
          if($userObject[0]["Nombre_Usuario"] == $nombre){
            /****** Si se está buscando a si mismo ******/
            $query = "SELECT id_P, Alias, p.Nombre_Usuario, Texto, F_Publicacion, F_Borrado, Foto 
              FROM publicaciones p INNER JOIN usuarios u 
              ON p.Nombre_Usuario = u.Nombre_Usuario 
              WHERE u.Nombre_Usuario = '".$nombre."' 
              LIMIT 10";
            $posts = $database->get_unknow_data($query);
            
          } else {
            /****** Comprobamos si sigue al usuario ******/
            $queryCheck = "SELECT CASE WHEN EXISTS (
                  SELECT * 
                  FROM seguir 
                  WHERE Nombre_Usuario = '".$nombre."' 
                  AND Nombre_Seguido = '".$user."' 
                  AND F_Inicio IS NOT NULL 
                  AND F_Fin IS NOT NULL 
              ) 
              THEN 'YES'
              ELSE 'NO' END as existe";
            $checkSeguido = $database->get_unknow_data($queryCheck);
            
            if ($userObject[0]["Privacidad"] == "PRIVADO") {
              if ($checkSeguido[0]['existe'] == "YES") {
                /****** Si el usuario que busca es privado pero le está siguiendo ******/
                $query = "SELECT id_P, Alias, p.Nombre_Usuario, Texto, F_Publicacion, F_Borrado, Foto 
                  FROM publicaciones p INNER JOIN usuarios u 
                  ON p.Nombre_Usuario = u.Nombre_Usuario 
                  WHERE u.Nombre_Usuario = '".$user."' 
                  LIMIT 10";
                $posts = $database->get_unknow_data($query);
                
              } else {
                /****** Si no sigue al usuario que busca y es una cuenta privada ******/
                return "Forbidden";
              }
            } else {
              /****** Si es una cuenta publica ******/
              $query = "SELECT id_P, Alias, p.Nombre_Usuario, Texto, F_Publicacion, F_Borrado, Foto 
                FROM publicaciones p INNER JOIN usuarios u 
                ON p.Nombre_Usuario = u.Nombre_Usuario 
                WHERE u.Nombre_Usuario = '".$user."' 
                LIMIT 10";
              $posts = $database->get_unknow_data($query);
              
            }
          }
        }
        /****** Obtener imágenes ******/
        for($i = 0; $i < count($posts); $i++){
            $multimedia = recopilarMultimedia($conexion, $database, $posts[$i]['id_P'],"post");
            $feed = recopilarFeed($conexion, $database, $posts[$i]['id_P'],"post");
            if($multimedia){
                $posts[$i] += ["Multimedia" => $multimedia[0]];
            }
            $posts[$i] += ["Likes" => $feed['Likes']];
            $posts[$i] += ["Comments" => $feed['Comments']];
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
        $feed;
        $query_L = "SELECT COUNT(Id_P) AS Likes 
        FROM me_gusta_p
        WHERE Id_P = ".$id_P;
        $query_C = "SELECT COUNT(Id_P) AS Comments
        FROM comentarios
        WHERE Id_P = ".$id_P;
        $likes = $database->get_data($query_L);
        $comments = $database->get_data($query_C);
        $feed = array("Likes" => $likes['Likes'], "Comments" => $comments['Comments']);
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
    }else if ($ejecutar == "user") {
        $user = utf8_encode($_POST['user']);
        $posts = recopilarPostsUser($conexion, $database, $user);
        if ($posts == "Forbidden" || $posts == "No Existe") {
            echo $posts;
        } else {
            $enviar = json_encode($posts);
            echo $enviar;
        }
    }else if ($ejecutar == "comentarios"){
        $id_P = $_POST['id'];
        $comentarios = recopilarComentarios($conexion, $database, $id_P);
        $enviar = json_encode($comentarios);
        echo $enviar;
    }
    $database->end_of_connection();
?>