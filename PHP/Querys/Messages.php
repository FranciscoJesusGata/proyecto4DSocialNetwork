<?php
    include 'Database.php';
    function ultimaConversacion($receptor,$conexion,$database,$nombre){
        $sql="SELECT Id_Receptor";
        $sql.="FROM mensajes";
        $sql.="WHERE Id_Emisor = '".$nombre."'";
        $sql.="ORDER BY F_Envio";
        $datos = $database->get_data($sql);
        return $datos[0];
    }

    function recopilar_mensajes($receptor, $fecha,$conexion,$database){
        $nombre = mysqli_real_escape_string($conexion, $_SESSION['N_Usuario']);
        if($receptor == NULL){
        $receptor = ultimaConversacion($receptor,$conexion,$database,$nombre);
        } 
        $sql="SELECT Id_M, Texto, F_Envio, F_Lectura, Id_Receptor AS Receptor";
        $sql.="FROM mensajes";
        $sql.="WHERE Id_Emisor = '".$nombre."'";
        $sql.="AND Id_Receptor = '".$receptor."'";
        if($fecha != NULL){
            $sql.="AND F_Envio < '".$fecha."'";
        }
        $mensajes = $database->get_data($sql);
        return $mensajes;
    }

    function enviar_mensaje($conexion, $database, $texto, $receptor){

    }

    $database = new Database;
    $conexion = $database->conexion();
    $opcion = $_POST['opcion'];
    $receptor = NULL;
    if(isset($_POST['receptor'])){
        $receptor = $_POST['receptor'];
    }

    if($opcion == "recibir"){
        $fecha = NULL;
        if(isset($_POST['fecha'])){
            $fecha = $_POST['fecha'];
        }
        $mensajes = recopilar_mensajes($receptor, $fecha, $conexion, $database);
        json_encode($mensajes);
        echo $mensajes;
    }else if ($opcion == "enviar"){
        
    }
?>