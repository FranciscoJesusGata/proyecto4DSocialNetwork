<?php
function crearCarpetaDeUsuario($nombre){
    mkdir('../../HTML/img/'.$nombre);
    mkdir('../../HTML/img/'.$nombre.'/profilepic');
    mkdir('../../HTML/img/'.$nombre.'/headerpic');
    mkdir('../../HTML/img/'.$nombre.'/themepic');
    mkdir('../../HTML/img/'.$nombre.'/publishedpics');
}

function borrarCarpetaDeUsuario($nombre){
    $carpetas = ['profilepic','headerpic','themepic','publishedpics'];
    for ($i=0; $i < count($carpetas);$i++){
        $archivo = '../../HTML/img/'.$nombre.'/'.$carpetas[$i].'/*';
        foreach ($archivo as $archivo){
            if(is_file($archivo)){
                unlink($archivo);
            }
        }
    }
}

function guardarFoto($nombre){
    $ext = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
    $directorio = "../../HTML/img/".$nombre."/profilepic/";
    $i = 1;
    $nombre_Foto = $directorio . $nombre . "_profilepic_".$i.".".$ext;
    while (file_exists($nombre_Foto)){
        $i++;
        $nombre_Foto = $directorio . $nombre . "_profilepic_".$i.".".$ext;
    }
    $subido = move_uploaded_file($_FILES['foto']['tmp_name'], $nombre_Foto);
    return $nombre_Foto;
}

function guardarCabecera($nombre){
    $ext = pathinfo($_FILES['encabezado']['name'], PATHINFO_EXTENSION);
    $directorio = "../../HTML/img/".$nombre."/headerpic/";
    $i = 1;
    $nombre_Cabecera = $directorio . $nombre . "_headerpic_".$i.".".$ext;
    while (file_exists($nombre_Cabecera)){
        $i++;
        $nombre_Cabecera = $directorio . $nombre . "_headerpic_".$i.".".$ext;
    }
    $subido = move_uploaded_file($_FILES['encabezado']['tmp_name'], $nombre_Cabecera);
    return $nombre_Cabecera;
}

function guardarTema($nombre){
    $ext = pathinfo($_FILES['tema']['name'], PATHINFO_EXTENSION);
    $directorio = "../../HTML/img/".$nombre."/themepic/";
    $i = 1;
    $nombre_Tema = $directorio . $nombre . "_themepic_".$i.".".$ext;
    while (file_exists($nombre_Tema)){
        $i++;
        $nombre_Tema = $directorio . $nombre . "_themepic_".$i.".".$ext;
    }
    $subido = move_uploaded_file($_FILES['tema']['tmp_name'], $nombre_Tema);
    return $nombre_Tema;
}

function guardarFotoPost(){
    session_start();
    $nombre = $_SESSION['N_Usuario'];
    $dir= "../../HTML/img/".$nombre."/publishedpics/";
    $nombre_Foto = $dir.$_FILES['foto']['name'];
    $i = 1;
    while(file_exists($nombre_Foto)){
        $nombre_Foto = $dir.pathinfo($_FILES['foto']['name'], PATHINFO_FILENAME).$i.".".pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
        $i++;
    }
    $subido = move_uploaded_file($_FILES['foto']['tmp_name'], $nombre_Foto);
    return $nombre_Foto;
}

?>