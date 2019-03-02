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
    if (isset($_FILES['foto'])){
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
    }else{
        return NULL;
    }
}

function guardarCabecera($nombre){
    if (isset($_FILES['encabezado'])){
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
    }else{
        return NULL;
    }
}

function guardarTema($nombre){
    if (isset($_FILES['tema'])){
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
    }else{
        return NULL;
    }
}

?>