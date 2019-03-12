<?php
    include 'Conectar.php';
    include '../Sessions/Handle_Files.php';

    if(!isset($_POST['post'])){
        echo "No hay publicación";
        print_r($_POST);
        exit;
    }

    function publicarTexto($conexion, $nombre, $post){
        $query = "INSERT INTO publicaciones VALUES(NULL,'".$nombre."','".$post."',CURRENT_TIMESTAMP,NULL)";
        $publicado = mysqli_query($conexion, $query);
        if(!$publicado){
            echo mysqli_errno($conexion)." ".mysqli_error($conexion);
            exit;
        }
        return $publicado;
    }

    function publicarFoto($conexion,$foto,$id){
        $query = "INSERT INTO multimedia VALUES(NULL,'imagen','".$foto."')";
        $done = mysqli_query($conexion, $query);
        if ($done){
            echo "Imagen registrada";
            $idImagen_Query = "SELECT id_I FROM multimedia WHERE ruta = '".$foto."' ORDER BY id_I DESC LIMIT 1";
            $idImagen_Done = mysqli_query($conexion, $idImagen_Query);
            if($idImagen_Done){
                $idImagen = mysqli_fetch_array($idImagen_Done);
                $idImagen = $idImagen[0];
                $query2 = "INSERT INTO `contenido_publicaciones`(`Id_P`, `Id_I`) VALUES (".$id.",".$idImagen.")";
                $done2 = mysqli_query($conexion,$query2);
                if($done2){
                    echo "Relación hecha";
                } else {
                    echo mysqli_errno($conexion)." ".mysqli_error($conexion);
                }
            }
        }else{
            echo mysqli_errno($conexion)." ".mysqli_error($conexion);
            exit;
        }
    }

    function publicar($post, $conexion, $foto){
        $nombre = $_SESSION['N_Usuario'];
        $query1 = "SELECT id_P FROM publicaciones ORDER BY id_P DESC LIMIT 1";
        $id0 = $publicado = mysqli_query($conexion, $query1);
        if ($id0){
            $id0 = mysqli_fetch_array($id0);
            $id0 = $id0[0];
            $done1 = publicarTexto($conexion, $nombre, $post);
            if($foto != NULL){
                $id = $id0 + 1;
                publicarFoto($conexion,$foto,$id);
            } else {
                echo "No hay foto";
                exit;
            }
        } else {
            echo "Error al conectar: ".mysqli_errno($conexion)." ".mysqli_error($conexion);
        }
    }
        

    $conexion = conectar($servidor, $usuario, $clave, $BD);
    $post = $_POST['post'];
    $foto = NULL;
    if (isset($_FILES['foto']) && $_FILES['foto']['size'] > 0){
        $foto = guardarFotoPost();
        publicar($post, $conexion, $foto);
    }
?>