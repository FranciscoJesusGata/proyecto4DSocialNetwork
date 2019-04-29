<?php
    include 'Database.php';
    include '../Sessions/Handle_Files.php';
    session_start();

    if(!isset($_POST['post']) && !isset($_POST['comentario'])){
        echo "No hay publicación";
        print_r($_POST);
        exit;
    }

    function publicarTexto($database, $conexion, $nombre, $post, $cantidad, $tiempo){
        $query = "INSERT INTO publicaciones VALUES(NULL,'".$nombre."','".$post."',CURRENT_TIMESTAMP,DATE_ADD(CURRENT_TIMESTAMP, INTERVAL '".$cantidad."' ".$tiempo."))";
        $publicado = $database->send_data($query);
        if(!$publicado){
            echo mysqli_errno($conexion)." ".mysqli_error($conexion);
            exit;
        }
        return $publicado;
    }

    function publicarTextoC($database, $conexion, $id_P, $nombre, $comentario){
        $query = "INSERT INTO comentarios VALUES(NULL,$id_P,NULL, $nombre, $comentario, CURRENT_TIMESTAMP, NULL)";
        $publicado = $database->send_data($query);
        if(!$publicado){
            echo mysqli_errno($conexion)." ".mysqli_error($conexion);
            exit;
        }
        return $publicado;
    }


    function publicarFoto($database, $conexion,$foto,$id){
        $query = "INSERT INTO multimedia VALUES(NULL,'imagen','".$foto."')";
        $done = $database->send_data($query);
        if ($done){
            $idImagen_Query = "SELECT id_I FROM multimedia WHERE ruta = '".$foto."' ORDER BY Id_I DESC LIMIT 1";
            $idImagen = $database->get_data($idImagen_Query);
            $id_I = $idImagen[0];
            $query2 = "INSERT INTO `contenido_publicaciones`(`Id_P`, `Id_I`) VALUES (".$id.",".$id_I.")";
            $done2 = $database->send_data($query2);
        }
    }

    function publicarFotoC($database, $conexion,$foto,$id){
        $query = "INSERT INTO multimedia VALUES(NULL,'imagen','".$foto."')";
        $done = $database->send_data($query);
        if ($done){
            $idImagen_Query = "SELECT id_I FROM multimedia WHERE ruta = '".$foto."' ORDER BY id_I DESC LIMIT 1";
            $idImagen = $database->get_data($idImagen_Query);
            $idImagen = $idImagen[0];
            $query2 = "INSERT INTO `contenido_comentarios`(`Id_C`, `Id_I`) VALUES (".$id.",".$idImagen.")";
            $done2 = $database->send_data($query2);
        }
    }

    function publicar($post, $database, $conexion, $foto, $cantidad, $tiempo){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $query1 = "SELECT id_P FROM publicaciones WHERE Nombre_Usuario = '".$nombre."' ORDER BY Id_P DESC LIMIT 1";
        $done1 = publicarTexto($database, $conexion, $nombre, $post, $cantidad, $tiempo);
        $id0 = $database->get_data($query1);
        print_r($id0);
            if($foto != NULL){
                $id = intval($id0[0]);
                publicarFoto($database, $conexion,$foto,$id);
            } else {
                echo "No hay foto";
                exit;
            }
    }

    function publicar_Comentario($comentario, $database, $conexion, $id_P, $foto){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        $query1 = "SELECT id_C FROM comentarios ORDER BY id_C WHERE Nombre_Usuario = ".$nombre." AND Id_P = ".$id_P." DESC LIMIT 1";
        $id0 = $database->get_data($query1);
            $done1 = publicarTextoC($database, $conexion, $id_P, $nombre, $comentario);
            if($foto != NULL){
                $id = intval($id0[0]);
                publicarFotoC($database, $conexion,$foto,$id);
            } else {
                echo "No hay foto";
                exit;
            }
    }
        
    $database = new Database;
    $ok = $database->conexion();
    $conexion=$database->db_conection;
    if(isset($_POST['post'])){
        $post = mysqli_real_escape_string($conexion, $_POST['post']);
        $cantidad = $_POST['cantidad'];
        $tiempo = $_POST['tiempo'];
        $foto = NULL;
        if (isset($_FILES['foto']) && $_FILES['foto']['size'] > 0){
            $foto = guardarFotoPost();
        }
        publicar($post, $database, $conexion, $foto, $cantidad, $tiempo);
    }else if (isset($_POST['comentario'])){
        $comentario = mysqli_real_escape_string($conexion, $_POST['comentario']);
        $id_P = $_POST['Id_P'];
        $foto = NULL;
        if (isset($_FILES['foto']) && $_FILES['foto']['size'] > 0){
            $foto = guardarFotoPost();
        }
        publicarComentario($comentario, $database, $conexion, $foto, $id_P);
    }
?>