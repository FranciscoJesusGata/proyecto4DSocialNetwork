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

// $nombre, $carpeta
function borrarContenidoCarpeta($nombre, $carpeta){
    $archivo = '../../HTML/img/'.$nombre.'/'.$carpeta.'/';
    $files = scandir($archivo);
    echo json_encode($files);
    foreach ($files as $file) {
      $file = $archivo.$file;
      if (file_exists($file) && $file != $archivo."." && $file != $archivo."..") {
        unlink($file);
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
    $nombre_Cab = $directorio . $nombre . "_headerpic_".$i.".".$ext;
    while (file_exists($nombre_Cab)){
        $i++;
        $nombre_Cab = $directorio . $nombre . "_headerpic_".$i.".".$ext;
    }
    $subido = move_uploaded_file($_FILES['encabezado']['tmp_name'], $nombre_Cab);
    return $nombre_Cab;
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